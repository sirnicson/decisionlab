import { useEffect, useMemo, useRef, useState, type DragEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../../app/SessionContext';
import { getRedRockScenario } from '../../data/redrock/scenarios';
import type { CalculatorHistoryEntry, Exhibit, ExhibitEvidenceBinding, Fact, JournalItem, Question, RedRockAttempt, RedRockStage, ReportField } from '../../types';
import { formatTime, useCountdown } from '../../hooks/useCountdown';
import OnscreenCalculator from '../../components/OnscreenCalculator';
import ExhibitRenderer, { ExhibitChart } from '../../components/ExhibitRenderer';
import GraphSelectionPreview from '../../components/GraphSelectionPreview';
import ConfirmDialog from '../../components/ConfirmDialog';
import ClientVoice from '../../components/ClientVoice';
import { chartDatumAriaLabel, formatChartValue, SvgChartTooltip, type ChartTooltipDatum } from '../../components/ChartInteraction';

const emptyAttempt=(scenarioId:string,timerStartedAt?:number):RedRockAttempt=>({scenarioId,analysisAnswers:{},reportAnswers:{},graphAnswers:{},visualCaseAnswers:{},journal:[],calculationHistory:[],hintsUsed:0,retries:0,timeUsedSeconds:0,timerStartedAt,completed:false,stage:'investigation',analysisLocked:false,writtenLocked:false,graphLocked:false,visualLocked:false});

type InvestigationTab='objective'|'study'|'exhibit1'|'exhibit2';
type ReportStep='written'|'graph'|'visual';
type JournalPointerDrag={id:string;pointerId:number;clientY:number;offsetY:number;left:number;width:number;height:number};

const numericValue=(raw:string)=>raw.replace(/[^0-9.\-]/g,'');
const hasNumericValue=(value:string|number)=>typeof value==='number'||/[-+]?\d[\d,.]*/.test(String(value));
const slug=(value:string)=>value.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase();

type ExhibitCellContext={seriesName?:string;label?:string;rowLabel?:string;column?:string;rowIndex?:number;columnIndex?:number;value:string|number};
const resolveExhibitFact=(exhibit:Exhibit,source:'exhibit1'|'exhibit2',facts:Fact[],bindings:ExhibitEvidenceBinding[]|undefined,cell:ExhibitCellContext):Fact|undefined=>{
  if(!hasNumericValue(cell.value))return undefined;
  const binding=bindings?.find(b=>b.exhibitId===exhibit.id&&
    (b.seriesName==null||b.seriesName===cell.seriesName)&&
    (b.label==null||b.label===cell.label)&&
    (b.rowLabel==null||b.rowLabel===cell.rowLabel)&&
    (b.column==null||b.column===cell.column));
  const bound=binding?facts.find(f=>f.id===binding.factId):undefined;
  if(bound)return bound;

  const context=cell.seriesName
    ?`${cell.seriesName} — ${cell.label}`
    :(cell.column?.trim().toLowerCase()==='value'
      ?`${cell.rowLabel??`Row ${(cell.rowIndex??0)+1}`}`
      :`${cell.rowLabel??`Row ${(cell.rowIndex??0)+1}`} — ${cell.column??`Value ${(cell.columnIndex??0)+1}`}`);
  const idContext=cell.seriesName
    ?`${cell.seriesName} — ${cell.label}`
    :(cell.column?.trim().toLowerCase()==='value'?`${cell.rowLabel??`Row ${(cell.rowIndex??0)+1}`} — Value`:context);
  const id=`${exhibit.id}-${slug(idContext)}`;

  // Salvanova Exhibit 2 mixes percentages with a tourism series expressed in $000.
  // Normalise Research Journal evidence to decision-ready units without changing the exhibit itself.
  if(exhibit.id==='s-ex2'&&cell.seriesName==='Vegetation cover')return {id,label:`${exhibit.title}: Vegetation cover — ${cell.label}`,value:cell.value,unit:'%',relevance:'medium',draggable:true,source};
  if(exhibit.id==='s-ex2'&&cell.seriesName==='Tourism revenue index ($000)'){
    const numeric=typeof cell.value==='number'?cell.value:Number(cell.value);
    return {id,label:`${exhibit.title}: Tourism revenue — ${cell.label}`,value:Number.isFinite(numeric)?numeric*1000:cell.value,unit:'$',relevance:'medium',draggable:true,source};
  }

  return {id,label:`${exhibit.title}: ${context}`,value:cell.value,unit:cell.seriesName?exhibit.unit:undefined,relevance:'medium',draggable:true,source};
};
const exhibitEvidence=(exhibit:Exhibit,source:'exhibit1'|'exhibit2',facts:Fact[],bindings?:ExhibitEvidenceBinding[]):Fact[]=>{
  if(exhibit.series&&exhibit.labels){
    return exhibit.series.flatMap(series=>series.values.flatMap((value,i)=>{
      const fact=resolveExhibitFact(exhibit,source,facts,bindings,{seriesName:series.name,label:exhibit.labels?.[i]??String(i+1),value});
      return fact?[fact]:[];
    }));
  }
  if(exhibit.rows&&exhibit.columns){
    return exhibit.rows.flatMap((row,ri)=>row.slice(1).flatMap((value,ci)=>{
      const fact=resolveExhibitFact(exhibit,source,facts,bindings,{rowLabel:String(row[0]),column:exhibit.columns?.[ci+1]??`Value ${ci+1}`,rowIndex:ri,columnIndex:ci+1,value});
      return fact?[fact]:[];
    }));
  }
  return [];
};

const compactEvidenceLabel=(label:string,origin?:JournalItem['origin'])=>{
  let compact=label.trim();
  compact=compact.replace(/^Exhibit\s+\d+\s+[—-]\s*/i,'');
  if(origin?.startsWith('Exhibit')&&compact.includes(':'))compact=compact.split(':').slice(1).join(':').trim();
  compact=compact
    .replace(/\s+[—-]\s+/g,' · ')
    .replace(/^Projected\s+/i,'')
    .replace(/^Vegetation recovery and tourism:?\s*/i,'')
    .replace(/^Programme delivery constraints:?\s*/i,'')
    .replace(/^Forest-cover scenarios:?\s*/i,'')
    .replace(/^Projected mountain hare population:?\s*/i,'')
    .replace(/^Vegetation cover(?:\s*·)?\s*/i,'Vegetation cover · ')
    .replace(/^Tourism revenue index \(\$000\)(?:\s*·)?\s*/i,'Tourism revenue · ')
    .replace(/^No Wolves/i,'No wolves')
    .replace(/^With Wolves/i,'With wolves');
  return compact;
};

const formatAnalysisJournalValue=(value:string,unit?:string)=>{
  const trimmed=value.trim();
  const parsed=Number(numericValue(trimmed));
  const formatted=trimmed!==''&&Number.isFinite(parsed)?parsed.toLocaleString('en-US',{maximumFractionDigits:4}):trimmed;
  if(!unit)return formatted;
  if(unit==='$')return `$${formatted}`;
  if(unit==='$m')return `$${formatted}m`;
  return `${formatted} ${unit}`;
};

export default function RedRockPage(){
  const navigate=useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();
  const {session,setRedRockAttempt,updateSession,completeSession}=useSession();
  const scenario=getRedRockScenario(session?.selectedRedRockId);
  const isSimulation=session?.mode==='simulation';
  const timerEnabled=Boolean(isSimulation||session?.learningTimerEnabled);
  const saved=session?.redRockAttempt?.scenarioId===scenario.id?session.redRockAttempt:undefined;
  const [attempt,setAttempt]=useState<RedRockAttempt>(saved??emptyAttempt(scenario.id,timerEnabled?Date.now():undefined));
  const [stage,setStage]=useState<RedRockStage>(saved?.stage??'investigation');
  const [investigationTab,setInvestigationTab]=useState<InvestigationTab>('objective');
  const [reportStep,setReportStep]=useState<ReportStep>(saved?.stage==='graph'?'graph':saved?.stage==='visual'?'visual':'written');
  const [visualCaseIndex,setVisualCaseIndex]=useState(0);
  const [confirm,setConfirm]=useState<null|'analysis'|'written'|'graph'|'visual'>(null);
  const [dragFactId,setDragFactId]=useState<string|null>(null);
  const [dragJournalId,setDragJournalId]=useState<string|null>(null);
  const [journalPointerDrag,setJournalPointerDrag]=useState<JournalPointerDrag|null>(null);
  const [journalDropIndex,setJournalDropIndex]=useState<number|null>(null);
  const journalPointerDragRef=useRef<JournalPointerDrag|null>(null);
  const journalDropIndexRef=useRef<number|null>(null);
  const journalRef=useRef<HTMLElement|null>(null);
  const [journalOver,setJournalOver]=useState(false);
  const timer=useCountdown(35*60,timerEnabled,attempt.timerStartedAt);

  const setView=(view:string,extra?:Record<string,string|number>)=>{
    const next=new URLSearchParams();next.set('view',view);
    Object.entries(extra??{}).forEach(([key,value])=>next.set(key,String(value)));
    setSearchParams(next);
  };

  useEffect(()=>{
    const view=searchParams.get('view');
    const attemptStage=attempt.stage??'investigation';
    if(!view){
      if(attemptStage==='investigation'){setStage('investigation');setInvestigationTab('objective');return;}
      if(attemptStage==='analysis'&&!attempt.analysisLocked){setStage('analysis');return;}
      if(attemptStage==='written'&&!attempt.writtenLocked){setStage('written');setReportStep('written');return;}
      if(attemptStage==='graph'&&!attempt.graphLocked){setStage('graph');setReportStep('graph');return;}
      if(attemptStage==='visual'&&!attempt.visualLocked){setStage('visual');setReportStep('visual');return;}
      return;
    }
    if(['objective','study','exhibit1','exhibit2'].includes(view)&&!attempt.analysisLocked&&(attemptStage==='investigation'||attemptStage==='analysis')){setStage('investigation');setInvestigationTab(view as InvestigationTab);return;}
    if(view==='analysis'&&!attempt.analysisLocked&&attemptStage==='analysis'){setStage('analysis');const q=Math.max(1,Math.min(4,Number(searchParams.get('q')||1)));setTimeout(()=>scrollTo(q===1?'analysis-top':scenario.analysisSections[q-1]?.id??'analysis-top'),0);return;}
    if(view==='written'&&!attempt.writtenLocked&&attemptStage==='written'){setStage('written');setReportStep('written');return;}
    if(view==='graph'&&attempt.writtenLocked&&!attempt.graphLocked&&attemptStage==='graph'){setStage('graph');setReportStep('graph');return;}
    if(view==='visual'&&attempt.graphLocked&&!attempt.visualLocked&&attemptStage==='visual'){setStage('visual');setReportStep('visual');setVisualCaseIndex(Math.max(0,Math.min(5,Number(searchParams.get('case')||1)-1)));}
  },[searchParams,attempt.analysisLocked,attempt.writtenLocked,attempt.graphLocked,attempt.visualLocked,attempt.stage,scenario.analysisSections]);

  useEffect(()=>{if(!session?.selectedRedRockId)navigate('/',{replace:true})},[session?.selectedRedRockId,navigate]);

  const persist=(next:RedRockAttempt)=>{setAttempt(next);setRedRockAttempt({...next,timeUsedSeconds:timer.elapsed})};
  const setStagePersist=(next:RedRockStage)=>{const n={...attempt,stage:next};persist(n);setStage(next);setView(next==='investigation'?'objective':next);window.scrollTo({top:0,behavior:'smooth'})};
  const updateJournal=(journal:JournalItem[])=>persist({...attempt,journal});
  const upsertJournal=(item:JournalItem)=>{
    const idx=attempt.journal.findIndex(j=>j.id===item.id);
    const journal=idx>=0?attempt.journal.map((j,i)=>i===idx?item:j):[...attempt.journal,item];
    updateJournal(journal);
  };
  const formatEvidenceValue=(fact:Fact)=>{const raw=typeof fact.value==='number'?fact.value.toLocaleString('en-US',{maximumFractionDigits:4}):String(fact.value);if(!fact.unit)return raw;if(fact.unit==='$')return `$${raw}`;if(fact.unit==='$m')return `$${raw}m`;return `${raw} ${fact.unit}`};
  const canonicalInvestigationFacts=useMemo(()=>{
    const all=[
      ...scenario.facts,
      ...exhibitEvidence(scenario.exhibits[0],'exhibit1',scenario.facts,scenario.exhibitEvidenceBindings),
      ...exhibitEvidence(scenario.exhibits[1],'exhibit2',scenario.facts,scenario.exhibitEvidenceBindings),
    ];
    return new Map(all.map(f=>[f.id,f] as const));
  },[scenario]);
  const journalDisplayLabel=(item:JournalItem)=>{
    if(item.source==='analysis'){
      const q=scenario.analysisQuestions.find(question=>`analysis-${question.id}`===item.factId);
      if(q)return q.journalLabel??q.prompt;
    }
    const canonical=item.source==='investigation'?canonicalInvestigationFacts.get(item.factId):undefined;
    return compactEvidenceLabel(canonical?.label??item.label,item.origin);
  };
  const journalDisplayValue=(item:JournalItem)=>{
    if(item.source==='investigation'){
      const canonical=canonicalInvestigationFacts.get(item.factId);
      if(canonical)return formatEvidenceValue(canonical);
    }
    if(item.source==='analysis'){
      const q=scenario.analysisQuestions.find(question=>`analysis-${question.id}`===item.factId);
      if(q)return formatAnalysisJournalValue(attempt.analysisAnswers[q.id]??item.value,q.unit);
    }
    return item.value;
  };
  const journalDragValue=(item:JournalItem)=>{
    if(item.source==='investigation'){
      const canonical=canonicalInvestigationFacts.get(item.factId);
      if(canonical)return String(canonical.value);
    }
    if(item.source==='analysis'){
      const q=scenario.analysisQuestions.find(question=>`analysis-${question.id}`===item.factId);
      if(q)return attempt.analysisAnswers[q.id]??numericValue(item.value);
    }
    return numericValue(item.value);
  };
  const addEvidence=(fact:Fact)=>{const origin=fact.source==='exhibit1'?'Exhibit 1':fact.source==='exhibit2'?'Exhibit 2':'Study Information';upsertJournal({id:`fact-${fact.id}`,factId:fact.id,label:compactEvidenceLabel(fact.label,origin),value:formatEvidenceValue(fact),important:false,source:'investigation',origin})};
  const startFactDrag=(e:DragEvent,fact:Fact)=>{setDragFactId(fact.id);e.dataTransfer.effectAllowed='copy';e.dataTransfer.setData('application/x-solve-fact',fact.id);e.dataTransfer.setData('application/x-solve-value',String(fact.value));e.dataTransfer.setData('application/x-solve-label',fact.label);e.dataTransfer.setData('application/x-solve-unit',fact.unit??'');e.dataTransfer.setData('text/plain',String(fact.value))};
  const addFact=(factId:string)=>{const fact=scenario.facts.find(f=>f.id===factId);if(fact)addEvidence(fact)};
  const returnJournalItem=(id:string)=>updateJournal(attempt.journal.filter(j=>j.id!==id));
  const reorderJournalItemToIndex=(draggedId:string,insertionIndex:number)=>{
    const current=[...attempt.journal];
    const fromIndex=current.findIndex(j=>j.id===draggedId);
    if(fromIndex<0)return;
    const [moved]=current.splice(fromIndex,1);
    const toIndex=Math.max(0,Math.min(current.length,insertionIndex));
    current.splice(toIndex,0,moved);
    const changed=current.some((item,index)=>item.id!==attempt.journal[index]?.id);
    if(changed)updateJournal(current);
  };
  const moveJournalItemBy=(id:string,delta:number)=>{
    const current=[...attempt.journal];
    const fromIndex=current.findIndex(j=>j.id===id);
    if(fromIndex<0)return;
    const toIndex=Math.max(0,Math.min(current.length-1,fromIndex+delta));
    if(toIndex===fromIndex)return;
    const [moved]=current.splice(fromIndex,1);
    current.splice(toIndex,0,moved);
    updateJournal(current);
  };
  const setAnswer=(bucket:'analysisAnswers'|'reportAnswers'|'graphAnswers'|'visualCaseAnswers',id:string,value:string,question?:Question)=>{
    const next={...attempt,[bucket]:{...(attempt[bucket]??{}),[id]:value}} as RedRockAttempt;
    setAttempt(next);setRedRockAttempt({...next,timeUsedSeconds:timer.elapsed});
    if(bucket==='analysisAnswers'&&value.trim()){
      const q=question??scenario.analysisQuestions.find(x=>x.id===id);
      const item:JournalItem={id:`analysis-${id}`,factId:`analysis-${id}`,label:q?.journalLabel??q?.prompt??id,value:formatAnalysisJournalValue(value,q?.unit),important:false,source:'analysis',origin:'Analysis'};
      const idx=next.journal.findIndex(j=>j.id===item.id);
      const journal=idx>=0?next.journal.map((j,i)=>i===idx?item:j):[...next.journal,item];
      const withJournal={...next,journal};setAttempt(withJournal);setRedRockAttempt({...withJournal,timeUsedSeconds:timer.elapsed});
    }
  };

  const answerDrop=(setter:(v:string)=>void)=>(e:DragEvent)=>{e.preventDefault();const v=e.dataTransfer.getData('application/x-solve-value')||e.dataTransfer.getData('text/plain');if(v)setter(numericValue(v)||v)};
  const appendCalculationHistory=(entry:CalculatorHistoryEntry)=>persist({...attempt,calculationHistory:[...(attempt.calculationHistory??[]),entry]});
  const draggableFacts=useMemo(()=>scenario.facts.filter(f=>f.draggable),[scenario]);
  const factsForTab:Fact[]=investigationTab==='study'
    ? draggableFacts.filter(f=>f.source==='study')
    : investigationTab==='exhibit1'
      ? exhibitEvidence(scenario.exhibits[0],'exhibit1',scenario.facts,scenario.exhibitEvidenceBindings)
      : investigationTab==='exhibit2'
        ? exhibitEvidence(scenario.exhibits[1],'exhibit2',scenario.facts,scenario.exhibitEvidenceBindings)
        : [];

  const completeAnalysis=()=>{const next={...attempt,analysisLocked:true,stage:'written' as RedRockStage};persist(next);setStage('written');setReportStep('written');setView('written');setConfirm(null);window.scrollTo({top:0})};
  const completeWritten=()=>{const next={...attempt,writtenLocked:true,stage:'graph' as RedRockStage};persist(next);setStage('graph');setReportStep('graph');setView('graph');setConfirm(null);window.scrollTo({top:0})};
  const completeGraph=()=>{const next={...attempt,graphLocked:true,stage:'visual' as RedRockStage};persist(next);setStage('visual');setReportStep('visual');setVisualCaseIndex(0);setView('visual',{case:1});setConfirm(null);window.scrollTo({top:0})};
  const completeVisual=()=>{
    const done={...attempt,visualLocked:true,completed:true,stage:'complete' as RedRockStage,timeUsedSeconds:timer.elapsed};persist(done);setConfirm(null);
    if(isSimulation){updateSession({currentTask:'redrock'});navigate('/task1-result')}
    else{completeSession();navigate('/task1-result')}
  };

  const scrollTo=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});

  const renderAnswerField=(q:Question,bucket:'analysisAnswers'|'visualCaseAnswers')=>{
    const value=attempt[bucket][q.id]??'';
    if(q.responseType==='single-select')return <select value={value} onChange={e=>setAnswer(bucket,q.id,e.target.value,q)}><option value="">Select one option</option>{q.options?.map(o=><option key={o}>{o}</option>)}</select>;
    return <div className="answer-with-unit"><input type="text" inputMode={q.responseType==='number'?'decimal':undefined} autoComplete="off" value={value} onChange={e=>setAnswer(bucket,q.id,e.target.value,q)} onDragOver={e=>e.preventDefault()} onDrop={answerDrop(v=>setAnswer(bucket,q.id,v,q))} placeholder="Enter or drop answer"/>{q.unit&&<span>{q.unit}</span>}</div>
  };

  const renderReportInput=(field:ReportField,bucket:'reportAnswers'|'graphAnswers'='reportAnswers')=>{
    const value=(attempt[bucket]??{})[field.id]??'';
    return <span className="inline-report-field"><input aria-label={field.label} type="text" inputMode="decimal" autoComplete="off" maxLength={24} value={value} onChange={e=>setAnswer(bucket,field.id,e.target.value)} onDragOver={e=>e.preventDefault()} onDrop={answerDrop(v=>setAnswer(bucket,field.id,v))} placeholder="—"/>{field.unit&&<small>{field.unit}</small>}</span>
  };

  const beginJournalPointerSort=(e:ReactPointerEvent<HTMLButtonElement>,item:JournalItem)=>{
    if(e.button!==0)return;
    const article=e.currentTarget.closest<HTMLElement>('[data-journal-id]');
    if(!article)return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.focus();
    const rect=article.getBoundingClientRect();
    const originalIndex=attempt.journal.findIndex(j=>j.id===item.id);
    const drag:JournalPointerDrag={
      id:item.id,
      pointerId:e.pointerId,
      clientY:e.clientY,
      offsetY:e.clientY-rect.top,
      left:rect.left,
      width:rect.width,
      height:rect.height,
    };
    journalPointerDragRef.current=drag;
    journalDropIndexRef.current=Math.max(0,originalIndex);
    setDragJournalId(null);
    setJournalPointerDrag(drag);
    setJournalDropIndex(Math.max(0,originalIndex));
  };

  useEffect(()=>{
    if(!journalPointerDrag?.id)return;
    document.body.classList.add('journal-pointer-sorting');
    let frame=0;

    const computeDropIndex=(clientY:number)=>{
      const container=journalRef.current;
      if(!container)return;
      const cards=Array.from(container.querySelectorAll<HTMLElement>('[data-journal-sort-card="true"]'));
      let index=0;
      for(const card of cards){
        const rect=card.getBoundingClientRect();
        if(clientY>rect.top+rect.height/2)index+=1;
      }
      if(journalDropIndexRef.current!==index){
        journalDropIndexRef.current=index;
        setJournalDropIndex(index);
      }
    };

    const onPointerMove=(event:PointerEvent)=>{
      const active=journalPointerDragRef.current;
      if(!active||event.pointerId!==active.pointerId)return;
      event.preventDefault();
      const next={...active,clientY:event.clientY};
      journalPointerDragRef.current=next;
      setJournalPointerDrag(next);
      computeDropIndex(event.clientY);
    };

    const finishSort=(commit:boolean)=>{
      const active=journalPointerDragRef.current;
      const targetIndex=journalDropIndexRef.current;
      if(commit&&active&&targetIndex!=null)reorderJournalItemToIndex(active.id,targetIndex);
      journalPointerDragRef.current=null;
      journalDropIndexRef.current=null;
      setJournalPointerDrag(null);
      setJournalDropIndex(null);
      document.body.classList.remove('journal-pointer-sorting');
    };

    const onPointerUp=(event:PointerEvent)=>{
      const active=journalPointerDragRef.current;
      if(!active||event.pointerId!==active.pointerId)return;
      event.preventDefault();
      finishSort(true);
    };
    const onPointerCancel=(event:PointerEvent)=>{
      const active=journalPointerDragRef.current;
      if(!active||event.pointerId!==active.pointerId)return;
      finishSort(false);
    };

    const autoScroll=()=>{
      const active=journalPointerDragRef.current;
      const container=journalRef.current;
      if(active&&container){
        const rect=container.getBoundingClientRect();
        const edge=72;
        let speed=0;
        if(active.clientY<rect.top+edge){
          const proximity=Math.max(0,Math.min(1,(rect.top+edge-active.clientY)/edge));
          speed=-(3+proximity*11);
        }else if(active.clientY>rect.bottom-edge){
          const proximity=Math.max(0,Math.min(1,(active.clientY-(rect.bottom-edge))/edge));
          speed=3+proximity*11;
        }
        if(speed!==0){
          const before=container.scrollTop;
          container.scrollTop+=speed;
          if(container.scrollTop!==before)computeDropIndex(active.clientY);
        }
      }
      frame=requestAnimationFrame(autoScroll);
    };

    window.addEventListener('pointermove',onPointerMove,{passive:false});
    window.addEventListener('pointerup',onPointerUp,{passive:false});
    window.addEventListener('pointercancel',onPointerCancel);
    frame=requestAnimationFrame(autoScroll);
    return ()=>{
      window.removeEventListener('pointermove',onPointerMove);
      window.removeEventListener('pointerup',onPointerUp);
      window.removeEventListener('pointercancel',onPointerCancel);
      cancelAnimationFrame(frame);
      document.body.classList.remove('journal-pointer-sorting');
    };
  },[journalPointerDrag?.id,attempt.journal]);

  const renderJournal=()=>{
    const activeSortId=journalPointerDrag?.id??null;
    const draggedItem=activeSortId?attempt.journal.find(j=>j.id===activeSortId):undefined;
    const visibleItems=activeSortId?attempt.journal.filter(j=>j.id!==activeSortId):attempt.journal;
    const placeholderIndex=activeSortId?Math.max(0,Math.min(visibleItems.length,journalDropIndex??0)):-1;

    const renderJournalCard=(j:JournalItem)=> <article
      key={j.id}
      data-journal-id={j.id}
      data-journal-sort-card="true"
      className={`journal-item draggable-journal ${j.important?'important':''}`}
      draggable={!activeSortId}
      onDragStart={e=>{
        if((e.target as HTMLElement).closest('.journal-reorder-handle')){e.preventDefault();return;}
        setDragJournalId(j.id);
        e.dataTransfer.effectAllowed='copy';
        e.dataTransfer.setData('application/x-solve-value',journalDragValue(j));
        e.dataTransfer.setData('application/x-solve-journal-id',j.id);
        e.dataTransfer.setData('text/plain',journalDragValue(j));
      }}
      onDragEnd={()=>setDragJournalId(null)}
    >
      <button
        type="button"
        className="journal-reorder-handle"
        draggable={false}
        aria-label={`Reorder ${journalDisplayLabel(j)}. Drag vertically or use the Up and Down arrow keys.`}
        title="Drag vertically to reorder · Up/Down arrows also move this card"
        onPointerDown={e=>beginJournalPointerSort(e,j)}
        onKeyDown={e=>{
          if(e.key==='ArrowUp'){e.preventDefault();moveJournalItemBy(j.id,-1)}
          if(e.key==='ArrowDown'){e.preventDefault();moveJournalItemBy(j.id,1)}
        }}
      >
        <svg viewBox="0 0 20 24" aria-hidden="true">
          <circle cx="6" cy="6" r="1.5"/><circle cx="14" cy="6" r="1.5"/>
          <circle cx="6" cy="12" r="1.5"/><circle cx="14" cy="12" r="1.5"/>
          <circle cx="6" cy="18" r="1.5"/><circle cx="14" cy="18" r="1.5"/>
        </svg>
      </button>
      <div className="journal-item-content">
        <div className="journal-source">{j.origin??(j.source==='analysis'?'Analysis':'Collected evidence')}</div>
        <div className="journal-label" title={journalDisplayLabel(j)}>{journalDisplayLabel(j)}</div>
        <strong>{journalDisplayValue(j)}</strong>
      </div>
      <div className="journal-actions" aria-label="Journal item actions">
        <button
          type="button"
          className={`journal-action journal-action-important ${j.important?'active':''}`}
          aria-label={j.important?'Unmark as important':'Mark as important'}
          aria-pressed={j.important}
          title={j.important?'Unmark as important':'Mark as important'}
          onPointerDown={e=>e.stopPropagation()}
          onClick={()=>updateJournal(attempt.journal.map(item=>item.id===j.id?{...item,important:!item.important}:item))}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.2 17 19 7"/></svg>
        </button>
        <button
          type="button"
          className="journal-action journal-action-return"
          aria-label={j.source==='analysis'?'Return unavailable for analysis evidence':'Return evidence'}
          title={j.source==='analysis'?'Return unavailable for analysis evidence':'Return evidence'}
          disabled={j.source==='analysis'}
          onPointerDown={e=>e.stopPropagation()}
          onClick={()=>{if(j.source!=='analysis')returnJournalItem(j.id)}}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 0 1 6 6"/></svg>
        </button>
      </div>
    </article>;

    return <section
      ref={journalRef}
      className={`utility journal-dropzone ${journalOver?'drag-over':''}${activeSortId?' is-sorting':''}`}
      onDragOver={e=>{if(dragFactId){e.preventDefault();setJournalOver(true)}}}
      onDragLeave={()=>setJournalOver(false)}
      onDrop={e=>{
        e.preventDefault();
        const id=dragFactId||e.dataTransfer.getData('application/x-solve-fact');
        if(id){const known=scenario.facts.find(f=>f.id===id)||factsForTab.find(f=>f.id===id);if(known)addEvidence(known)}
        setDragFactId(null);setJournalOver(false);
      }}
    >
      <div className="eyebrow">Research Journal · Collected Evidence</div>
      {attempt.journal.length===0&&<div className="journal-empty"><strong>Drag evidence here</strong><p>Move useful data from Investigation into your journal.</p></div>}
      {activeSortId ? <>
        {visibleItems.map((j,index)=><div key={j.id} className="journal-sort-slot">
          {placeholderIndex===index&&<div className="journal-sort-placeholder" style={{height:journalPointerDrag?.height??94}} aria-hidden="true"><span>Drop here</span></div>}
          {renderJournalCard(j)}
        </div>)}
        {placeholderIndex===visibleItems.length&&<div className="journal-sort-placeholder" style={{height:journalPointerDrag?.height??94}} aria-hidden="true"><span>Drop here</span></div>}
      </> : visibleItems.map(renderJournalCard)}
      {draggedItem&&journalPointerDrag&&<div
        className={`journal-sort-preview ${draggedItem.important?'important':''}`}
        style={{
          top:journalPointerDrag.clientY-journalPointerDrag.offsetY,
          left:journalPointerDrag.left,
          width:journalPointerDrag.width,
          height:journalPointerDrag.height,
        }}
        aria-hidden="true"
      >
        <div className="journal-sort-preview-handle">
          <svg viewBox="0 0 20 24"><circle cx="6" cy="6" r="1.5"/><circle cx="14" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="14" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/><circle cx="14" cy="18" r="1.5"/></svg>
        </div>
        <div className="journal-item-content">
          <div className="journal-source">{draggedItem.origin??(draggedItem.source==='analysis'?'Analysis':'Collected evidence')}</div>
          <div className="journal-label">{journalDisplayLabel(draggedItem)}</div>
          <strong>{journalDisplayValue(draggedItem)}</strong>
        </div>
        <div className="journal-actions journal-sort-preview-actions">
          <span className={`journal-action journal-action-important ${draggedItem.important?'active':''}`}><svg viewBox="0 0 24 24"><path d="M5 12.5 9.2 17 19 7"/></svg></span>
          <span className="journal-action journal-action-return"><svg viewBox="0 0 24 24"><path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 0 1 6 6"/></svg></span>
        </div>
      </div>}
    </section>;
  };

  const InlineEvidence=({fact,text}:{fact:Fact;text:string})=>{
    const collected=attempt.journal.some(j=>j.factId===fact.id);
    return <span
      className={`inline-evidence${collected?' collected':''}`}
      draggable
      role="button"
      tabIndex={0}
      aria-label={`${text}. ${collected?'Already collected; activate to keep in Research Journal':'Add to Research Journal'}`}
      title="Drag or click to add to Research Journal"
      onDragStart={e=>startFactDrag(e,fact)}
      onDragEnd={()=>setDragFactId(null)}
      onClick={()=>addEvidence(fact)}
      onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();addEvidence(fact)}}}
    >{text}</span>;
  };

  const StudyInformation=()=> <div className="study-copy inline-study-evidence" onDragOver={e=>{if(dragJournalId)e.preventDefault()}} onDrop={e=>{if(!dragJournalId)return;e.preventDefault();const id=e.dataTransfer.getData('application/x-solve-journal-id')||dragJournalId;if(id)returnJournalItem(id)}}>
    {scenario.studyInformation.map((paragraph,paragraphIndex)=>{
      const mappings=(scenario.studyEvidence??[])
        .filter(m=>m.paragraphIndex===paragraphIndex)
        .map(m=>({...m,start:paragraph.indexOf(m.text)}))
        .filter(m=>m.start>=0)
        .sort((a,b)=>a.start-b.start);
      if(!mappings.length)return <p key={paragraphIndex}>{paragraph}</p>;
      const nodes:ReactNode[]=[];let cursor=0;
      mappings.forEach((m,i)=>{if(m.start<cursor)return;nodes.push(paragraph.slice(cursor,m.start));const fact=scenario.facts.find(f=>f.id===m.factId);if(fact)nodes.push(<InlineEvidence key={`${paragraphIndex}-${i}-${m.factId}`} fact={fact} text={m.text}/>);else nodes.push(m.text);cursor=m.start+m.text.length});
      nodes.push(paragraph.slice(cursor));
      return <p key={paragraphIndex}>{nodes}</p>;
    })}
    {dragJournalId&&<div className="return-drop-hint">Use the Return action in the Research Journal to remove collected evidence.</div>}
  </div>;

  const MiniTrend=({title,values,labels,unit}:{title:string;values:number[];labels:string[];unit?:string})=>{
    const [tooltip,setTooltip]=useState<ChartTooltipDatum|null>(null);
    const W=340,H=118,pad={l:18,r:18,t:18,b:24};
    const min=Math.min(...values),max=Math.max(...values);const span=max-min||1;
    const x=(i:number)=>pad.l+(values.length===1?0:i*(W-pad.l-pad.r)/(values.length-1));
    const y=(v:number)=>pad.t+(H-pad.t-pad.b)-((v-min)/span)*(H-pad.t-pad.b);
    const pts=values.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
    const hover=(datum:ChartTooltipDatum)=>setTooltip({...datum,pinned:false});
    const leave=()=>setTooltip(current=>current?.pinned?current:null);
    const pin=(datum:ChartTooltipDatum)=>setTooltip(current=>current?.key===datum.key&&current.pinned?null:{...datum,pinned:true});
    const keyPin=(event:KeyboardEvent<SVGElement>,datum:ChartTooltipDatum)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pin(datum)}};
    return <div className="mini-trend">
      <div className="mini-trend-title"><strong>{title}</strong><span>{unit??''}</span></div>
      <svg className="interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label={`${title} trend. Hover, focus or tap a point to see its exact value.`} onPointerLeave={leave}>
        <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#d6ddd4"/>
        <polyline points={pts} fill="none" stroke="#355A48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        {values.map((v,i)=>{
          const cx=x(i),cy=y(v),label=labels[i]??String(i+1);
          const datum:ChartTooltipDatum={key:`${title}-${label}-${i}`,x:cx,y:cy,context:label,value:v,unit};
          return <g key={i} className="chart-data-mark chart-point-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={e=>keyPin(e,datum)}>
            <circle className="chart-point-hit" cx={cx} cy={cy} r="10" fill="transparent"/>
            <circle className="chart-point-core" cx={cx} cy={cy} r="4" fill="#8FC21F"/>
          </g>;
        })}
        <text x={pad.l} y={H-6} fontSize="10" fill="#68746c">{labels[0]}</text>
        <text x={W-pad.r} y={H-6} textAnchor="end" fontSize="10" fill="#68746c">{labels[labels.length-1]}</text>
        <SvgChartTooltip datum={tooltip} width={W} height={H}/>
      </svg>
      <div className="mini-trend-values"><span>{values[0]}{unit?` ${unit}`:''}</span><span>{values[values.length-1]}{unit?` ${unit}`:''}</span></div>
    </div>;
  };




  const ThresholdTrend=({title,values,labels,thresholdLabel}:{title:string;values:number[];labels:string[];thresholdLabel:string})=>{
    const [tooltip,setTooltip]=useState<ChartTooltipDatum|null>(null);
    const threshold=Number(thresholdLabel.replace(/[^0-9.-]/g,''));
    const W=340,H=132,pad={l:18,r:18,t:20,b:26};
    const all=[...values,threshold];const min=Math.min(...all),max=Math.max(...all);const span=max-min||1;
    const x=(i:number)=>pad.l+(values.length===1?0:i*(W-pad.l-pad.r)/(values.length-1));
    const y=(v:number)=>pad.t+(H-pad.t-pad.b)-((v-min)/span)*(H-pad.t-pad.b);
    const pts=values.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
    const hover=(datum:ChartTooltipDatum)=>setTooltip({...datum,pinned:false});
    const leave=()=>setTooltip(current=>current?.pinned?current:null);
    const pin=(datum:ChartTooltipDatum)=>setTooltip(current=>current?.key===datum.key&&current.pinned?null:{...datum,pinned:true});
    const keyPin=(event:KeyboardEvent<SVGElement>,datum:ChartTooltipDatum)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pin(datum)}};
    return <div className="mini-trend threshold-trend">
      <div className="mini-trend-title"><strong>{title}</strong><span>mg/L</span></div>
      <div className="threshold-reference-label">Target {thresholdLabel}</div>
      <svg className="interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label={`${title} projection with programme threshold ${thresholdLabel}. Hover, focus or tap a point to see its exact value.`} onPointerLeave={leave}>
        <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#d6ddd4"/>
        <line className="threshold-reference-line" x1={pad.l} y1={y(threshold)} x2={W-pad.r} y2={y(threshold)}/>
        <polyline points={pts} fill="none" stroke="#355A48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        {values.map((v,i)=>{const cx=x(i),cy=y(v),label=labels[i]??String(i+1);const datum:ChartTooltipDatum={key:`threshold-${title}-${label}-${i}`,x:cx,y:cy,context:`${title} · ${label}`,value:v,unit:'mg/L'};return <g key={i} className="chart-data-mark chart-point-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={e=>keyPin(e,datum)}><circle className="chart-point-hit" cx={cx} cy={cy} r="10" fill="transparent"/><circle className="chart-point-core" cx={cx} cy={cy} r="4" fill="#8FC21F"/></g>})}
        <text x={pad.l} y={H-6} fontSize="10" fill="#68746c">{labels[0]}</text><text x={W-pad.r} y={H-6} textAnchor="end" fontSize="10" fill="#68746c">{labels[labels.length-1]}</text>
        <SvgChartTooltip datum={tooltip} width={W} height={H}/>
      </svg>
    </div>;
  };

  const RawAreaComparison=({affected,active}:{affected:number;active:number})=>{
    const [tooltip,setTooltip]=useState<ChartTooltipDatum|null>(null);
    const values=[
      {label:'Wildfire-affected area',shortLabel:'Affected area',value:affected},
      {label:'Planned active restoration',shortLabel:'Active restoration',value:active}
    ];
    const max=Math.max(...values.map(item=>item.value),1);
    const W=680,H=238,pad={l:22,r:22,t:18,b:28};
    const plotWidth=W-pad.l-pad.r;
    const hover=(datum:ChartTooltipDatum)=>setTooltip({...datum,pinned:false});
    const leave=()=>setTooltip(current=>current?.pinned?current:null);
    const pin=(datum:ChartTooltipDatum)=>setTooltip(current=>current?.key===datum.key&&current.pinned?null:{...datum,pinned:true});
    const keyPin=(event:KeyboardEvent<SVGElement>,datum:ChartTooltipDatum)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pin(datum)}};
    const ticks=[0,max/3,(max*2)/3,max];
    const tickLabel=(value:number)=>value===0?'0':`${Math.round(value/1000)}k`;
    return <div className="raw-area-comparison"><svg className="interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label="Norvale programme scale comparison. Hover, focus or tap a bar to see its exact area." onPointerLeave={leave}>
      {values.map((item,i)=>{const labelY=26+i*88;const barY=labelY+18;const width=(item.value/max)*plotWidth;const datum:ChartTooltipDatum={key:`norvale-area-${i}`,x:pad.l+width,y:barY+9,context:item.shortLabel,value:item.value,unit:'ha'};return <g key={item.label} className="chart-data-mark chart-bar-mark" tabIndex={0} aria-label={chartDatumAriaLabel(item.label,item.value,'ha')} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={e=>keyPin(e,datum)}><text className="raw-area-label" x={pad.l} y={labelY}>{item.label}</text><text className="raw-area-value" x={W-pad.r} y={labelY} textAnchor="end">{item.value.toLocaleString()} ha</text><rect className="chart-bar-core raw-area-bar" x={pad.l} y={barY} width={width} height="18" rx="5"/></g>})}
      <line className="raw-area-axis" x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b}/>
      {ticks.map((tick,i)=>{const x=pad.l+(tick/max)*plotWidth;return <g key={i}><line className="raw-area-tick" x1={x} y1={H-pad.b} x2={x} y2={H-pad.b+5}/><text className="raw-area-tick-label" x={x} y={H-8} textAnchor={i===0?'start':i===ticks.length-1?'end':'middle'}>{tickLabel(tick)}</text></g>})}
      {tooltip&&(()=>{const boxW=136,boxH=38;const x=Math.max(8,Math.min(W-boxW-8,tooltip.x-boxW/2));const y=Math.min(H-pad.b-boxH-8,tooltip.y+13);return <g className="raw-area-tooltip" aria-hidden="true" pointerEvents="none"><rect x={x} y={y} width={boxW} height={boxH} rx="7"/><text x={x+10} y={y+15}><tspan className="raw-area-tooltip-context" x={x+10}>{tooltip.context}</tspan><tspan className="raw-area-tooltip-value" x={x+10} dy="15">{formatChartValue(tooltip.value,tooltip.unit)}</tspan></text></g>})()}
    </svg></div>;
  };

  const InvestigationVisual=({exhibit}:{exhibit:Exhibit})=>{
    if(exhibit.id==='s-ex1'||exhibit.id==='n-ex1'){
      return <div className="investigation-visual-panel"><div className="chart-companion-heading"><span>Visual overview</span><small>Trajectory across the same years shown in the table.</small></div><ExhibitChart exhibit={exhibit}/></div>;
    }
    if(exhibit.id==='s-ex2'&&exhibit.series&&exhibit.labels){
      const vegetation=exhibit.series.find(series=>series.name==='Vegetation cover');
      const tourism=exhibit.series.find(series=>series.name==='Tourism revenue index ($000)');
      return <div className="investigation-visual-panel"><div className="chart-companion-heading"><span>Visual overview</span><small>Wolf-reintroduction projections across the same years shown in the table.</small></div><div className="small-multiple-grid two-up">
        {vegetation&&<MiniTrend title={vegetation.name} values={vegetation.values} labels={exhibit.labels} unit="%"/>}
        {tourism&&<MiniTrend title={tourism.name} values={tourism.values} labels={exhibit.labels} unit="$000"/>}
      </div></div>;
    }
    if(exhibit.id==='c-ex1'&&exhibit.series&&exhibit.labels){
      return <div className="investigation-visual-panel"><div className="chart-companion-heading"><span>Water-quality trajectories</span><small>Each indicator uses its own scale so smaller phosphorus values remain readable.</small></div><div className="small-multiple-grid three-up">{exhibit.series.map(series=><MiniTrend key={series.name} title={series.name} values={series.values} labels={exhibit.labels!} unit="mg/L"/>)}</div></div>;
    }
    if(exhibit.id==='c-ex2'){
      const projection=scenario.exhibits.find(item=>item.id==='c-ex1');
      const rows=(exhibit.rows??[]).map(row=>({indicator:String(row[0]),target:String(row[1])}));
      return <div className="investigation-visual-panel"><div className="chart-companion-heading"><span>Programme thresholds</span><small>Compare each criterion with the projected trajectory; the exhibit does not pre-identify the first year it is achieved.</small></div><div className="small-multiple-grid three-up">{rows.map(row=>{const series=projection?.series?.find(item=>item.name===row.indicator);return series&&projection?.labels?<ThresholdTrend key={row.indicator} title={row.indicator} values={series.values} labels={projection.labels} thresholdLabel={row.target}/>:null})}</div></div>;
    }
    if(exhibit.id==='n-ex2'){
      const affected=Number(scenario.facts.find(item=>item.id==='burned')?.value??0);
      const active=Number(scenario.facts.find(item=>item.id==='active')?.value??0);
      return <div className="investigation-visual-panel"><div className="chart-companion-heading"><span>Programme scale</span><small>Compare the scale of wildfire impact with the area proposed for active restoration.</small></div><RawAreaComparison affected={affected} active={active}/></div>;
    }
    return exhibit.series&&exhibit.labels?<div className="investigation-visual-panel"><ExhibitChart exhibit={exhibit}/></div>:null;
  };

  const InvestigationExhibitTable=({exhibit,source}:{exhibit:Exhibit;source:'exhibit1'|'exhibit2'})=>{
    const renderCell=(fact:Fact|undefined,display:string|number,key:string)=>{
      if(!fact)return <span>{display}</span>;
      const collected=attempt.journal.some(j=>j.factId===fact.id);
      return <button key={key} type="button" className={`exhibit-evidence-cell${collected?' collected':''}`} draggable onDragStart={e=>startFactDrag(e,fact)} onDragEnd={()=>setDragFactId(null)} onClick={()=>addEvidence(fact)} title="Drag or click to add to Research Journal"><span>{display}</span><small>{collected?'Collected':'Drag or click'}</small></button>;
    };
    return <div className="investigation-exhibit" onDragOver={e=>{if(dragJournalId)e.preventDefault()}} onDrop={e=>{if(!dragJournalId)return;e.preventDefault();const id=e.dataTransfer.getData('application/x-solve-journal-id')||dragJournalId;if(id)returnJournalItem(id)}}>
      <div className="exhibit-heading"><h3>{exhibit.title}</h3></div>
      <p className="muted exhibit-instruction">Use the chart to scan the pattern, then compare the table and drag or click any data point you want to retain in the Research Journal.</p>
      <InvestigationVisual exhibit={exhibit}/>
      {exhibit.series&&exhibit.labels&&exhibit.id!=='s-ex2'&&<div className="table-wrap evidence-table-wrap"><table className="evidence-table"><thead><tr><th>Period</th>{exhibit.series.map(series=><th key={series.name}>{series.name}</th>)}</tr></thead><tbody>{exhibit.labels.map((label,i)=><tr key={label}><th scope="row">{label}</th>{exhibit.series!.map(series=>{const value=series.values[i];const fact=resolveExhibitFact(exhibit,source,scenario.facts,scenario.exhibitEvidenceBindings,{seriesName:series.name,label,value});return <td key={series.name}>{renderCell(fact,value,`${series.name}-${i}`)}</td>})}</tr>)}</tbody></table></div>}
      {exhibit.id==='s-ex2'&&exhibit.series&&exhibit.labels&&<div className="table-wrap evidence-table-wrap"><table className="evidence-table salvanova-ex2-table"><thead><tr><th>Period</th><th>Vegetation cover</th><th>Tourism revenue index ($000)</th></tr></thead><tbody>{exhibit.labels.map((label,i)=><tr key={label}><th scope="row">{label}</th>{exhibit.series!.map(series=>{const value=series.values[i];const fact=resolveExhibitFact(exhibit,source,scenario.facts,scenario.exhibitEvidenceBindings,{seriesName:series.name,label,value});const display=series.name==='Vegetation cover'?`${value}%`:value;return <td key={series.name}>{renderCell(fact,display,`${series.name}-${i}`)}</td>})}</tr>)}</tbody></table></div>}
      {exhibit.rows&&exhibit.columns&&<div className="table-wrap evidence-table-wrap"><table className="evidence-table"><thead><tr>{exhibit.columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{exhibit.rows.map((row,ri)=><tr key={ri}>{row.map((value,ci)=>{if(ci===0)return <th scope="row" key={ci}>{value}</th>;const fact=resolveExhibitFact(exhibit,source,scenario.facts,scenario.exhibitEvidenceBindings,{rowLabel:String(row[0]),column:exhibit.columns?.[ci]??`Value ${ci}`,rowIndex:ri,columnIndex:ci,value});return <td key={ci}>{renderCell(fact,value,`${ri}-${ci}`)}</td>})}</tr>)}</tbody></table></div>}
      {exhibit.note&&<p className="muted exhibit-note">{exhibit.note}</p>}
      {dragJournalId&&<div className="return-drop-hint">Drop here to return collected evidence to the source.</div>}
    </div>;
  };


  const ChartPreview=()=> <GraphSelectionPreview scenario={scenario} answers={attempt.graphAnswers} chartType={attempt.visualChartType}/>;

  const activeStage:RedRockStage=stage;
  const showJournal=activeStage==='investigation'||activeStage==='analysis'||activeStage==='written'||activeStage==='graph';
  const showCalculator=activeStage==='analysis'||activeStage==='visual';
  const utilityMode=activeStage==='analysis'?'analysis':activeStage==='visual'?'calculator':'journal';
  const calculatorProps={history:attempt.calculationHistory??[],onCommit:appendCalculationHistory};

  return <main className="page redrock-page"><div className={`workspace redrock-workspace utility-${utilityMode}`}>
    <section className="work-main">
      {timerEnabled&&<div className="redrock-timer-chip">{formatTime(timer.remaining)}</div>}
      {activeStage==='investigation'&&<>
        {investigationTab==='objective'&&<section className="panel investigation-section"><div className="eyebrow">Workstream 01 · Fairhaven Environmental Trust</div><h1>{scenario.title}</h1><ClientVoice name="Dr. Elena Cross" role="Director of Land & Ecosystem Recovery" className="client-brief-voice"><p><strong>Welcome, and thanks for joining this workstream.</strong></p><p>{scenario.clientBrief}</p><p>{scenario.assignment}</p><p>As you investigate, use the Research Journal to retain the evidence that materially supports your thinking. You will also have the study exhibits and, where it is available, the calculator. Focus on what you would want in front of you if I asked you to defend your recommendation.</p><p>In a full simulation, you will have <strong>35 minutes</strong> to complete the workstream.</p></ClientVoice><div className="btn-row"><button className="primary" onClick={()=>setView('study')}>Review the Brief →</button></div></section>}
        {investigationTab==='study'&&<section className="panel investigation-section"><div className="eyebrow">Investigation · Client Situation Brief</div><h2>Study Information</h2><StudyInformation/><div className="btn-row"><button className="ghost" onClick={()=>setView('objective')}>← Objective</button><button className="primary" onClick={()=>setView('exhibit1')}>Exhibit 1 →</button></div></section>}
        {investigationTab==='exhibit1'&&<section className="panel investigation-section"><div className="eyebrow">Investigation · Exhibit 1</div><InvestigationExhibitTable exhibit={scenario.exhibits[0]} source="exhibit1"/><div className="btn-row"><button className="ghost" onClick={()=>setView('study')}>← Study Information</button><button className="primary" onClick={()=>setView('exhibit2')}>Exhibit 2 →</button></div></section>}
        {investigationTab==='exhibit2'&&<section className="panel investigation-section"><div className="eyebrow">Investigation · Exhibit 2</div><InvestigationExhibitTable exhibit={scenario.exhibits[1]} source="exhibit2"/><div className="btn-row"><button className="ghost" onClick={()=>setView('exhibit1')}>← Exhibit 1</button><button className="primary" onClick={()=>setStagePersist('analysis')}>Continue to Analysis</button></div></section>}
      </>}

      {activeStage==='analysis'&&<section className="panel analysis-page" id="analysis-top"><div className="eyebrow">Analysis</div><h1>Questions</h1><p className="muted">Use the Research Journal and calculator to work through all four sections. Answers you enter are retained in the Research Journal for later use.</p>{!isSimulation&&<ClientVoice name="Dr. Elena Cross" role="Director of Land & Ecosystem Recovery" compact><p>These are some important questions I need you to answer.</p></ClientVoice>}{scenario.analysisSections.map((section,i)=><section className="analysis-section" id={section.id} key={section.id}><div className="question-number">Question {i+1}</div>{section.directions&&<p>{section.directions}</p>}{section.fields.map((q,j)=><div className="analysis-field" key={q.id}><label><span>{String.fromCharCode(97+j)}. {q.prompt}</span>{renderAnswerField(q,'analysisAnswers')}</label>{!isSimulation&&q.strategyPrompt&&<details><summary>Working prompt</summary><p>{q.strategyPrompt}</p></details>}</div>)}</section>)}<div className="completion-bar"><button className="ghost" onClick={()=>setView('exhibit2')}>← Back to Investigation</button><button className="primary" onClick={()=>setConfirm('analysis')}>Complete Analysis</button></div></section>}

      {activeStage==='written'&&<section className="panel report-written"><div className="eyebrow">Report · Written Report</div><h1>Written Report</h1><p className="muted">Drag values from the Research Journal into the fields or enter them directly.</p>{!isSimulation&&<ClientVoice name="Dr. Elena Cross" role="Director of Land & Ecosystem Recovery" compact><p>{scenario.writtenReportPrompt}</p></ClientVoice>}<div className="report-narrative">{scenario.report.template.map((seg,i)=>seg.type==='text'?<span key={i}>{seg.text}</span>:<span key={i}>{renderReportInput(scenario.report.fields.find(f=>f.id===seg.fieldId)!)}</span>)}</div><div className="completion-bar"><button className="primary" onClick={()=>setConfirm('written')}>Complete Written Report</button></div></section>}

      {activeStage==='graph'&&<section className="panel graph-selection"><div className="eyebrow">Report · Graph Selection</div><h1>Graph Selection</h1><p className="lead">{scenario.report.visual.prompt}</p><div className="chart-option-grid">{scenario.report.visual.chartOptions.map(type=><button key={type} className={`chart-option ${attempt.visualChartType===type?'selected':''}`} onClick={()=>persist({...attempt,visualChartType:type})}><div className={`chart-icon ${type.toLowerCase().replaceAll(' ','-')}`}></div><strong>{type}</strong></button>)}</div>{attempt.visualChartType&&<><h3>Enter chart data</h3><div className="graph-data-grid">{scenario.report.visual.dataFields.map(f=><label key={f.id}><span>{f.label}</span>{renderReportInput(f,'graphAnswers')}</label>)}</div><ChartPreview/><div className="completion-bar"><button className="primary" onClick={()=>setConfirm('graph')}>Complete Graph Selection</button></div></>}</section>}

      {activeStage==='visual'&&<section className="panel visual-case-page"><div className="eyebrow">Report · Visual Report · Case {visualCaseIndex+1} of 6</div><h1>{scenario.visualCases[visualCaseIndex].title}</h1><p className="lead">{scenario.visualCases[visualCaseIndex].context}</p>{!isSimulation&&<ClientVoice name="Dr. Elena Cross" role="Director of Land & Ecosystem Recovery" compact><p>{scenario.visualCases[visualCaseIndex].clientPrompt}</p></ClientVoice>}{scenario.visualCases[visualCaseIndex].exhibit&&<ExhibitRenderer exhibit={scenario.visualCases[visualCaseIndex].exhibit!}/>}<div className="visual-case-question"><div className="eyebrow">Question</div><h2>{scenario.visualCases[visualCaseIndex].question.prompt}</h2>{renderAnswerField(scenario.visualCases[visualCaseIndex].question,'visualCaseAnswers')}</div><div className="completion-bar"><button className="ghost" disabled={visualCaseIndex===0} onClick={()=>{const next=Math.max(0,visualCaseIndex-1);setVisualCaseIndex(next);setView('visual',{case:next+1})}}>← Previous Case</button>{visualCaseIndex<5?<button className="primary" onClick={()=>{const next=visualCaseIndex+1;setVisualCaseIndex(next);setView('visual',{case:next+1})}}>Next Case →</button>:<button className="primary" onClick={()=>setConfirm('visual')}>Complete Visual Report</button>}</div></section>}
    </section>

    {activeStage==='analysis'?<>
  <aside className="redrock-calculator-rail" aria-label="Calculator workspace"><div className="redrock-calculator-slot"><OnscreenCalculator {...calculatorProps}/></div></aside>
  <aside className="redrock-right-rail redrock-utility-stack journal"><div className="redrock-journal-slot">{renderJournal()}</div></aside>
</>:(showJournal||showCalculator)&&<aside className={`redrock-right-rail redrock-utility-stack ${utilityMode}`}>
  {showJournal&&<div className="redrock-journal-slot">{renderJournal()}</div>}
  {showCalculator&&<div className="redrock-calculator-slot"><OnscreenCalculator {...calculatorProps}/></div>}
</aside>}
  </div>

  <ConfirmDialog open={confirm==='analysis'} title="Review Analysis?" message="Once you submit your Analysis answers, you will not be able to revisit Investigation or the Analysis questions. Your Research Journal will remain available in the Report stage." confirmLabel="Complete Analysis" onCancel={()=>setConfirm(null)} onConfirm={completeAnalysis}/>
  <ConfirmDialog open={confirm==='written'} title="Complete Written Report?" message="Review the report fields before continuing. Once completed, the Written Report will be locked and Graph Selection will open." confirmLabel="Complete Written Report" onCancel={()=>setConfirm(null)} onConfirm={completeWritten}/>
  <ConfirmDialog open={confirm==='graph'} title="Complete Graph Selection?" message="Review the selected chart and entered data. Continuing locks Graph Selection and opens the Visual Report cases." confirmLabel="Continue to Visual Report" onCancel={()=>setConfirm(null)} onConfirm={completeGraph}/>
  <ConfirmDialog open={confirm==='visual'} title="Complete Red Rock Study?" message="This submits all six Visual Report cases and completes Task 1. You will be able to review Task 1 results before proceeding to Task 2." confirmLabel="Complete Task 1" onCancel={()=>setConfirm(null)} onConfirm={completeVisual}/>
  </main>
}
