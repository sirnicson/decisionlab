import { useState, type KeyboardEvent } from 'react';
import type { Exhibit, RedRockScenario } from '../types';
import ExhibitRenderer from './ExhibitRenderer';
import { chartDatumAriaLabel, SvgChartTooltip, type ChartTooltipDatum } from './ChartInteraction';

const palette=['#8FC21F','#355A48','#6C7A70','#C98E47','#587766','#A9C75A'];

type GraphShape={labels:string[];series:{name:string;values:number[]}[];unit?:string};

function buildShape(scenario:RedRockScenario,values:number[]):GraphShape{
  const units=scenario.report.visual.dataFields.map(field=>field.unit).filter(Boolean);
  const unit=units.length&&units.every(value=>value===units[0])?units[0]:undefined;
  if(scenario.id==='caldera'){
    return {
      labels:['Nitrogen','Phosphorus','Dissolved oxygen'],
      series:[
        {name:'Year 0',values:[values[0]??0,values[2]??0,values[4]??0]},
        {name:'Year 5',values:[values[1]??0,values[3]??0,values[5]??0]},
      ],
      unit,
    };
  }
  if(scenario.id==='norvale'){
    return {
      labels:['Year 0','Year 5'],
      series:[
        {name:'Natural recovery',values:[values[0]??0,values[1]??0]},
        {name:'Integrated restoration',values:[values[2]??0,values[3]??0]},
      ],
      unit,
    };
  }
  return {
    labels:['Year 0','Year 5'],
    series:[
      {name:'With wolves',values:[values[0]??0,values[1]??0]},
      {name:'No wolves',values:[values[2]??0,values[3]??0]},
    ],
    unit,
  };
}

function useChartTooltip(){
  const [tooltip,setTooltip]=useState<ChartTooltipDatum|null>(null);
  const hover=(datum:ChartTooltipDatum)=>setTooltip({...datum,pinned:false});
  const leave=()=>setTooltip(current=>current?.pinned?current:null);
  const pin=(datum:ChartTooltipDatum)=>setTooltip(current=>current?.key===datum.key&&current.pinned?null:{...datum,pinned:true});
  const keyPin=(event:KeyboardEvent<SVGElement>,datum:ChartTooltipDatum)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();pin(datum)}};
  return {tooltip,hover,leave,pin,keyPin};
}

function ScatterPreview({shape}:{shape:GraphShape}){
  const {tooltip,hover,leave,pin,keyPin}=useChartTooltip();
  const points=shape.series.flatMap((series,si)=>series.values.map((value,i)=>({series:series.name,label:shape.labels[i]??String(i+1),value,si,i})));
  const W=760,H=280,pad={l:64,r:32,t:30,b:58};const iw=W-pad.l-pad.r,ih=H-pad.t-pad.b;
  const max=Math.max(1,...points.map(point=>point.value));const min=Math.min(0,...points.map(point=>point.value));
  const y=(value:number)=>pad.t+ih-((value-min)/(max-min||1))*ih;
  const x=(index:number)=>pad.l+(points.length===1?iw/2:index*iw/(points.length-1));
  return <div className="exhibit-renderer graph-special-preview"><div className="exhibit-heading"><h3>Generated scatter preview</h3></div><svg className="exhibit-chart interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label="Generated scatter plot. Hover, focus or tap a point to see its exact value." onPointerLeave={leave}>
    <line x1={pad.l} y1={pad.t+ih} x2={W-pad.r} y2={pad.t+ih} stroke="#cfd6ce"/>
    {points.map((point,index)=>{const cx=x(index),cy=y(point.value);const datum:ChartTooltipDatum={key:`scatter-${point.series}-${point.label}-${index}`,x:cx,y:cy,context:`${point.series} · ${point.label}`,value:point.value,unit:shape.unit};return <g key={datum.key} className="chart-data-mark chart-point-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={event=>keyPin(event,datum)}><circle className="chart-point-hit" cx={cx} cy={cy} r="13" fill="transparent"/><circle className="chart-point-core" cx={cx} cy={cy} r="5" fill={palette[point.si%palette.length]}/><text x={cx} y={H-25} textAnchor="middle" fontSize="9" fill="#68746c">{point.label}</text></g>})}
    {shape.series.map((series,index)=><g key={series.name}><circle cx={pad.l+index*180+5} cy="10" r="5" fill={palette[index%palette.length]}/><text x={pad.l+14+index*180} y="14" fontSize="11" fill="#39473f">{series.name}</text></g>)}
    <SvgChartTooltip datum={tooltip} width={W} height={H}/>
  </svg></div>;
}

function DumbbellPreview({shape}:{shape:GraphShape}){
  const {tooltip,hover,leave,pin,keyPin}=useChartTooltip();
  const W=760,H=285,pad={l:150,r:46,t:42,b:32};const iw=W-pad.l-pad.r;
  const all=shape.series.flatMap(series=>series.values);const max=Math.max(1,...all);const x=(value:number)=>pad.l+(value/max)*iw;
  const rowGap=(H-pad.t-pad.b)/Math.max(1,shape.labels.length);
  return <div className="exhibit-renderer graph-special-preview"><div className="exhibit-heading"><h3>Generated dumbbell preview</h3></div><svg className="exhibit-chart interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label="Generated dumbbell chart. Hover, focus or tap a point to see its exact value." onPointerLeave={leave}>
    {shape.labels.map((label,i)=>{const y=pad.t+i*rowGap+rowGap/2;const start=shape.series[0]?.values[i]??0;const end=shape.series[1]?.values[i]??0;return <g key={label}><text x={pad.l-18} y={y+4} textAnchor="end" fontSize="12" fill="#39473f">{label}</text><line x1={x(start)} y1={y} x2={x(end)} y2={y} stroke="#aab5ad" strokeWidth="4" strokeLinecap="round"/>{[start,end].map((value,j)=>{const context=`${shape.series[j]?.name??`Series ${j+1}`} · ${label}`;const datum:ChartTooltipDatum={key:`dumbbell-${label}-${j}`,x:x(value),y,context,value,unit:shape.unit};return <g key={datum.key} className="chart-data-mark chart-point-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={event=>keyPin(event,datum)}><circle className="chart-point-hit" cx={x(value)} cy={y} r="14" fill="transparent"/><circle className="chart-point-core" cx={x(value)} cy={y} r="7" fill={palette[j%palette.length]}/></g>})}</g>})}
    {shape.series.slice(0,2).map((series,index)=><g key={series.name}><circle cx={pad.l+index*150} cy="16" r="6" fill={palette[index%palette.length]}/><text x={pad.l+12+index*150} y="20" fontSize="11" fill="#39473f">{series.name}</text></g>)}
    <SvgChartTooltip datum={tooltip} width={W} height={H}/>
  </svg></div>;
}

const polar=(cx:number,cy:number,r:number,angle:number)=>{const rad=(angle-90)*Math.PI/180;return {x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)}};
const arcPath=(cx:number,cy:number,r:number,start:number,end:number)=>{const a=polar(cx,cy,r,end),b=polar(cx,cy,r,start),large=end-start<=180?'0':'1';return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${large} 0 ${b.x} ${b.y} Z`;};

function PiePreview({scenario,values,unit}:{scenario:RedRockScenario;values:number[];unit?:string}){
  const {tooltip,hover,leave,pin,keyPin}=useChartTooltip();
  const entries=scenario.report.visual.dataFields.map((field,index)=>({label:field.label,value:Math.max(0,values[index]??0)}));
  const total=Math.max(1,entries.reduce((sum,entry)=>sum+entry.value,0));
  const W=760,H=300,cx=250,cy=148,r=105;let cursor=0;
  return <div className="exhibit-renderer graph-special-preview"><div className="exhibit-heading"><h3>Generated pie preview</h3></div><svg className="exhibit-chart interactive-data-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-roledescription="interactive chart" aria-label="Generated pie chart. Hover, focus or tap a slice to see its exact value." onPointerLeave={leave}>
    {entries.map((entry,index)=>{const start=cursor;const span=entry.value/total*360;const end=cursor+span;cursor=end;const mid=(start+end)/2;const anchor=polar(cx,cy,r*.62,mid);const datum:ChartTooltipDatum={key:`pie-${index}`,x:anchor.x,y:anchor.y,context:entry.label,value:entry.value,unit};return <path key={datum.key} className="chart-data-mark pie-slice-mark" tabIndex={0} aria-label={chartDatumAriaLabel(datum.context,datum.value,datum.unit)} d={arcPath(cx,cy,r,start,end)} fill={palette[index%palette.length]} stroke="#fff" strokeWidth="2" onPointerEnter={()=>hover(datum)} onFocus={()=>hover(datum)} onBlur={leave} onClick={()=>pin(datum)} onKeyDown={event=>keyPin(event,datum)}/>})}
    {entries.map((entry,index)=><g key={`legend-${entry.label}`}><rect x="420" y={50+index*46} width="12" height="12" rx="2" fill={palette[index%palette.length]}/><text x="442" y={60+index*46} fontSize="11" fill="#39473f">{entry.label}</text></g>)}
    <SvgChartTooltip datum={tooltip} width={W} height={H}/>
  </svg></div>;
}

export default function GraphSelectionPreview({scenario,answers,chartType,title='Generated preview'}:{scenario:RedRockScenario;answers:Record<string,string>|undefined;chartType:string|undefined;title?:string}){
  const values=scenario.report.visual.dataFields.map(field=>Number(answers?.[field.id]));
  const ready=values.length>0&&values.every(Number.isFinite);
  if(!chartType||!ready)return <div className="chart-preview-empty">Select a chart and enter the required data to build the visual.</div>;
  const shape=buildShape(scenario,values);
  if(chartType==='Dumbbell chart')return <DumbbellPreview shape={shape}/>;
  if(chartType==='Scatter plot')return <ScatterPreview shape={shape}/>;
  if(chartType==='Pie chart')return <PiePreview scenario={scenario} values={values} unit={shape.unit}/>;
  const type=chartType==='Clustered bar chart'?'bar-chart':'line-chart';
  const exhibit:Exhibit={id:'graph-selection-preview',title,type,labels:shape.labels,series:shape.series,unit:shape.unit};
  return <ExhibitRenderer exhibit={exhibit}/>;
}
