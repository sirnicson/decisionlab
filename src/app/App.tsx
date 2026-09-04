import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import RedRockPage from '../features/redrock/RedRockPage';
import SeaWolfPage from '../features/seawolf/SeaWolfPage';
import Task1ResultPage from '../features/results/Task1ResultPage';
import { useSession } from './SessionContext';
import { activeSessionPath, canAccessRedRock, canAccessSeaWolf, canAccessTask1Result } from '../engine/session/access';
import type { SeaWolfStep } from '../types';
import { getSeaWolfScenario } from '../data/seawolf/scenarios';

type RedView='objective'|'study'|'exhibit1'|'exhibit2'|'analysis'|'written'|'graph'|'visual';
type RedMother='investigation'|'analysis'|'report';

const seaWolfStageItems:{step:SeaWolfStep;label:string}[]=[
  {step:'siteIntro',label:'Site Brief'},
  {step:'characteristics',label:'Characteristics'},
  {step:'categorisation',label:'Categorisation'},
  {step:'initialPool',label:'Initial Pool'},
  {step:'prospectPool',label:'Prospect Selection'},
  {step:'treatment',label:'Treatment'},
  {step:'siteResult',label:'Result'}
];

function Shell(){
  const {session,resetSession}=useSession();const location=useLocation();const navigate=useNavigate();
  const inTask=location.pathname.includes('/redrock')||(location.pathname.includes('/seawolf')&&!session?.seaWolfAttempt?.completed);
  const rrAccess=canAccessRedRock(session);const swAccess=canAccessSeaWolf(session);const task1Result=canAccessTask1Result(session);
  const navItem=(path:string,label:string,meta?:string,disabled=false)=> <button className={`sidebar-item ${location.pathname===path?'active':''} ${disabled?'locked':''}`} onClick={()=>!disabled&&navigate(path)} disabled={disabled} aria-disabled={disabled} title={disabled?'Select the task and press Begin to activate it':undefined}>{meta&&<span className="nav-index">{meta}</span>}<span>{label}</span>{disabled&&<span className="nav-lock" aria-hidden="true">🔒</span>}</button>;
  const reset=()=>{resetSession();navigate('/')};
  const topTitle=location.pathname==='/task1-result'?'Task 1 Result':location.pathname==='/seawolf'?(session?.seaWolfAttempt?.completed?'Task 2 Result':'Sea Wolf'):location.pathname==='/redrock'?'Red Rock':location.pathname==='/'?null:'DecisionLab';

  const rrAttempt=session?.redRockAttempt;
  const redRockNavPath=rrAttempt?.completed?'/task1-result':'/redrock';
  const rrStage=rrAttempt?.stage??'investigation';
  const query=new URLSearchParams(location.search);
  const fallbackView:RedView=rrStage==='analysis'?'analysis':rrStage==='written'?'written':rrStage==='graph'?'graph':rrStage==='visual'?'visual':'objective';
  const activeRedView=(query.get('view') as RedView|null)??fallbackView;
  const activeQuestion=Math.max(1,Math.min(4,Number(query.get('q')||1)));
  const activeCase=Math.max(1,Math.min(6,Number(query.get('case')||1)));
  const activeRedMother:RedMother=activeRedView==='analysis'?'analysis':(['written','graph','visual'] as RedView[]).includes(activeRedView)?'report':'investigation';
  const canInvestigation=Boolean(rrAccess&&!rrAttempt?.analysisLocked&&(rrStage==='investigation'||rrStage==='analysis'));
  const canAnalysis=Boolean(rrAccess&&!rrAttempt?.analysisLocked&&rrStage==='analysis');
  const canWritten=Boolean(rrAccess&&!rrAttempt?.writtenLocked&&rrStage==='written');
  const canGraph=Boolean(rrAccess&&rrAttempt?.writtenLocked&&!rrAttempt?.graphLocked&&rrStage==='graph');
  const canVisual=Boolean(rrAccess&&rrAttempt?.graphLocked&&!rrAttempt?.visualLocked&&rrStage==='visual');
  const openRed=(view:RedView,extra='')=>navigate(`/redrock?view=${view}${extra}`);
  const subButton=(label:string,view:RedView,disabled=false,extra='',active=false)=><button type="button" className={`sidebar-subitem ${active?'active':''} ${disabled?'locked':''}`} disabled={disabled} onClick={()=>!disabled&&openRed(view,extra)}>{label}</button>;

  const redRockSubnav=location.pathname==='/redrock'&&rrAccess?<div className="redrock-sidebar-subnav" aria-label="Red Rock navigation">
    <div className={`sidebar-subgroup ${activeRedMother==='investigation'?'active expanded':'collapsed'}`}><div className="sidebar-subgroup-title">Investigation</div>
      {activeRedMother==='investigation'&&<>
        {subButton('Objective','objective',!canInvestigation,'',activeRedView==='objective')}
        {subButton('Study Information','study',!canInvestigation,'',activeRedView==='study')}
        {subButton('Exhibit 1','exhibit1',!canInvestigation,'',activeRedView==='exhibit1')}
        {subButton('Exhibit 2','exhibit2',!canInvestigation,'',activeRedView==='exhibit2')}
      </>}
    </div>
    <div className={`sidebar-subgroup ${activeRedMother==='analysis'?'active expanded':'collapsed'}`}><div className="sidebar-subgroup-title">Analysis</div>
      {activeRedMother==='analysis'&&<>
        {subButton('Questions','analysis',!canAnalysis,'&q=1',activeRedView==='analysis'&&!query.get('q'))}
        {[1,2,3,4].map(i=>subButton(`Question ${i}`,'analysis',!canAnalysis,`&q=${i}`,activeRedView==='analysis'&&activeQuestion===i))}
      </>}
    </div>
    <div className={`sidebar-subgroup ${activeRedMother==='report'?'active expanded':'collapsed'}`}><div className="sidebar-subgroup-title">Report</div>
      {activeRedMother==='report'&&<>
        {subButton('Written Report','written',!canWritten,'',activeRedView==='written')}
        {subButton('Graph Selection','graph',!canGraph,'',activeRedView==='graph')}
        {subButton('Visual Report','visual',!canVisual,'&case=1',activeRedView==='visual'&&!query.get('case'))}
        {[1,2,3,4,5,6].map(i=>subButton(`Case ${i}`,'visual',!canVisual,`&case=${i}`,activeRedView==='visual'&&activeCase===i))}
      </>}
    </div>
  </div>:null;

  const swAttempt=session?.seaWolfAttempt;
  const swScenario=getSeaWolfScenario(session?.selectedSeaWolfId);
  const swCurrentSiteIndex=swAttempt?.currentSiteIndex??0;
  const swCurrentSite=swScenario.sites[swCurrentSiteIndex];
  const swCurrentSiteAttempt=swCurrentSite?swAttempt?.sites[swCurrentSite.id]:undefined;
  const swStep:SeaWolfStep=swAttempt?.completed?'siteResult':(swAttempt?.currentStep??'taskIntro');
  const transferApplicable=swStep==='transferReview'||Boolean(swCurrentSiteAttempt?.transferAllocations?.length);
  const visibleSeaWolfStages=transferApplicable
    ? [seaWolfStageItems[0],{step:'transferReview' as SeaWolfStep,label:'Transfer Review'},...seaWolfStageItems.slice(1)]
    : seaWolfStageItems;
  const swStepIndex=visibleSeaWolfStages.findIndex(item=>item.step===swStep);
  const seaWolfSubnav=location.pathname==='/seawolf'&&swAccess&&swStep!=='taskIntro'?<div className="seawolf-sidebar-subnav" aria-label="Sea Wolf site and stage navigation">
    {swScenario.sites.map((site,index)=>{
      const siteAttempt=swAttempt?.sites[site.id];
      const current=Boolean(!swAttempt?.completed&&index===swCurrentSiteIndex);
      const completed=Boolean(siteAttempt?.completed);
      const locked=Boolean(!swAttempt?.completed&&index>swCurrentSiteIndex);
      return <div key={site.id} className={`seawolf-sitegroup ${current?'active expanded':'collapsed'} ${completed?'done':''} ${locked?'locked':''}`}>
        <div className="seawolf-sitegroup-title"><span>Site {index+1}</span><strong>{site.title}</strong>{completed&&<span className="site-status" aria-label="Completed">✓</span>}{locked&&<span className="site-status" aria-label="Locked">🔒</span>}</div>
        {current&&<div className="seawolf-site-stages">{visibleSeaWolfStages.map((item,stageIndex)=><span key={item.step} className={`sidebar-stageitem ${item.step===swStep?'active':''} ${stageIndex<swStepIndex?'done':''}`} aria-current={item.step===swStep?'step':undefined}>{item.label}</span>)}</div>}
      </div>;
    })}
  </div>:null;

  return <div className="app-shell"><aside className="sidebar">
    <button className="sidebar-brand decisionlab-brand" onClick={()=>navigate('/')} aria-label="Return to Home"><span className="brand-mark decisionlab-mark" aria-hidden="true"><span>D</span></span><span className="brand-wording"><span className="brand-title"><span className="brand-decision">DECISION</span><span className="brand-lab">LAB</span></span></span></button>
    <nav className="sidebar-nav" aria-label="Primary navigation">{navItem('/','Home','⌂')}{navItem(redRockNavPath,'Red Rock Study','01',!rrAccess)}{redRockSubnav}{navItem('/seawolf','Sea Wolf Study','02',!swAccess)}{seaWolfSubnav}</nav>
  </aside><div className="main-workspace"><header className="topbar"><div><div className="top-eyebrow">Client Advisory Workspace</div>{topTitle&&<strong>{topTitle}</strong>}</div><div className="top-actions">{session&&<span className="save-pill">Autosave on</span>}{inTask&&<span className="tag">{session?.mode==='simulation'?'Simulation':'Learning'}</span>}{session&&<button className="top-reset" onClick={reset}>Reset</button>}</div></header>
    <Routes><Route path="/" element={<HomePage/>}/><Route path="/redrock" element={rrAccess?<RedRockPage/>:<Navigate to="/" replace/>}/><Route path="/task1-result" element={task1Result?<Task1ResultPage/>:<Navigate to={activeSessionPath(session)} replace/>}/><Route path="/seawolf" element={swAccess?<SeaWolfPage/>:<Navigate to={activeSessionPath(session)} replace/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
  </div></div>
}
export default function App(){return <Shell/>}
