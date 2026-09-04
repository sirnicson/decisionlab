import { useNavigate } from 'react-router-dom';
import type { SeaWolfAttempt, SeaWolfScenario } from '../../types';
import { scoreSeaWolf, seaWolfPrimaryConcern } from '../../engine/scoring/results';
import { task2ClientDebrief } from '../../engine/scoring/clientDebrief';
import ClientVoice from '../../components/ClientVoice';
import SeaWolfPerformanceSnapshot from '../../components/SeaWolfPerformanceSnapshot';
import { SeaWolfDetailedReview } from '../../components/IntegratedResultReview';

export default function Task2ResultPage({scenario,attempt}:{scenario:SeaWolfScenario;attempt:SeaWolfAttempt}){
  const nav=useNavigate();
  const score=scoreSeaWolf(scenario,attempt);
  const concern=seaWolfPrimaryConcern(score);
  const debrief=task2ClientDebrief(score);

  return <main className="page task2-result-page">
    <section className="results-hero task2-results-hero">
      <div>
        <div className="eyebrow">Workstream 02 · Dr. Paula Reyes</div>
        <h1>{scenario.title}</h1>
        <p>Sea Wolf workstream complete. Review feedback below.</p>
      </div>
      <div className="score-orb" aria-label={`Task 2 score ${score.total} out of 100`}><strong>{score.total}</strong></div>
    </section>

    <section className="panel client-closeout-panel">
      <div className="eyebrow">Client debrief · Workstream 02</div>
      <h2>Review with Dr. Paula Reyes</h2>
      <ClientVoice name="Dr. Paula Reyes" role="Lead Marine Biologist">{debrief.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</ClientVoice>
    </section>

    <section className="panel primary-concern-panel task2-primary-concern">
      <div className="primary-concern-layout">
        <div>
          <div className="eyebrow">Primary Concern</div>
          <h2>{concern.title}</h2>
          <p className="muted">{concern.detail}</p>
        </div>
        <SeaWolfPerformanceSnapshot score={score}/>
      </div>
    </section>

    <SeaWolfDetailedReview scenario={scenario} attempt={attempt}/>

    <section className="panel task-result-actions">
      <div className="btn-row"><button className="primary" onClick={()=>nav('/')}>Return Home</button></div>
    </section>
  </main>;
}
