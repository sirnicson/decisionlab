import { useEffect, useMemo, useState } from 'react';

/**
 * Countdown backed by an absolute start timestamp so timed task state survives
 * component remounts and browser refreshes. The caller owns/persists startedAt.
 */
export function useCountdown(initialSeconds:number,enabled:boolean,startedAt?:number){
  const calculateRemaining=()=>{
    if(!enabled||!startedAt)return initialSeconds;
    const elapsed=Math.max(0,Math.floor((Date.now()-startedAt)/1000));
    return Math.max(0,initialSeconds-elapsed);
  };
  const [remaining,setRemaining]=useState(calculateRemaining);

  useEffect(()=>{
    if(!enabled||!startedAt){setRemaining(initialSeconds);return;}
    const tick=()=>setRemaining(calculateRemaining());
    tick();
    const id=window.setInterval(tick,250);
    return()=>window.clearInterval(id);
  },[enabled,initialSeconds,startedAt]);

  const elapsed=useMemo(()=>Math.max(0,initialSeconds-remaining),[initialSeconds,remaining]);
  return {remaining,elapsed};
}

export function formatTime(seconds:number){
  const s=Math.max(0,Math.floor(seconds));
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
