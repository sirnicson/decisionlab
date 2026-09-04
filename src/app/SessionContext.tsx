import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Mode, RedRockAttempt, SeaWolfAttempt, SimulationSession } from '../types';
import { appendHistory, loadActiveSession, SALVANOVA_MODEL_REVISION, saveActiveSession } from '../engine/persistence/storage';

const newId=()=>`session-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

type ContextValue={
  session:SimulationSession|null;
  startSession:(mode:Mode,redRockId?:string,seaWolfId?:string,learningTimerEnabled?:boolean)=>SimulationSession;
  updateSession:(patch:Partial<SimulationSession>)=>void;
  setRedRockAttempt:(attempt:RedRockAttempt)=>void;
  setSeaWolfAttempt:(attempt:SeaWolfAttempt)=>void;
  completeSession:()=>void;
  resetSession:()=>void;
};

const SessionContext=createContext<ContextValue|null>(null);

export function SessionProvider({children}:{children:ReactNode}){
  const [session,setSession]=useState<SimulationSession|null>(()=>loadActiveSession());
  useEffect(()=>saveActiveSession(session),[session]);
  const value=useMemo<ContextValue>(()=>({
    session,
    startSession:(mode,redRockId,seaWolfId,learningTimerEnabled=false)=>{
      const next:SimulationSession={id:newId(),mode,learningTimerEnabled,selectedRedRockId:redRockId,selectedSeaWolfId:seaWolfId,startedAt:Date.now(),currentTask:redRockId?'redrock':'seawolf',...(redRockId==='salvanova'?{salvanovaModelRevision:SALVANOVA_MODEL_REVISION}:{})};
      setSession(next);return next;
    },
    updateSession:(patch)=>setSession(prev=>prev?{...prev,...patch}:prev),
    setRedRockAttempt:(attempt)=>setSession(prev=>prev?{...prev,redRockAttempt:attempt}:prev),
    setSeaWolfAttempt:(attempt)=>setSession(prev=>prev?{...prev,seaWolfAttempt:attempt}:prev),
    completeSession:()=>setSession(prev=>{
      if(!prev)return prev;
      const done={...prev,completedAt:Date.now()};
      appendHistory(done);return done;
    }),
    resetSession:()=>setSession(null)
  }),[session]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(){
  const v=useContext(SessionContext);
  if(!v)throw new Error('useSession must be used within SessionProvider');
  return v;
}
