import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redRockScenarios } from '../../data/redrock/scenarios';
import { seaWolfScenarios } from '../../data/seawolf/scenarios';
import { useSession } from '../../app/SessionContext';
import type { Mode } from '../../types';
import learningModeIcon from '../../assets/icons/learning-mode-icon.png';
import simulationModeIcon from '../../assets/icons/simulation-mode-icon.png';

type ModeCardProps={
  mode:Mode;
  active:boolean;
  title:string;
  description:string;
  iconSrc:string;
  onSelect:(mode:Mode)=>void;
};

function ModeCard({mode,active,title,description,iconSrc,onSelect}:ModeCardProps){
  return (
    <button
      type="button"
      className={`mode-card${active?' active':''}`}
      data-mode={mode}
      onClick={()=>onSelect(mode)}
      aria-pressed={active}
    >
      <strong className="mode-card-title">{title}</strong>
      <span className="mode-card-icon image-icon" aria-hidden="true">
        <img src={iconSrc} alt="" />
      </span>
      <small className="mode-card-description">{description}</small>
    </button>
  );
}

export default function HomePage(){
  const navigate=useNavigate();
  const {session,startSession,resetSession}=useSession();
  const [mode,setMode]=useState<Mode>('learning');
  const [red,setRed]=useState('');
  const [sea,setSea]=useState('');
  const [timer,setTimer]=useState(false);
  const simulationReady=mode==='simulation'&&!!red&&!!sea;
  const learningReady=mode==='learning'&&Boolean(red||sea);
  const begin=()=>{
    startSession(mode,red||undefined,sea||undefined,mode==='learning'&&timer);
    if(mode==='simulation'||red)navigate('/redrock');
    else navigate('/seawolf');
  };
  return <main className="page">
    <section className="engagement-hero hero-panel engagement-shell">
      <div className="engagement-heading-block">
        <div className="eyebrow">Fairhaven Environmental Trust · Environmental Recovery Programme</div>
        <h1>Your <em>Engagement</em></h1>
        <p className="lead">The Fairhaven Environmental Trust has asked your team to support an environmental recovery programme across two connected workstreams. Work with the evidence available, make sound decisions under constraints, and give the client a clear basis for action.</p>
      </div>

      <div className="engagement-panel-grid">
        <section className="engagement-inner-panel workstream-stack" aria-label="Programme workstreams">
          <article className="stacked-workstream">
            <span>WORKSTREAM 01</span>
            <h2>Red Rock Studies</h2>
            <div className="contact-label">Contact Person:</div>
            <strong>Dr. Elena Cross</strong>
            <small>Director of Land &amp; Ecosystem Recovery</small>
            <p>She will need you to investigate environmental change, analyse the evidence and prepare a written and visual report.</p>
            <div className="workstream-path">Investigate → Analyse → Report</div>
          </article>
          <article className="stacked-workstream">
            <span>WORKSTREAM 02</span>
            <h2>Sea Wolf Studies</h2>
            <div className="contact-label">Contact Person:</div>
            <strong>Dr. Paula Reyes</strong>
            <small>Lead Marine Biologist</small>
            <p>She will need you to assess site needs, categorise microbes, select an effective pool, and build effective treatment combinations across three connected sites.</p>
            <div className="workstream-path">Characteristics → Categorisation → Selection → Treatment</div>
          </article>
        </section>

        <section className="engagement-inner-panel setup-panel" aria-label="Assessment setup">
          <div className="setup-copy integrated-setup-copy">
            <div className="eyebrow">Choose how you work</div>
          </div>

          <div className="field">
            <div className="mode-card-grid" role="group" aria-label="Mode selection">
              <ModeCard
                mode="learning"
                active={mode==='learning'}
                title="Learning Mode"
                description="Work with client guidance and decision feedback."
                iconSrc={learningModeIcon}
                onSelect={setMode}
              />
              <ModeCard
                mode="simulation"
                active={mode==='simulation'}
                title="Simulation Mode"
                description="Work independently under test conditions."
                iconSrc={simulationModeIcon}
                onSelect={setMode}
              />
            </div>
          </div>

          <div className="field"><label htmlFor="red-select">Task 1: Red Rock Study</label><select id="red-select" value={red} onChange={e=>setRed(e.target.value)}><option value="">None</option>{redRockScenarios.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select></div>
          <div className="field"><label htmlFor="sea-select">Task 2: Sea Wolf Study</label><select id="sea-select" value={sea} onChange={e=>setSea(e.target.value)}><option value="">None</option>{seaWolfScenarios.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select></div>
          {mode==='learning'&&<label className="field"><span>Learning timer</span><select value={timer?'on':'off'} onChange={e=>setTimer(e.target.value==='on')}><option value="off">Off</option><option value="on">On</option></select></label>}
          {mode==='simulation'&&<div className="notice">Select one study from each workstream. Total simulation time: <strong>65 minutes</strong> — Red Rock 35 + Sea Wolf 30, excluding instructions.</div>}
          {mode==='learning'&&red&&sea&&<div className="notice">Learning Mode opens one workstream at a time. Red Rock will open first.</div>}
          <button className="primary" style={{width:'100%'}} disabled={!(simulationReady||learningReady)} onClick={begin}>Begin engagement</button>
          {session&&<button className="ghost" style={{width:'100%',marginTop:'.6rem'}} onClick={()=>{resetSession();setRed('');setSea('');setTimer(false)}}>Clear active session</button>}
          {session&&<button className="secondary" style={{width:'100%',marginTop:'.6rem'}} onClick={()=>navigate(session.seaWolfAttempt?.completed?'/seawolf':session.currentTask==='seawolf'?'/seawolf':session.redRockAttempt?.completed?'/task1-result':'/redrock')}>Resume saved engagement</button>}
          <p className="setup-footnote">For the best full-simulation experience, use a desktop or larger display.</p>
        </section>
      </div>
    </section>
  </main>;
}
