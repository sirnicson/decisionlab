import type { SimulationSession } from '../../types';

export function canAccessRedRock(session:SimulationSession|null|undefined){return Boolean(session?.startedAt&&session.selectedRedRockId)}
export function canAccessSeaWolf(session:SimulationSession|null|undefined){
  if(!session?.startedAt||!session.selectedSeaWolfId)return false;
  if(session.mode==='simulation'&&session.selectedRedRockId)return Boolean(session.redRockAttempt?.completed);
  return true;
}
export function canAccessTask1Result(session:SimulationSession|null|undefined){return Boolean(session?.selectedRedRockId&&session.redRockAttempt?.completed)}
export function isSessionReviewable(session:SimulationSession|null|undefined):boolean{
  if(!session?.completedAt)return false;
  if(session.mode==='simulation')return Boolean(session.selectedRedRockId&&session.selectedSeaWolfId&&session.redRockAttempt?.completed&&session.seaWolfAttempt?.completed);
  return Boolean(session.redRockAttempt?.completed||session.seaWolfAttempt?.completed);
}
export function activeSessionPath(session:SimulationSession|null|undefined):string{
  if(!session)return '/';
  if(session.redRockAttempt?.completed&&session.currentTask==='redrock')return '/task1-result';
  if(session.currentTask==='seawolf'&&canAccessSeaWolf(session))return '/seawolf';
  if(canAccessRedRock(session)&&!session.redRockAttempt?.completed)return '/redrock';
  if(canAccessSeaWolf(session)&&!session.seaWolfAttempt?.completed)return '/seawolf';
  return '/';
}
