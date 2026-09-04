import { useState, type KeyboardEvent } from 'react';
import type { Exhibit } from '../types';
import { chartDatumAriaLabel, SvgChartTooltip, type ChartTooltipDatum } from './ChartInteraction';

const palette=['#8FC21F','#355A48','#6C7A70','#C98E47'];

export function ExhibitChart({exhibit}:{exhibit:Exhibit}){
  const [tooltip,setTooltip]=useState<ChartTooltipDatum|null>(null);
  const series=exhibit.series??[];const labels=exhibit.labels??[];
  const values=series.flatMap(s=>s.values);const max=Math.max(1,...values);const min=Math.min(0,...values);
  const W=760,H=330,pad={l:56,r:28,t:28,b:55};const iw=W-pad.l-pad.r,ih=H-pad.t-pad.b;
  const y=(v:number)=>pad.t+ih-((v-min)/(max-min||1))*ih;
  const hover=(datum:ChartTooltipDatum)=>setTooltip({...datum,pinned:false});
  const leave=()=>setTooltip(current=>current?.pinned?current:null);
  const pin=(datum:ChartTooltipDatum)=>setTooltip(current=>current?.key===datum.key&&current.pinned?null:{...datum,pinned:true});
  const keyPin=(event:KeyboardEvent<SVGElement>,datum:ChartTooltipDatum)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pin(datum)}};

  if(exhibit.type==='bar-chart'){
    const group=iw/Math.max(1,labels.length);const bw=Math.min(34,group/(series.length+1));
    return <svg className="exhibit-chart interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label={`${exhibit.title}. Hover, focus or tap a bar to see its exact value.`} onPointerLeave={leave}>
      <line x1={pad.l} y1={pad.t+ih} x2={W-pad.r} y2={pad.t+ih} stroke="#cfd6ce"/>
      {labels.map((lab,i)=><g key={lab}>{series.map((s,j)=>{
        const x=pad.l+i*group+group/2-(series.length*bw)/2+j*bw;const yy=y(s.values[i]);
        const datum:ChartTooltipDatum={key:`${s.name}-${lab}-${i}`,x:x+(bw-4)/2,y:yy,context:`${s.name} · ${lab}`,value:s.values[i],unit:exhibit.unit};
        return <rect key={s.name} className="chart-data-mark chart-bar-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} x={x} y={yy} width={bw-4} height={pad.t+ih-yy} rx="3" fill={palette[j%palette.length]} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={e=>keyPin(e,datum)}/>;
      })}<text x={pad.l+i*group+group/2} y={H-23} textAnchor="middle" fontSize="11" fill="#68746c">{lab}</text></g>)}
      {series.map((s,j)=><g key={s.name}><rect x={pad.l+j*170} y="6" width="10" height="10" rx="2" fill={palette[j%palette.length]}/><text x={pad.l+15+j*170} y="15" fontSize="11" fill="#39473f">{s.name}</text></g>)}
      <SvgChartTooltip datum={tooltip} width={W} height={H}/>
    </svg>;
  }

  return <svg className="exhibit-chart interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label={`${exhibit.title}. Hover, focus or tap a point to see its exact value.`} onPointerLeave={leave}>
    <line x1={pad.l} y1={pad.t+ih} x2={W-pad.r} y2={pad.t+ih} stroke="#cfd6ce"/>
    {labels.map((lab,i)=><text key={lab} x={pad.l+(labels.length===1?0:i*iw/(labels.length-1))} y={H-23} textAnchor="middle" fontSize="11" fill="#68746c">{lab}</text>)}
    {series.map((s,j)=>{
      const pts=s.values.map((v,i)=>`${pad.l+(s.values.length===1?0:i*iw/(s.values.length-1))},${y(v)}`).join(' ');
      return <g key={s.name}><polyline fill="none" stroke={palette[j%palette.length]} strokeWidth="4" points={pts}/>{s.values.map((v,i)=>{
        const cx=pad.l+(s.values.length===1?0:i*iw/(s.values.length-1));const cy=y(v);const label=labels[i]??String(i+1);
        const datum:ChartTooltipDatum={key:`${s.name}-${label}-${i}`,x:cx,y:cy,context:`${s.name} · ${label}`,value:v,unit:exhibit.unit};
        return <g key={i} className="chart-data-mark chart-point-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={e=>keyPin(e,datum)}>
          <circle className="chart-point-hit" cx={cx} cy={cy} r="12" fill="transparent"/>
          <circle className="chart-point-core" cx={cx} cy={cy} r="4" fill={palette[j%palette.length]}/>
        </g>;
      })}<rect x={pad.l+j*180} y="6" width="10" height="10" rx="2" fill={palette[j%palette.length]}/><text x={pad.l+15+j*180} y="15" fontSize="11" fill="#39473f">{s.name}</text></g>;
    })}
    <SvgChartTooltip datum={tooltip} width={W} height={H}/>
  </svg>;
}

export default function ExhibitRenderer({exhibit}:{exhibit:Exhibit}){
  return <div className="exhibit-renderer">
    <div className="exhibit-heading"><h3>{exhibit.title}</h3></div>
    {exhibit.type==='table'&&<div className="table-wrap"><table><thead><tr>{exhibit.columns?.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{exhibit.rows?.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}
    {exhibit.type==='text'&&<p>{exhibit.text}</p>}
    {(exhibit.type==='line-chart'||exhibit.type==='bar-chart')&&<ExhibitChart exhibit={exhibit}/>} 
    {exhibit.note&&<p className="muted exhibit-note">{exhibit.note}</p>}
  </div>;
}
