import type { Task1Score } from '../types';

const items=[
  {key:'analysis',label:'Analysis',weight:50},
  {key:'writtenReport',label:'Written Report',weight:20},
  {key:'visualReport',label:'Graph Selection',weight:10},
  {key:'visualCases',label:'Visual Report Cases',weight:20}
] as const;

export default function RedRockPerformanceSnapshot({score}:{score:Task1Score}){
  return <aside className="performance-snapshot" aria-label="Task 1 performance snapshot">
    <div className="eyebrow">Performance snapshot</div>
    {items.map(item=><div className="performance-snapshot-row" key={item.key}>
      <div><span>{item.label}</span><small>{item.weight}% weight</small></div>
      <strong>{score[item.key]}%</strong>
    </div>)}
  </aside>;
}
