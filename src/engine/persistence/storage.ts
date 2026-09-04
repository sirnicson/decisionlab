import type { JournalItem, RedRockAttempt, SimulationSession } from '../../types';

const ACTIVE_KEY='solve-it-readiness-v1-2-2-active';
const HISTORY_KEY='solve-it-readiness-v1-2-2-history';

export const SALVANOVA_MODEL_REVISION=2;

const numeric=(value:string|undefined)=>Number((value??'').replace(/[^0-9.\-]/g,''));
const sameNumber=(value:string|undefined,expected:number,tolerance=.0001)=>Number.isFinite(numeric(value))&&Math.abs(numeric(value)-expected)<=tolerance;

const refreshSalvanovaJournalItem=(item:JournalItem):JournalItem=>{
  if(item.factId==='ex1-y5-wolves')return {...item,value:'347,373 hares'};
  if(item.factId==='s-ex2-tourism-revenue-index-000-year-2')return {...item,value:'$45,000'};
  if(item.factId==='s-ex2-tourism-revenue-index-000-year-3')return {...item,value:'$70,000'};
  return item;
};

const migrateSalvanovaAttempt=(attempt:RedRockAttempt):RedRockAttempt=>{
  if(attempt.scenarioId!=='salvanova')return attempt;

  const analysisAnswers={...attempt.analysisAnswers};
  const reportAnswers={...attempt.reportAnswers};

  // Refresh only values that exactly match the former model benchmarks. Other learner-entered values are preserved.
  if(sameNumber(analysisAnswers['s-a2'],386890,2))analysisAnswers['s-a2']='347373';
  if(sameNumber(analysisAnswers['s-a3'],22.46,.01))analysisAnswers['s-a3']='13.64';
  if(sameNumber(reportAnswers['s-r6'],386890,2))reportAnswers['s-r6']='347373';

  return {
    ...attempt,
    analysisAnswers,
    reportAnswers,
    journal:attempt.journal.map(refreshSalvanovaJournalItem),
  };
};

export function migrateSessionForCurrentModel(session:SimulationSession):SimulationSession{
  const isSalvanova=session.selectedRedRockId==='salvanova'||session.redRockAttempt?.scenarioId==='salvanova';
  if(!isSalvanova||session.salvanovaModelRevision===SALVANOVA_MODEL_REVISION)return session;
  return {
    ...session,
    salvanovaModelRevision:SALVANOVA_MODEL_REVISION,
    redRockAttempt:session.redRockAttempt?migrateSalvanovaAttempt(session.redRockAttempt):session.redRockAttempt,
  };
}

export function loadActiveSession():SimulationSession|null{
  try{
    const parsed=JSON.parse(localStorage.getItem(ACTIVE_KEY) ?? 'null') as SimulationSession|null;
    return parsed?migrateSessionForCurrentModel(parsed):null;
  }catch{return null;}
}
export function saveActiveSession(session:SimulationSession|null){
  if(!session){localStorage.removeItem(ACTIVE_KEY);return;}
  localStorage.setItem(ACTIVE_KEY,JSON.stringify(session));
}
export function loadHistory():SimulationSession[]{
  try{return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');}catch{return [];}
}
export function appendHistory(session:SimulationSession){
  const history=loadHistory();
  localStorage.setItem(HISTORY_KEY,JSON.stringify([session,...history].slice(0,30)));
}
export function clearAllProgress(){
  localStorage.removeItem(ACTIVE_KEY);
  localStorage.removeItem(HISTORY_KEY);
}
