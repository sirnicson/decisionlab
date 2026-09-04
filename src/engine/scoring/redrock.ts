import type { Question, RedRockAttempt, RedRockScenario, Task1Score } from '../../types';

export function answerIsCorrect(q:Question,raw?:string){
  if(raw==null||raw.trim()==='')return false;
  if(q.responseType==='number'){
    const n=Number(raw.replace(/,/g,''));if(!Number.isFinite(n)||typeof q.answer!=='number')return false;
    return Math.abs(n-q.answer)<=(q.tolerance??.001);
  }
  return String(raw).trim().toLowerCase()===String(q.answer).trim().toLowerCase();
}
const pct=(correct:number,total:number)=>total?Math.round(correct/total*100):0;
export const fieldAnswerIsCorrect=(answer:string|undefined,expected:string|number,tol=.001)=>{
  if(!answer)return false;if(typeof expected==='number')return Math.abs(Number(answer.replace(/,/g,''))-expected)<=tol;
  return answer.trim().toLowerCase()===String(expected).toLowerCase();
};

export const RED_ROCK_WEIGHTS={
  analysis:50,
  writtenReport:20,
  visualReport:10,
  visualCases:20
} as const;

export type RedRockAssessmentKey=keyof typeof RED_ROCK_WEIGHTS;

type PerformanceBand='client-ready'|'directionally-sound'|'material-gap'|'significant-concern';
const bandFor=(score:number):PerformanceBand=>score>=85?'client-ready':score>=70?'directionally-sound':score>=51?'material-gap':'significant-concern';

const feedback:Record<RedRockAssessmentKey,Record<PerformanceBand,string>>={
  analysis:{
    'client-ready':'The analytical logic is reliable enough to support the recommendation and withstand challenge.',
    'directionally-sound':'The core analysis is directionally sound, but some calculations or interpretations need tightening before sign-off.',
    'material-gap':'Several analytical gaps weaken the basis of the recommendation and should be corrected before the conclusion is relied upon.',
    'significant-concern':'The analytical foundation is not yet reliable enough to support a client decision; the core calculations and interpretations need to be rebuilt.'
  },
  writtenReport:{
    'client-ready':'The written report carries the evidence into a clear, consistent and decision-ready narrative.',
    'directionally-sound':'The report is broadly coherent, but some evidence-to-conclusion links need tightening so the recommendation is fully defensible.',
    'material-gap':'The report communicates the issue, but too many evidence points or interpretations remain incomplete or inaccurate to support the recommendation confidently.',
    'significant-concern':'The written report does not yet provide a reliable basis for the decision because the evidence and conclusion are not consistently aligned.'
  },
  visualReport:{
    'client-ready':'The graph choice and plotted values communicate the decision-relevant comparison clearly and accurately.',
    'directionally-sound':'The graph is usable, but part of the chart choice or plotted data needs refinement before it is presentation-ready.',
    'material-gap':'The graph only partially supports the intended comparison and risks obscuring the message the client needs to see.',
    'significant-concern':'The graph does not yet communicate the decision-relevant comparison reliably enough for a client discussion.'
  },
  visualCases:{
    'client-ready':'The case-by-case judgments are consistently accurate and show strong application of the evidence to decisions.',
    'directionally-sound':'Most case judgments are sound, with a small number of decision or calculation gaps to correct.',
    'material-gap':'Several case judgments need correction before the overall recommendation can be treated as robust.',
    'significant-concern':'The visual-case reasoning is too inconsistent to support sign-off; the underlying calculations and decision rules need another pass.'
  }
};

export const redRockComponentFeedback=(key:RedRockAssessmentKey,score:number)=>feedback[key][bandFor(score)];

const labels:Record<RedRockAssessmentKey,string>={
  analysis:'analysis',
  writtenReport:'written report',
  visualReport:'graph selection',
  visualCases:'visual report cases'
};

const clientBandClause:Record<RedRockAssessmentKey,Record<PerformanceBand,string>>={
  analysis:{
    'client-ready':'the underlying calculations and interpretations are reliable enough to defend under challenge',
    'directionally-sound':'the underlying calculations and interpretations are broadly sound but still need some tightening',
    'material-gap':'several analytical gaps are weakening the basis of the recommendation',
    'significant-concern':'the analytical foundation is not yet reliable enough to support a decision'
  },
  writtenReport:{
    'client-ready':'the written report carries the evidence into a clear and defensible recommendation',
    'directionally-sound':'the report is coherent but some evidence-to-conclusion links still need tightening',
    'material-gap':'the report does not yet translate the evidence consistently enough into a defensible recommendation',
    'significant-concern':'the written report is not yet a reliable basis for a client decision'
  },
  visualReport:{
    'client-ready':'the graph communicates the decision-relevant comparison clearly',
    'directionally-sound':'the graph is usable but still needs some refinement',
    'material-gap':'the graph only partly communicates the comparison the client needs to see',
    'significant-concern':'the graph is not yet reliable enough for a decision discussion'
  },
  visualCases:{
    'client-ready':'the visual-case judgments apply the evidence consistently to the decisions',
    'directionally-sound':'most visual-case judgments are sound with only limited corrections needed',
    'material-gap':'several visual-case judgments still need correction',
    'significant-concern':'the visual-case judgments are too inconsistent to support sign-off'
  }
};

const sentenceCase=(value:string)=>value.charAt(0).toUpperCase()+value.slice(1);
const joinClientClauses=(items:string[])=>{
  if(items.length===0)return '';
  if(items.length===1)return items[0];
  if(items.length===2)return `${items[0]}, while ${items[1]}`;
  return `${items.slice(0,-1).join('; ')}; and ${items.at(-1)}`;
};

/**
 * Client-facing synthesis of all four Red Rock assessment dimensions.
 * The underlying weights still determine the Task 1 score, but the learner sees
 * the benchmark as one integrated client narrative rather than a detached scorecard.
 */
export function redRockPrimaryConcern(score:Task1Score){
  const keys=Object.keys(RED_ROCK_WEIGHTS) as RedRockAssessmentKey[];
  const metrics=keys.map(key=>({
    key,
    value:score[key],
    weight:RED_ROCK_WEIGHTS[key],
    band:bandFor(score[key]),
    weightedGap:(100-score[key])*RED_ROCK_WEIGHTS[key]/100
  }));
  const ranked=[...metrics].sort((a,b)=>b.weightedGap-a.weightedGap);
  const strong=[...metrics].filter(m=>m.value>=85).sort((a,b)=>b.value-a.value);
  const weak=[...metrics].filter(m=>m.value<70).sort((a,b)=>b.weightedGap-a.weightedGap);
  const developing=[...metrics].filter(m=>m.value>=70&&m.value<85).sort((a,b)=>b.weightedGap-a.weightedGap);

  if(metrics.every(m=>m.value>=85)){
    return {
      title:'No material concern is preventing sign-off.',
      detail:'Looking across the full submission, the analysis, written report, graph and case judgments are aligned closely enough for me to take the recommendation forward. I would still expect the key assumptions to be defended in a decision meeting, but there is no material break between the technical work and the recommendation.'
    };
  }

  let title:string;
  if(score.analysis<70&&score.writtenReport<70){
    title='The analysis is not yet translating into a defensible client report.';
  }else if(score.analysis<70&&score.writtenReport>=70){
    title='The report is running ahead of the analytical evidence supporting it.';
  }else if(score.analysis>=70&&score.writtenReport<70){
    title='The analysis is stronger than the report currently communicates.';
  }else if((score.visualReport<70||score.visualCases<70)&&score.analysis>=70&&score.writtenReport>=70){
    title='The technical case is stronger than the way it is being communicated.';
  }else if(weak.length>=3){
    title='The recommendation is not yet consistent across analysis and communication.';
  }else{
    const primary=ranked[0];
    const fallback:Record<RedRockAssessmentKey,string>={
      analysis:'The analytical foundation remains the main barrier to sign-off.',
      writtenReport:'The written recommendation is the main barrier to sign-off.',
      visualReport:'The graph is the main communication issue before sign-off.',
      visualCases:'The case-by-case judgments remain the main barrier to sign-off.'
    };
    title=fallback[primary.key];
  }

  const strongest=strong[0]??[...metrics].sort((a,b)=>b.value-a.value)[0];
  const strengths=strong.length
    ? `The strongest part of the submission is ${labels[strongest.key]}, where ${clientBandClause[strongest.key][strongest.band]}.`
    : `There is not yet a fully client-ready component, although ${labels[strongest.key]} is currently the strongest part of the submission.`;

  const concernItems=(weak.length?weak:developing).slice(0,3).map(m=>clientBandClause[m.key][m.band]);
  const concernSentence=concernItems.length
    ? `My concern is that ${joinClientClauses(concernItems)}.`
    : '';

  const remaining=metrics.filter(m=>!weak.slice(0,3).some(w=>w.key===m.key)&&m.key!==strongest.key&&m.value<85);
  const remainingSentence=remaining.length
    ? `I would also want ${remaining.map(m=>labels[m.key]).join(', ')} checked before sign-off so the full submission tells one consistent story.`
    : '';

  let action='Before I take the recommendation forward, I would correct the highest-impact gaps first and then recheck the report and visual outputs against the verified analysis.';
  if(score.analysis<70)action='Before I take the recommendation forward, I would correct the analytical foundation first, then rebuild or recheck the report and visual outputs against those verified results.';
  else if(score.writtenReport<70)action='Before I take the recommendation forward, I would rewrite the report around the verified analysis so the evidence, interpretation and recommendation are fully aligned.';
  else if(score.visualReport<70||score.visualCases<70)action='Before I take the recommendation forward, I would tighten the visual communication and case judgments so the technical work can be understood and defended in a decision meeting.';

  return {title,detail:[sentenceCase(strengths),concernSentence,remainingSentence,action].filter(Boolean).join(' ')};
}

export function scoreRedRock(scenario:RedRockScenario,attempt:RedRockAttempt):Task1Score{
  const analysis=pct(scenario.analysisQuestions.filter(q=>answerIsCorrect(q,attempt.analysisAnswers[q.id])).length,scenario.analysisQuestions.length);
  const writtenReport=pct(scenario.report.fields.filter(f=>fieldAnswerIsCorrect(attempt.reportAnswers[f.id],f.answer,f.tolerance)).length,scenario.report.fields.length);
  const chartTypeGood=scenario.report.visual.acceptedChartTypes.includes(attempt.visualChartType??'');
  const graphValues=scenario.report.visual.dataFields.filter(f=>fieldAnswerIsCorrect(attempt.graphAnswers?.[f.id],f.answer,f.tolerance)).length;
  // Graph Selection is intentionally all-or-nothing: the visual is only decision-ready
  // when both the chart form and every plotted value are correct.
  const visualReport=chartTypeGood&&graphValues===scenario.report.visual.dataFields.length?100:0;
  const visualCases=pct(scenario.visualCases.filter(c=>answerIsCorrect(c.question,attempt.visualCaseAnswers[c.question.id])).length,scenario.visualCases.length);
  const limit=35*60;const timeDiscipline=attempt.timeUsedSeconds<=limit?100:Math.max(0,Math.round(100-(attempt.timeUsedSeconds-limit)/limit*100));
  const total=Math.round(
    analysis*(RED_ROCK_WEIGHTS.analysis/100)+
    writtenReport*(RED_ROCK_WEIGHTS.writtenReport/100)+
    visualReport*(RED_ROCK_WEIGHTS.visualReport/100)+
    visualCases*(RED_ROCK_WEIGHTS.visualCases/100)
  );
  return {total,analysis,writtenReport,visualReport,visualCases,timeDiscipline};
}
