import { Navigate, useNavigate } from 'react-router-dom';
import { useSession } from '../../app/SessionContext';
import { getRedRockScenario } from '../../data/redrock/scenarios';
import { redRockPrimaryConcern, scoreRedRock } from '../../engine/scoring/redrock';
import ClientVoice from '../../components/ClientVoice';
import { task1ClientDebrief } from '../../engine/scoring/clientDebrief';
import { RedRockDetailedReview } from '../../components/IntegratedResultReview';
import RedRockPerformanceSnapshot from '../../components/RedRockPerformanceSnapshot';

export default function Task1ResultPage(){
  const {session,updateSession}=useSession();const nav=useNavigate();
  if(!session?.selectedRedRockId||!session.redRockAttempt?.completed)return <Navigate to="/" replace/>;
  const scenario=getRedRockScenario(session.selectedRedRockId);const attempt=session.redRockAttempt;const score=scoreRedRock(scenario,attempt);const concern=redRockPrimaryConcern(score);
  const proceed=()=>{if(session.mode==='simulation'&&session.selectedSeaWolfId){updateSession({currentTask:'seawolf'});nav('/seawolf')}else nav('/')};
  return <main className="page task1-result-page">
    <section className="results-hero task1-results-hero"><div><div className="eyebrow">Workstream 01 · Dr. Elena Cross</div><h1>{scenario.title}</h1><h2>{score.total} / 100</h2><p>Red Rock workstream complete. Review feedback below.</p></div><div className="score-orb"><strong>{score.total}</strong></div></section>
    <section className="panel client-closeout-panel"><div className="eyebrow">Client debrief · Workstream 01</div><h2>Review with Dr. Elena Cross</h2><ClientVoice name="Dr. Elena Cross" role="Director of Land & Ecosystem Recovery"><p>{task1ClientDebrief(score)}</p></ClientVoice></section>
    <section className="panel primary-concern-panel task1-primary-concern"><div className="primary-concern-layout"><div><div className="eyebrow">Primary Concern</div><h2>{concern.title}</h2><p className="muted">{concern.detail}</p></div><RedRockPerformanceSnapshot score={score}/></div></section>
    <RedRockDetailedReview scenario={scenario} attempt={attempt}/>
    <section className="panel"><div className="btn-row"><button className="primary" onClick={proceed}>{session.mode==='simulation'&&session.selectedSeaWolfId?'Proceed to Task 2 — Sea Wolf':'Return Home'} →</button></div></section>
  </main>
}
