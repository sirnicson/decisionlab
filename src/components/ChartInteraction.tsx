export type ChartTooltipDatum = {
  key: string;
  x: number;
  y: number;
  context: string;
  value: number;
  unit?: string;
  pinned?: boolean;
};

export function formatChartValue(value:number,unit?:string){
  const numeric=Number.isInteger(value)
    ? value.toLocaleString('en-US')
    : value.toLocaleString('en-US',{maximumFractionDigits:3});
  if(unit==='%')return `${numeric}%`;
  if(unit==='$')return `$${numeric}`;
  if(unit==='$000')return `$${(value*1000).toLocaleString('en-US',{maximumFractionDigits:0})}`;
  if(unit==='$m')return `$${numeric}m`;
  return unit?`${numeric} ${unit}`:numeric;
}

export function chartDatumAriaLabel(context:string,value:number,unit?:string){
  return `${context}: ${formatChartValue(value,unit)}`;
}

const truncate=(value:string,max=44)=>value.length>max?`${value.slice(0,max-1)}…`:value;

export function SvgChartTooltip({datum,width,height}:{datum:ChartTooltipDatum|null;width:number;height:number}){
  if(!datum)return null;
  const line1=truncate(datum.context);
  const line2=formatChartValue(datum.value,datum.unit);
  const boxWidth=Math.min(Math.max(154,line1.length*6.3+22,line2.length*7+22),Math.max(154,width-16));
  const boxHeight=48;
  const x=Math.max(8,Math.min(width-boxWidth-8,datum.x-boxWidth/2));
  const y=datum.y>boxHeight+20?datum.y-boxHeight-10:Math.min(height-boxHeight-8,datum.y+12);
  return <g className="chart-tooltip-card" aria-hidden="true" pointerEvents="none">
    <rect x={x} y={y} width={boxWidth} height={boxHeight} rx="7"/>
    <text x={x+11} y={y+18}>
      <tspan className="chart-tooltip-context" x={x+11}>{line1}</tspan>
      <tspan className="chart-tooltip-value" x={x+11} dy="18">{line2}</tspan>
    </text>
  </g>;
}
