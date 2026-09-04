import type { Task2Score } from '../types';

const items=[
  {key:'siteProfiling',label:'Site Profiling',weight:10},
  {key:'categorisation',label:'Categorisation & Transfer',weight:30},
  {key:'prospectSelection',label:'Prospect Selection',weight:25},
  {key:'treatment',label:'Treatment Construction',weight:35}
] as const;

const weightedPoints=(value:number,weight:number)=>{
  const points=value*weight/100;
  return Number.isInteger(points)?String(points):points.toFixed(1);
};

export default function SeaWolfPerformanceSnapshot({score}:{score:Task2Score}){
  return <aside className="performance-snapshot" aria-label="Task 2 performance snapshot">
    <div className="eyebrow">Performance snapshot</div>
    {items.map(item=><div className="performance-snapshot-row" key={item.key}>
      <div><span>{item.label}</span><small>{item.weight}% weight</small></div>
      <strong>{weightedPoints(score[item.key],item.weight)}</strong>
    </div>)}
  </aside>;
}
