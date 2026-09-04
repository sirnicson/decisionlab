import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import type { CalculatorHistoryEntry } from '../types';

type Props={
  history?:CalculatorHistoryEntry[];
  onCommit?:(entry:CalculatorHistoryEntry)=>void;
  onUseResult?:(value:string)=>void;
};

type Token = {type:'number'; value:number} | {type:'op'; value:'+'|'-'|'*'|'/'|'%'} | {type:'lparen'} | {type:'rparen'};

const tokenise=(expression:string):Token[]|null=>{
  const clean=expression.replace(/,/g,'');
  const tokens:Token[]=[];
  let i=0;
  while(i<clean.length){
    const ch=clean[i];
    if(/\s/.test(ch)){i+=1;continue}
    if(/[0-9.]/.test(ch)){
      let j=i;
      let dots=0;
      while(j<clean.length && /[0-9.]/.test(clean[j])){if(clean[j]==='.')dots+=1;j+=1}
      const raw=clean.slice(i,j);
      if(dots>1 || raw==='.' || !/^\d*\.?\d+$/.test(raw))return null;
      const value=Number(raw);
      if(!Number.isFinite(value))return null;
      tokens.push({type:'number',value});
      i=j;continue;
    }
    if(ch==='('){tokens.push({type:'lparen'});i+=1;continue}
    if(ch===')'){tokens.push({type:'rparen'});i+=1;continue}
    if(ch==='+'||ch==='-'||ch==='*'||ch==='/'||ch==='%'){
      tokens.push({type:'op',value:ch});i+=1;continue;
    }
    return null;
  }
  return tokens;
};

const safeEval=(expression:string)=>{
  const tokens=tokenise(expression.trim());
  if(!tokens?.length)return '';
  let pos=0;
  const peek=()=>tokens[pos];
  const parseExpression=():number=>{
    let value=parseTerm();
    while(peek()?.type==='op' && (peek() as Extract<Token,{type:'op'}>).value!=='*' && (peek() as Extract<Token,{type:'op'}>).value!=='/' && (peek() as Extract<Token,{type:'op'}>).value!=='%'){
      const op=(tokens[pos++] as Extract<Token,{type:'op'}>).value;
      const rhs=parseTerm();
      value=op==='+'?value+rhs:value-rhs;
    }
    return value;
  };
  const parseTerm=():number=>{
    let value=parseUnary();
    while(peek()?.type==='op' && ((peek() as Extract<Token,{type:'op'}>).value==='*'||(peek() as Extract<Token,{type:'op'}>).value==='/')){
      const op=(tokens[pos++] as Extract<Token,{type:'op'}>).value;
      const rhs=parseUnary();
      value=op==='*'?value*rhs:value/rhs;
    }
    return value;
  };
  const parseUnary=():number=>{
    const token=peek();
    if(token?.type==='op' && (token.value==='+'||token.value==='-')){
      pos+=1;
      const value=parseUnary();
      return token.value==='-'?-value:value;
    }
    return parsePostfix();
  };
  const parsePostfix=():number=>{
    let value=parsePrimary();
    while(peek()?.type==='op' && (peek() as Extract<Token,{type:'op'}>).value==='%'){
      pos+=1;
      value/=100;
    }
    return value;
  };
  const parsePrimary=():number=>{
    const token=tokens[pos++];
    if(!token)throw new Error('Unexpected end');
    if(token.type==='number')return token.value;
    if(token.type==='lparen'){
      const value=parseExpression();
      if(tokens[pos]?.type!=='rparen')throw new Error('Missing closing parenthesis');
      pos+=1;
      return value;
    }
    throw new Error('Expected number');
  };

  try{
    const value=parseExpression();
    if(pos!==tokens.length || !Number.isFinite(value))return '';
    return String(Math.round(value*10000)/10000);
  }catch{return ''}
};

const dragValue=(e:DragEvent,value:string)=>{
  e.dataTransfer.effectAllowed='copy';
  e.dataTransfer.setData('application/x-solve-value',value);
  e.dataTransfer.setData('text/plain',value);
};

export default function OnscreenCalculator({history=[],onCommit,onUseResult}:Props){
  const [expr,setExpr]=useState('');
  const historyRef=useRef<HTMLDivElement|null>(null);
  const result=useMemo(()=>safeEval(expr),[expr]);
  const keys=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','%','+'];

  useEffect(()=>{
    const node=historyRef.current;
    if(node)node.scrollTop=node.scrollHeight;
  },[history.length]);

  const commit=()=>{
    if(!result)return;
    const expression=expr.trim();
    onCommit?.({id:`calc-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,expression,result,createdAt:Date.now()});
    setExpr(result);
  };

  const insertDroppedValue=(e:DragEvent<HTMLInputElement>)=>{
  e.preventDefault();

  const value=
    e.dataTransfer.getData('application/x-solve-value') ||
    e.dataTransfer.getData('text/plain');

  if(!value)return;

  const input=e.currentTarget;
  const next=`${expr}${value}`;

  setExpr(next);

  requestAnimationFrame(()=>{
    input.focus();
    input.setSelectionRange(next.length,next.length);
  });
};

  return <section className="calculator-panel" aria-label="Onscreen calculator">
    <div className="calculator-title">Calculator</div>
    <div className="calculator-history-heading">Calculation History</div>
    <div ref={historyRef} className="calculator-history" aria-live="polite">
      {history.map(h=><div className="calculator-history-entry" key={h.id}>
          <span className="calculator-history-expression" title={h.expression}>{h.expression}</span>
          <span className="calculator-history-equals">=</span>
          <button
            type="button"
            className="calculator-history-result"
            draggable
            onDragStart={e=>dragValue(e,h.result)}
            onClick={()=>setExpr(h.result)}
            aria-label={`Use result ${h.result} in calculator`}
            title="Drag this result into an answer field, or activate to reuse it in the calculator"
          >{h.result}</button>
        </div>)}
    </div>
    <input
      className="calculator-expression"
      aria-label="Calculator expression"
      value={expr}
      onChange={e=>setExpr(e.target.value)}
      onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();commit()}}}
      onDragOver={e=>e.preventDefault()}
      onDrop={insertDroppedValue}
      placeholder="Enter or drop values"
    />
    <div
      className="calculator-result"
      draggable={Boolean(result)}
      onDragStart={e=>{if(result)dragValue(e,result)}}
      title={result?'Drag current result into an answer field':'Current result'}
    >{result||'—'}</div>
    <div className="calculator-keys">
      <button type="button" onClick={()=>setExpr('')}>CE</button><button type="button" onClick={()=>setExpr(v=>v.slice(0,-1))}>DEL</button><button type="button" onClick={()=>setExpr(v=>`(${v})`)}>( )</button><button type="button" onClick={commit}>=</button>
      {keys.map(k=><button type="button" key={k} onClick={()=>setExpr(v=>v+k)}>{k==='*'?'×':k==='/'?'÷':k}</button>)}
    </div>
    {onUseResult&&<button className="calculator-use" type="button" disabled={!result} onClick={()=>result&&onUseResult(result)}>Use result</button>}
  </section>
}
