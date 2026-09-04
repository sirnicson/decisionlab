import { useMemo, useState } from 'react';
import { useSession } from '../../app/SessionContext';
import { getSeaWolfScenario, SEA_WOLF_TRAITS } from '../../data/seawolf/scenarios';
import { deriveInitialProspectPool, evaluateProspectRound, isPreferredCharacteristicSelection, treatmentEffectiveness } from '../../engine/scoring/seawolf';
import { formatTime, useCountdown } from '../../hooks/useCountdown';
import type { AllocationDecision, Judgement, Microbe, ProspectDecision, SeaWolfAttempt, SeaWolfSite, SeaWolfSiteAttempt, SeaWolfStep } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import ClientVoice from '../../components/ClientVoice';
import Task2ResultPage from '../results/Task2ResultPage';

const emptySite=(id:string):SeaWolfSiteAttempt=>({siteId:id,selectedCharacteristics:[],transferAllocations:[],allocations:[],prospectDecisions:[],treatmentIds:[],completed:false});
const emptyAttempt=(scenarioId:string,siteIds:string[]):SeaWolfAttempt=>({scenarioId,sites:Object.fromEntries(siteIds.map(id=>[id,emptySite(id)])),hintsUsed:0,retries:0,timeUsedSeconds:0,completed:false,currentSiteIndex:0,currentStep:'taskIntro',categorisationIndex:0,transferIndex:0,prospectRoundIndex:0});
const inRange=(v:number,[lo,hi]:[number,number])=>v>=lo&&v<=hi;
const positiveMatches=(site:SeaWolfSite,m:Microbe)=>[
  inRange(m.permeability,site.ranges.permeability),
  inRange(m.mobility,site.ranges.mobility),
  inRange(m.energy,site.ranges.energy),
  m.trait===site.desiredTrait
].filter(Boolean).length;
const currentFit=(site:SeaWolfSite,m:Microbe)=>positiveMatches(site,m)>=2&&m.trait!==site.undesiredTrait;
const toneForJudgement=(j:Judgement):'positive'|'caution'|'critical'=>j==='strong'?'positive':j==='defensible'?'caution':'critical';

function MicrobeCard({m,selected=false,onClick,compact=false}:{m:Microbe;selected?:boolean;onClick?:()=>void;compact?:boolean}){
  const content=<>
    <div className="microbe-name">{m.name}</div>
    <div className="microbe-stats"><div className="stat">P<br/><strong>{m.permeability}</strong></div><div className="stat">M<br/><strong>{m.mobility}</strong></div><div className="stat">E<br/><strong>{m.energy}</strong></div></div>
    <div className="trait">{m.trait}</div>
  </>;
  const className=`microbe-card ${selected?'selected-card':''} ${compact?'compact-microbe':''}`;
  if(onClick)return <button type="button" className={className} onClick={onClick} aria-pressed={selected}>{content}</button>;
  return <div className={className}>{content}</div>;
}

export default function SeaWolfPage(){
  const {session,setSeaWolfAttempt,completeSession}=useSession();
  const scenario=getSeaWolfScenario(session?.selectedSeaWolfId);
  const saved=session?.seaWolfAttempt?.scenarioId===scenario.id?session.seaWolfAttempt:undefined;
  const [attempt,setAttempt]=useState<SeaWolfAttempt>(saved ?? emptyAttempt(scenario.id,scenario.sites.map(s=>s.id)));
  const [pendingAlloc,setPendingAlloc]=useState<{microbe:Microbe;choice:'current'|'next'|'return';kind:'categorisation'|'transfer'}|null>(null);
  const [pendingProspect,setPendingProspect]=useState<Microbe|null>(null);
  const [feedback,setFeedback]=useState<{judgement:Judgement;text:string}|null>(null);
  const [confirmSite,setConfirmSite]=useState(false);
  const [confirmTreatment,setConfirmTreatment]=useState(false);
  const isSimulation=session?.mode==='simulation';
  const timerEnabled=Boolean(isSimulation||session?.learningTimerEnabled);
  const siteIndex=attempt.currentSiteIndex??0;
  const step=attempt.currentStep??'taskIntro';
  const timerActive=timerEnabled&&step!=='taskIntro';
  const timer=useCountdown(30*60,timerActive,attempt.timerStartedAt);

  const catIndex=attempt.categorisationIndex??0;
  const transferIndex=attempt.transferIndex??0;
  const roundIndex=attempt.prospectRoundIndex??0;
  const site=scenario.sites[siteIndex];
  const siteAttempt=attempt.sites[site.id] ?? emptySite(site.id);
  const nextSite=siteIndex<2?scenario.sites[siteIndex+1]:undefined;
  const cat=site.categorisationDeck[catIndex];
  const round=site.prospectRounds[roundIndex];
  const previousSite=siteIndex>0?scenario.sites[siteIndex-1]:undefined;

  const persist=(next:SeaWolfAttempt)=>{
    const stamped={...next,timeUsedSeconds:timer.elapsed};
    setAttempt(stamped);
    setSeaWolfAttempt(stamped);
  };
  const sitePatched=(patch:Partial<SeaWolfSiteAttempt>,base=attempt):SeaWolfAttempt=>({...base,sites:{...base.sites,[site.id]:{...siteAttempt,...patch}}});
  const clearFeedback=()=>{setPendingAlloc(null);setPendingProspect(null);setFeedback(null)};
  const go=(nextStep:SeaWolfStep,patch:Partial<SeaWolfAttempt>={})=>{clearFeedback();persist({...attempt,...patch,currentStep:nextStep});window.scrollTo({top:0,behavior:'smooth'})};

  const transferMicrobes=useMemo(()=>{
    if(!previousSite)return [] as Microbe[];
    const prevAttempt=attempt.sites[previousSite.id];
    const forward=[...(prevAttempt?.transferAllocations??[]),...(prevAttempt?.allocations??[])].filter(a=>a.allocation==='next');
    const routingUniverse=scenario.sites.flatMap(s=>s.categorisationDeck);
    return forward.map(a=>routingUniverse.find(m=>m.id===a.microbeId)).filter(Boolean) as Microbe[];
  },[siteIndex,attempt.sites,previousSite,scenario.sites]);
  const transferMicrobe=transferMicrobes[transferIndex];
  const profiledInitialPool=useMemo(()=>deriveInitialProspectPool(site,siteAttempt.selectedCharacteristics),[site,siteAttempt.selectedCharacteristics]);
  const selectedProspects=siteAttempt.prospectDecisions.map(d=>site.prospectRounds.find(r=>r.id===d.roundId)?.candidates.find(c=>c.id===d.microbeId)).filter(Boolean) as Microbe[];
  const finalPool=useMemo(()=>[...profiledInitialPool,...selectedProspects].filter((m,i,a)=>a.findIndex(x=>x.id===m.id)===i),[profiledInitialPool,selectedProspects]);
  const currentTreatment=siteAttempt.treatmentIds.map(id=>finalPool.find(m=>m.id===id)).filter(Boolean) as Microbe[];
  const availableTreatmentPool=finalPool.filter(m=>!siteAttempt.treatmentIds.includes(m.id));
  const currentEffect=treatmentEffectiveness(site,currentTreatment);

  const nextInsight=site.nextSiteInsight;
  const matchesNextInsight=(m:Microbe)=>{
    if(!nextInsight)return false;
    if(nextInsight.kind==='trait')return m.trait===nextInsight.label;
    if(!nextInsight.range)return false;
    const value=nextInsight.label==='Permeability'?m.permeability:nextInsight.label==='Mobility'?m.mobility:m.energy;
    return inRange(value,nextInsight.range);
  };
  const computedRoute=(m:Microbe):'current'|'next'|'return'=>{
    if(currentFit(site,m))return 'current';
    if(nextSite&&matchesNextInsight(m))return 'next';
    return 'return';
  };
  const expectedRoute=(m:Microbe,kind:'categorisation'|'transfer')=>kind==='categorisation'&&m.expectedAllocation?m.expectedAllocation:computedRoute(m);
  const classify=(m:Microbe,choice:'current'|'next'|'return',kind:'categorisation'|'transfer'):Judgement=>{
    const expected=expectedRoute(m,kind);
    if(choice===expected)return 'strong';
    if(choice==='current'&&m.trait===site.undesiredTrait)return 'weak';
    if(choice==='next'&&!nextSite)return 'weak';
    return choice==='return'?'weak':'defensible';
  };
  const decisionWithAllocation=(m:Microbe,choice:'current'|'next'|'return',kind:'categorisation'|'transfer')=>{
    const judgement=classify(m,choice,kind);
    const decision:AllocationDecision={microbeId:m.id,allocation:choice,judgement};
    const patch=kind==='transfer'
      ? {transferAllocations:[...(siteAttempt.transferAllocations??[]).filter(d=>d.microbeId!==m.id),decision]}
      : {allocations:[...siteAttempt.allocations.filter(d=>d.microbeId!==m.id),decision]};
    return {next:sitePatched(patch),judgement};
  };
  const advanceAfterAllocation=(base:SeaWolfAttempt,kind:'categorisation'|'transfer')=>{
    if(kind==='transfer'){
      if(transferIndex<transferMicrobes.length-1)return {...base,transferIndex:transferIndex+1};
      return {...base,transferIndex:0,currentStep:'characteristics' as SeaWolfStep};
    }
    if(catIndex<site.categorisationDeck.length-1)return {...base,categorisationIndex:catIndex+1};
    return {...base,categorisationIndex:0,currentStep:'initialPool' as SeaWolfStep};
  };
  const allocationClientText=(m:Microbe,choice:'current'|'next'|'return',kind:'categorisation'|'transfer')=>{
    const expected=expectedRoute(m,kind);
    const availableInformation=nextSite
      ? 'the current site requirements and the limited next-site information'
      : 'the current site requirements';
    if(choice===expected){
      return `That is a defensible route. Keep using ${availableInformation} as you work through the remaining site decisions.`;
    }
    return `This may not be the strongest route. Keep ${availableInformation} in mind as you work through the remaining site decisions.`;
  };
  const chooseAllocation=(choice:'current'|'next'|'return',kind:'categorisation'|'transfer')=>{
    const m=kind==='transfer'?transferMicrobe:cat;if(!m)return;
    const {next,judgement}=decisionWithAllocation(m,choice,kind);
    if(isSimulation){persist(advanceAfterAllocation(next,kind));return;}
    persist(next);
    setPendingAlloc({microbe:m,choice,kind});
    setFeedback({judgement,text:allocationClientText(m,choice,kind)});
  };
  const advanceAllocation=(kind:'categorisation'|'transfer')=>{clearFeedback();persist(advanceAfterAllocation(attempt,kind));};

  const chooseProspect=(m:Microbe)=>{if(round)setPendingProspect(m)};
  const confirmProspect=()=>{
    if(!round||!pendingProspect)return;
    const candidate=round.candidates.find(c=>c.id===pendingProspect.id);if(!candidate)return;
    const evaluation=evaluateProspectRound(site,[...profiledInitialPool,...selectedProspects],roundIndex).find(item=>item.candidate.id===candidate.id);
    const decision:ProspectDecision={roundId:round.id,microbeId:candidate.id,judgement:evaluation?.judgement??candidate.judgement};
    const next=sitePatched({prospectDecisions:[...siteAttempt.prospectDecisions.filter(d=>d.roundId!==round.id),decision]});
    setPendingProspect(null);
    persist(roundIndex<3?{...next,prospectRoundIndex:roundIndex+1}:{...next,prospectRoundIndex:0,currentStep:'treatment'});
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const toggleCharacteristic=(key:string)=>{const cur=siteAttempt.selectedCharacteristics;const next=cur.includes(key)?cur.filter(x=>x!==key):cur.length<2?[...cur,key]:cur;persist(sitePatched({selectedCharacteristics:next,prospectDecisions:[],treatmentIds:[],submittedEffectiveness:undefined,completed:false}));};
  const toggleTreatment=(id:string)=>{const ids=siteAttempt.treatmentIds;const next=ids.includes(id)?ids.filter(x=>x!==id):ids.length<3?[...ids,id]:ids;persist(sitePatched({treatmentIds:next}));};
  const lockTreatment=()=>{if(siteAttempt.treatmentIds.length!==3)return;setConfirmTreatment(false);persist({...sitePatched({submittedEffectiveness:currentEffect,completed:true}),currentStep:'siteResult'});window.scrollTo({top:0});};
  const continueSite=()=>{
    if(siteIndex<2){clearFeedback();persist({...attempt,currentSiteIndex:siteIndex+1,currentStep:'siteIntro',categorisationIndex:0,transferIndex:0,prospectRoundIndex:0});return;}
    const done={...attempt,timeUsedSeconds:timer.elapsed,completed:true,currentStep:'siteResult' as SeaWolfStep};persist(done);completeSession();window.scrollTo({top:0,behavior:'smooth'});
  };
  const beginSite=()=>{setConfirmSite(false);go(siteIndex>0&&transferMicrobes.length?'transferReview':'characteristics');};

  const catCounts={current:siteAttempt.allocations.filter(a=>a.allocation==='current').length,next:siteAttempt.allocations.filter(a=>a.allocation==='next').length,return:siteAttempt.allocations.filter(a=>a.allocation==='return').length};
  const transferCounts={current:(siteAttempt.transferAllocations??[]).filter(a=>a.allocation==='current').length,next:(siteAttempt.transferAllocations??[]).filter(a=>a.allocation==='next').length,return:(siteAttempt.transferAllocations??[]).filter(a=>a.allocation==='return').length};
  const treatmentAverages=currentTreatment.length===3?{
    p:currentTreatment.reduce((s,m)=>s+m.permeability,0)/3,
    m:currentTreatment.reduce((s,m)=>s+m.mobility,0)/3,
    e:currentTreatment.reduce((s,m)=>s+m.energy,0)/3
  }:null;
  const treatmentClientResult=()=>{
    if(!treatmentAverages)return 'I cannot assess the treatment until three microbes are confirmed.';
    const failures:string[]=[];
    if(!inRange(treatmentAverages.p,site.ranges.permeability))failures.push('Permeability falls outside the required range');
    if(!inRange(treatmentAverages.m,site.ranges.mobility))failures.push('Mobility falls outside the required range');
    if(!inRange(treatmentAverages.e,site.ranges.energy))failures.push('Energy falls outside the required range');
    if(!currentTreatment.some(m=>m.trait===site.desiredTrait))failures.push(`the trio does not include ${site.desiredTrait}`);
    if(currentTreatment.some(m=>m.trait===site.undesiredTrait))failures.push(`the trio includes ${site.undesiredTrait}, which is excluded here`);
    if(!failures.length)return `I would take this treatment forward. The trio meets the required attribute ranges, includes ${site.desiredTrait}, and avoids ${site.undesiredTrait}.`;
    if(currentEffect===site.maximumFeasibleEffectiveness)return `This treatment reaches the strongest feasible outcome available for this site. The remaining constraint is that ${failures.join('; ')}.`;
    return `I would not take this treatment forward yet. ${failures.join('; ')}. The combination falls short of the strongest feasible outcome available for this site.`;
  };
  if(attempt.completed)return <Task2ResultPage scenario={scenario} attempt={attempt}/>;

  if(step==='taskIntro')return <main className="page"><section className="panel seawolf-intro">
    <div className="eyebrow">Workstream 02 · Fairhaven Environmental Trust</div>
    <h1>{scenario.title}</h1>
    <ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" className="client-brief-voice">
      <p><strong>Welcome, and thanks for joining this workstream.</strong></p>
      <p>{scenario.clientBrief}</p>
      <p>{scenario.assignment}</p>
      <p>You will have the current site requirements, individual microbe profiles and limited information about the next site where it is available. I will keep the Site Information panel visible as your working reference, and your treatment pool will remain visible while you build the final combination.</p>
      <p>{isSimulation?'Once you review the first site brief, I need the three-site workstream completed within 30 minutes.':'In a full simulation, you will have 30 minutes to complete all three sites. Here, use the time to understand the decisions before you work at speed.'}</p>
    </ClientVoice>
    <button className="primary" onClick={()=>go('siteIntro',timerEnabled&&!attempt.timerStartedAt?{timerStartedAt:Date.now()}: {})}>Review the Brief →</button>
  </section></main>;

  return <main className="page"><div className="workspace seawolf-workspace">
    <section className="work-main">
      <div className="seawolf-context-bar" aria-label="Sea Wolf case context">
        <div><span>Task 2 · {scenario.title}</span><strong>Site {siteIndex+1} of 3 · {site.title}</strong></div>
        {timerEnabled&&<div className="timer seawolf-context-timer">{formatTime(timer.remaining)}</div>}
      </div>
      {step==='siteIntro'&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Site {siteIndex+1} · {scenario.title}</div><h1>{site.title}</h1></div><ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist"><p>{site.decisionPrompt}</p><p>I have given you the full requirements for this site on the right. Start with those requirements and use the information revealed at each decision stage to make the most defensible programme choice.</p></ClientVoice>{transferMicrobes.length>0&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>I carried {transferMicrobes.length} microbe{transferMicrobes.length===1?'':'s'} forward from the previous site. Reassess {transferMicrobes.length===1?'it':'them'} first now that you can see the complete requirements here.</p></ClientVoice>}<div className="site-targets"><div className="target"><b>Permeability</b>{site.ranges.permeability.join('–')}</div><div className="target"><b>Mobility</b>{site.ranges.mobility.join('–')}</div><div className="target"><b>Energy</b>{site.ranges.energy.join('–')}</div><div className="target"><b>Desired</b>{site.desiredTrait}</div><div className="target"><b>Undesired</b>{site.undesiredTrait}</div></div><button className="primary" onClick={()=>setConfirmSite(true)}>Start Site {siteIndex+1}</button></section>}

      {step==='transferReview'&&transferMicrobe&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Transfer review · {transferIndex+1} of {transferMicrobes.length}</div><h2>Reassess the carried-forward microbe</h2></div>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>I only had partial information when this microbe was carried forward. Now that the full site requirements are available, tell me whether you would use it here, preserve it for the next site, or return it.</p></ClientVoice>}<div className="routing-layout"><MicrobeCard m={transferMicrobe}/><div className="route-buckets"><div><strong>Current Site</strong><span>{transferCounts.current}</span></div>{siteIndex<2&&<div><strong>Next Site</strong><span>{transferCounts.next}</span></div>}<div><strong>Return</strong><span>{transferCounts.return}</span></div></div></div>{!pendingAlloc?<div className="allocation-buttons"><button className="secondary" onClick={()=>chooseAllocation('current','transfer')}>Current Site</button>{siteIndex<2&&<button className="secondary" onClick={()=>chooseAllocation('next','transfer')}>Next Site</button>}<button className="secondary" onClick={()=>chooseAllocation('return','transfer')}>Return</button></div>:<><ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact tone={toneForJudgement(feedback?.judgement??'defensible')}><p>{feedback?.text}</p></ClientVoice><button className="primary" onClick={()=>advanceAllocation('transfer')}>{transferIndex===transferMicrobes.length-1?'Continue to Characteristics':'Next transferred microbe'}</button></>}</section>}

      {step==='characteristics'&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Characteristics</div><h2>Select two characteristics</h2></div><p className="muted stage-intro-copy">Your selection determines which six microbes enter the initial treatment pool. It does not change the separate 10-microbe routing deck.</p>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>Start with the characteristics that will narrow the field most effectively. Compare how selective each attribute range or trait is for this site, and choose the pair that gives you the clearest basis for separating stronger options from weaker ones. You will see the consequences of that choice in the initial pool.</p></ClientVoice>}<div className="characteristic-grid"><div className="characteristic-group"><h3>Attributes</h3>{([['Permeability',site.ranges.permeability],['Mobility',site.ranges.mobility],['Energy',site.ranges.energy]] as [string,[number,number]][]).map(([name,range])=>{const key=`${name} ${range.join('–')}`;return <button key={key} className={siteAttempt.selectedCharacteristics.includes(key)?'characteristic-option selected':'characteristic-option'} onClick={()=>toggleCharacteristic(key)}><span>{name}</span><strong>{range.join('–')}</strong></button>})}</div><div className="characteristic-group"><h3>Traits</h3>{SEA_WOLF_TRAITS.map(name=><button key={name} className={`${siteAttempt.selectedCharacteristics.includes(name)?'characteristic-option selected':'characteristic-option'} ${name===site.desiredTrait?'desired-option':''} ${name===site.undesiredTrait?'undesired-option':''}`} onClick={()=>toggleCharacteristic(name)}><span>{name}</span><strong>{name===site.desiredTrait?'Desired':name===site.undesiredTrait?'Undesired':'Available'}</strong></button>)}</div></div><div className="selection-summary">Selected {siteAttempt.selectedCharacteristics.length}/2: {siteAttempt.selectedCharacteristics.join(' + ')||'—'}</div><button className="primary" disabled={siteAttempt.selectedCharacteristics.length!==2} onClick={()=>go('categorisation')}>Continue to Categorisation</button></section>}

      {step==='categorisation'&&cat&&<section className="panel seawolf-stage-panel"><div className="routing-counters"><div><span>Remaining</span><strong>{site.categorisationDeck.length-catIndex}</strong></div><div><span>Current Site</span><strong>{catCounts.current}</strong></div>{siteIndex<2&&<div><span>Next Site</span><strong>{catCounts.next}</strong></div>}<div><span>Return</span><strong>{catCounts.return}</strong></div></div><div className="stage-page-title compact-title"><div className="eyebrow">Microbe {catIndex+1} of {site.categorisationDeck.length}</div></div>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>Compare this microbe with the information available for the current site and, where shown, the next site. Decide which destination is most defensible from the evidence you can see.</p></ClientVoice>}<div className="routing-layout"><MicrobeCard m={cat}/><div className="route-buckets large"><div><strong>Current Site</strong><span>{catCounts.current}</span></div>{siteIndex<2&&<div><strong>Next Site</strong><span>{catCounts.next}</span></div>}<div><strong>Return</strong><span>{catCounts.return}</span></div></div></div>{!pendingAlloc?<div className="allocation-buttons"><button className="secondary" onClick={()=>chooseAllocation('current','categorisation')}>Current Site</button>{siteIndex<2&&<button className="secondary" onClick={()=>chooseAllocation('next','categorisation')}>Next Site</button>}<button className="secondary" onClick={()=>chooseAllocation('return','categorisation')}>Return</button></div>:<><ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact tone={toneForJudgement(feedback?.judgement??'defensible')}><p>{feedback?.text}</p></ClientVoice><button className="primary" onClick={()=>advanceAllocation('categorisation')}>{catIndex===site.categorisationDeck.length-1?'View Initial Prospect Pool':'Next microbe'}</button></>}</section>}

      {step==='initialPool'&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Initial Pool</div><h2>Your six starting treatment prospects</h2></div><p className="muted stage-intro-copy">These six microbes were derived from the two characteristics you selected. They are separate from the routing deck.</p>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact tone={isPreferredCharacteristicSelection(site,siteAttempt.selectedCharacteristics)?'positive':'neutral'}><p>{isPreferredCharacteristicSelection(site,siteAttempt.selectedCharacteristics)?'This gives you a useful starting pool. Before you add anything else, look at the coverage you already have and where the pool still leaves you exposed.':'This gives you a different starting pool. Before adding more prospects, look closely at what it covers well and where your options remain limited.'}</p></ClientVoice>}<div className="selection-summary">Profile used: {siteAttempt.selectedCharacteristics.join(' + ')}</div><div className="microbe-grid initial-pool-grid">{profiledInitialPool.map(m=><MicrobeCard key={m.id} m={m}/>)}</div>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>I will show you four new three-card sets. In each round, add exactly one microbe to this pool. I want you to think about what the pool needs, not just which individual card looks strongest.</p></ClientVoice>}<button className="primary" onClick={()=>go('prospectPool')}>Begin Prospect Selection →</button></section>}

      {step==='prospectPool'&&round&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Prospect Selection · Round {roundIndex+1} of 4</div><h2>Choose one candidate</h2></div><p className="muted stage-intro-copy">Your current pool contains <strong>{6+siteAttempt.prospectDecisions.length}</strong> microbes. Select one candidate, review the choice, then confirm it before the next set appears.</p>{!isSimulation&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>Before you add another good-looking card, I want you to look at what you already have. What is missing from the pool, and which candidate improves your options rather than simply duplicating them?</p></ClientVoice>}<div className="prospect-candidates">{round.candidates.map(c=><MicrobeCard key={c.id} m={c} selected={pendingProspect?.id===c.id} onClick={()=>chooseProspect(c)}/>)}</div>{pendingProspect&&<div className="prospect-confirm-row"><span>Selected: <strong>{pendingProspect.name}</strong></span><button className="primary" onClick={confirmProspect}>Confirm selection</button></div>}<h3 className="pool-heading">Current pool · {6+siteAttempt.prospectDecisions.length}/10</h3><div className="pool-strip compact-pool">{[...profiledInitialPool,...selectedProspects].map(m=><MicrobeCard key={m.id} m={m} compact/>)}</div></section>}

      {step==='treatment'&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Treatment</div><h2>Build the three-microbe treatment</h2></div><p className="muted stage-intro-copy">The final pool contains 10 microbes. Build a three-microbe combination that collectively fits the site's Permeability, Mobility and Energy requirements and its required traits.</p><ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>{isSimulation?'I need one final three-microbe recommendation for this site. I will assess the combination against the ranges and traits I gave you.':'I need a trio that works together, not three individually attractive cards. Make sure the combination fits the ranges and the traits I asked for before you confirm it.'}</p></ClientVoice><div className="treatment-bench"><div className="treatment-bench-label">Treatment team · {siteAttempt.treatmentIds.length}/3</div><div className="treatment-slots">{[0,1,2].map(i=>currentTreatment[i]?<MicrobeCard key={currentTreatment[i].id} m={currentTreatment[i]} selected onClick={()=>toggleTreatment(currentTreatment[i].id)}/>:<div className="empty-treatment-slot" key={i}><span>Slot {i+1}</span><small>Select a microbe below</small></div>)}</div></div><div className="pool-strip selectable-pool treatment-available-pool">{availableTreatmentPool.map(m=><MicrobeCard key={m.id} m={m} compact onClick={()=>toggleTreatment(m.id)}/>)}</div>{!isSimulation&&currentTreatment.length===2&&<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" compact><p>With two slots filled, reassess the combination before choosing the third. Think about what the final microbe still needs to contribute across the three attributes and the site traits for the trio to work as a whole.</p></ClientVoice>}<button className="primary" disabled={siteAttempt.treatmentIds.length!==3} onClick={()=>setConfirmTreatment(true)}>Confirm Choice</button></section>}

      {step==='siteResult'&&<section className="panel seawolf-stage-panel"><div className="stage-page-title"><div className="eyebrow">Site {siteIndex+1} · Treatment submitted</div><h2>Treatment Result</h2></div>{isSimulation?<ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist"><p>I have recorded your treatment. I will review its effectiveness and the decisions that led to it in the client close-out after the workstream is complete.</p></ClientVoice>:<><div className="treatment-result-card"><div className="treatment-result-score"><strong>{currentEffect}%</strong><span>site result</span></div><ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist" className="on-accent"><p>{treatmentClientResult()}</p></ClientVoice></div></>}<button className="primary" onClick={continueSite}>{siteIndex<2?'Continue to Next Site':'Review Task 2 Result'}</button></section>}
    </section>

    <aside className="utility seawolf-reference"><div className="eyebrow">Site {siteIndex+1} Information</div><h3>{site.title}</h3><h4>Attributes</h4><div className="metric-row"><span>Permeability</span><strong>{site.ranges.permeability.join('–')}</strong></div><div className="metric-row"><span>Mobility</span><strong>{site.ranges.mobility.join('–')}</strong></div><div className="metric-row"><span>Energy</span><strong>{site.ranges.energy.join('–')}</strong></div><h4>Traits</h4><div className="metric-row"><span>{site.desiredTrait}</span><strong>Desired</strong></div><div className="metric-row"><span>{site.undesiredTrait}</span><strong>Undesired</strong></div>{step==='categorisation'&&siteIndex<2&&nextInsight&&<><hr/><div className="eyebrow">Next Site Insight</div>{nextInsight.kind==='attribute'?<div className="metric-row"><span>{nextInsight.label}</span><strong>{nextInsight.range?.join('–')}</strong></div>:<div className="metric-row"><span>{nextInsight.label}</span><strong>Desired</strong></div>}</>}</aside>

    <ConfirmDialog open={confirmSite} title={`Begin Site ${siteIndex+1}?`} message={siteIndex>0&&transferMicrobes.length?'Transferred microbes will be reassessed first using the complete current-site information. After that, you will select characteristics and route the site deck.':'You will select two characteristics, route 10 microbes, build a separate treatment pool and submit a three-microbe treatment.'} confirmLabel="Start" cancelLabel="Review site" onConfirm={beginSite} onCancel={()=>setConfirmSite(false)}/>
    <ConfirmDialog open={confirmTreatment} title="Confirm Choice" message="Do you want to confirm this microbe selection? Once confirmed, the treatment is locked and you will proceed." confirmLabel="Confirm" cancelLabel="Cancel" onConfirm={lockTreatment} onCancel={()=>setConfirmTreatment(false)}/>
  </div></main>;
}
