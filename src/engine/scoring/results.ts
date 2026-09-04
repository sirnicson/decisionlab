import type { Microbe, OverallResult, SeaWolfAttempt, SeaWolfScenario, Task2Score } from '../../types';
import { deriveInitialProspectPool, isAcceptedCharacteristicSelection, normalisedSitePerformance, treatmentEffectiveness } from './seawolf';

const avg=(a:number[])=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const pct=(correct:number,total:number)=>total?Math.round(correct/total*100):0;
const band=(score:number):OverallResult['band']=>score>=85?'Strong Practice Readiness':score>=75?'Competitive Practice Range':score>=60?'Developing Readiness':'Further Practice Recommended';

export const SEA_WOLF_WEIGHTS={
  siteProfiling:10,
  categorisation:30,
  prospectSelection:25,
  treatment:35
} as const;

export type SeaWolfAssessmentKey=keyof typeof SEA_WOLF_WEIGHTS;

export function scoreSeaWolf(scenario: SeaWolfScenario, attempt: SeaWolfAttempt): Task2Score {
  const siteResults=scenario.sites.map(site=>{
    const a=attempt.sites[site.id];
    const profiledPool=deriveInitialProspectPool(site,a?.selectedCharacteristics??[]);
    const selectedProspects=(a?.prospectDecisions??[]).map(decision=>
      site.prospectRounds.find(round=>round.id===decision.roundId)?.candidates.find(card=>card.id===decision.microbeId)
    ).filter(Boolean) as Microbe[];
    const finalPool=[...profiledPool,...selectedProspects];
    const chosen=finalPool.filter(m=>a?.treatmentIds.includes(m.id));
    const submitted=treatmentEffectiveness(site,chosen);
    return {siteId:site.id,submitted,maximumFeasible:site.maximumFeasibleEffectiveness,normalised:normalisedSitePerformance(submitted,site.maximumFeasibleEffectiveness)};
  });

  const treatment=Math.round(avg(siteResults.map(r=>r.normalised)));

  const profilingCorrect=scenario.sites.filter(site=>
    isAcceptedCharacteristicSelection(site,attempt.sites[site.id]?.selectedCharacteristics??[])
  ).length;
  const siteProfiling=pct(profilingCorrect,scenario.sites.length);

  const allRoutingDecisions=scenario.sites.flatMap(site=>[
    ...(attempt.sites[site.id]?.transferAllocations??[]),
    ...(attempt.sites[site.id]?.allocations??[])
  ]);
  const routingCorrect=allRoutingDecisions.filter(decision=>decision.judgement==='strong').length;
  const categorisation=pct(routingCorrect,allRoutingDecisions.length);

  const expectedProspectDecisions=scenario.sites.reduce((sum,site)=>sum+site.prospectRounds.length,0);
  const acceptedProspects=scenario.sites.flatMap(site=>attempt.sites[site.id]?.prospectDecisions??[])
    .filter(decision=>decision.judgement!=='weak').length;
  const prospectSelection=pct(acceptedProspects,expectedProspectDecisions);

  const total=Math.round(
    siteProfiling*(SEA_WOLF_WEIGHTS.siteProfiling/100)+
    categorisation*(SEA_WOLF_WEIGHTS.categorisation/100)+
    prospectSelection*(SEA_WOLF_WEIGHTS.prospectSelection/100)+
    treatment*(SEA_WOLF_WEIGHTS.treatment/100)
  );
  return {total,siteProfiling,categorisation,prospectSelection,treatment,siteResults};
}

const componentLabels:Record<SeaWolfAssessmentKey,string>={
  siteProfiling:'site profiling',
  categorisation:'categorisation and transfer',
  prospectSelection:'prospect selection',
  treatment:'treatment construction'
};

export function seaWolfPrimaryConcern(score:Task2Score){
  const metrics=(Object.keys(SEA_WOLF_WEIGHTS) as SeaWolfAssessmentKey[]).map(key=>({
    key,value:score[key],weight:SEA_WOLF_WEIGHTS[key],weightedGap:(100-score[key])*SEA_WOLF_WEIGHTS[key]/100
  }));
  const ranked=[...metrics].sort((a,b)=>b.weightedGap-a.weightedGap);
  const strong=metrics.filter(m=>m.value>=85).sort((a,b)=>b.value-a.value);

  if(metrics.every(m=>m.value>=85)){
    return {
      title:'No material concern is preventing programme sign-off.',
      detail:'The site profiles, routing decisions, prospect choices and final treatments form a consistent decision path across the three sites. The treatment outcomes are supported by the choices that produced them, including the constrained site where the strongest feasible result is below a nominal 100%.'
    };
  }

  let title:string;
  if(score.siteProfiling<70&&score.categorisation<70){
    title='The site requirements are not yet translating consistently into the routing strategy.';
  }else if(score.categorisation<70&&score.treatment>=70){
    title='The final treatments are stronger than the decision path used to reach them.';
  }else if(score.prospectSelection<70&&score.treatment<70){
    title='Prospect choices are reducing the treatment options available at the point of commitment.';
  }else if(score.siteProfiling>=70&&score.categorisation>=70&&score.prospectSelection<70){
    title='The early site logic is sound, but the prospect pool is not being strengthened consistently.';
  }else if(score.treatment<70){
    title='The final treatment combinations remain the main barrier to programme sign-off.';
  }else{
    const primary=ranked[0];
    const fallback:Record<SeaWolfAssessmentKey,string>={
      siteProfiling:'The initial site lens remains the main issue to resolve.',
      categorisation:'Routing and transfer decisions remain the main issue to resolve.',
      prospectSelection:'Prospect selection remains the main issue to resolve.',
      treatment:'Treatment construction remains the main issue to resolve.'
    };
    title=fallback[primary.key];
  }

  const best=strong[0]??[...metrics].sort((a,b)=>b.value-a.value)[0];
  const primary=ranked[0];
  const strength=best.value>=85
    ? `The strongest part of the workstream is ${componentLabels[best.key]}, which gives me confidence in that part of the programme.`
    : `${componentLabels[best.key][0].toUpperCase()+componentLabels[best.key].slice(1)} is currently the strongest part of the workstream, but it is not yet fully client-ready.`;
  const concern=`The largest decision-readiness gap sits in ${componentLabels[primary.key]}. Because the sites are connected, I would check how that stage affected the options available later rather than treating it as an isolated score.`;
  const action=score.siteProfiling<70
    ? 'I would start by rechecking the site requirements and profiling choices, then follow the consequences through routing, prospect selection and treatment.'
    : score.categorisation<70
      ? 'I would revisit the Current / Next / Return decisions first, because poor routing can remove useful options before the treatment pool is finalised.'
      : score.prospectSelection<70
        ? 'I would rebuild the prospect sequence from the existing pool and ask which candidate preserves the strongest downstream treatment options in each round.'
        : 'I would keep the earlier decision path and rebuild the final trios against the site ranges, desired trait and undesired-trait exclusion.';
  return {title,detail:`${strength} ${concern} ${action}`};
}

export function combineResults(task1: import('../../types').Task1Score|undefined, task2: Task2Score|undefined): OverallResult {
  const overall=task1&&task2?Math.round((task1.total+task2.total)/2):task1?.total ?? task2?.total ?? 0;
  const avgAvailable=(values:Array<number|undefined>)=>{const present=values.filter((v):v is number=>typeof v==='number');return present.length?Math.round(avg(present)):undefined};
  const candidates:Array<{dimension:string;value:number|undefined}>=[
    {dimension:'Problem Structuring',value:task1?.analysis ?? task2?.siteProfiling},
    {dimension:'Quantitative Setup',value:task1?.analysis ?? task2?.treatment},
    {dimension:'Calculation Accuracy',value:task1?.analysis ?? task2?.treatment},
    {dimension:'Constraint Recognition',value:avgAvailable([task1?.visualCases,task2?.categorisation])},
    {dimension:'Comparative Judgement',value:avgAvailable([task1?.visualCases,task2?.prospectSelection])},
    {dimension:'Portfolio Thinking',value:task2?avgAvailable([task2.prospectSelection,task2.treatment]):undefined},
    {dimension:'Sense-checking',value:avgAvailable([task1?.analysis,task2?.treatment])},
    {dimension:'Information Management',value:task2?.categorisation},
    {dimension:'Time Discipline',value:task1?.timeDiscipline}
  ];
  const dimensions=candidates.filter((d):d is {dimension:string;value:number}=>typeof d.value==='number');
  const label=(v:number):'Strong'|'Competitive'|'Developing'|'At Risk'=>v>=85?'Strong':v>=75?'Competitive':v>=60?'Developing':'At Risk';
  const reasoningProfile=dimensions.map(d=>({dimension:d.dimension,result:label(d.value)}));
  const weakest=[...dimensions].sort((a,b)=>a.value-b.value)[0];
  const primaryConstraint=weakest?`${weakest.dimension} was the strongest recurring constraint in this attempt.`:'Complete a task to generate a performance diagnostic.';
  const recommendation=weakest&&(weakest.dimension==='Portfolio Thinking' || weakest.dimension==='Constraint Recognition')
    ? 'Practise Azure Shelf and focus on downstream opportunity cost before committing scarce high-fit microbes.'
    : 'Repeat the weaker task in Learning Mode, then retest it inside a full timed simulation.';
  return {overall,band:band(overall),task1,task2,reasoningProfile,primaryConstraint,recommendation};
}
