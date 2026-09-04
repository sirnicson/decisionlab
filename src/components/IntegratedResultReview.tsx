import { useState, type ReactNode } from 'react';
import type { RedRockAttempt, RedRockScenario, SeaWolfAttempt, SeaWolfScenario, Microbe } from '../types';
import { answerIsCorrect, fieldAnswerIsCorrect } from '../engine/scoring/redrock';
import { deriveInitialProspectPool, isAcceptedCharacteristicSelection, normalisedSitePerformance, preferredCharacteristicSelection, treatmentEffectiveness } from '../engine/scoring/seawolf';

const reviewStatus=(correct:boolean)=><span className={correct?'review-good':'review-bad'}>{correct?'Correct':'Needs review'}</span>;

function ReviewDisclosure({title,className='',children}:{title:string;className?:string;children:ReactNode}){
  const [open,setOpen]=useState(false);
  return <section className={`panel review-disclosure ${className} ${open?'open':'collapsed'}`}>
    <button type="button" className="review-disclosure-toggle" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>
      <span className="eyebrow">Detailed review · {title}</span>
      <span className="review-disclosure-chevron" aria-hidden="true">{open?'▴':'▾'}</span>
    </button>
    {open&&<div className="review-disclosure-content">{children}</div>}
  </section>;
}

export function RedRockDetailedReview({scenario,attempt}:{scenario:RedRockScenario;attempt:RedRockAttempt}){
  const chartChoiceCorrect=scenario.report.visual.acceptedChartTypes.includes(attempt.visualChartType??'');
  return <div className="integrated-review-stack">
    <ReviewDisclosure title="Analysis" className="task1-review">{scenario.analysisSections.map((s,i)=><div className="review-block" key={s.id}><h3>Question {i+1}</h3>{s.fields.map(q=>{const submitted=attempt.analysisAnswers[q.id]||'—';const correct=answerIsCorrect(q,submitted);return <div className="review-answer detailed" key={q.id}><div><strong>{q.prompt}</strong><span>Submitted: {submitted}</span><span>Expected: {String(q.answer)} {q.unit??''}</span><span className="review-explanation">{q.explanation}</span></div>{reviewStatus(correct)}</div>})}</div>)}</ReviewDisclosure>

    <ReviewDisclosure title="Written report" className="task1-review"><div className="review-field-grid">{scenario.report.fields.map(field=>{const submitted=attempt.reportAnswers[field.id]||'—';const expected=String(field.answer);const correct=fieldAnswerIsCorrect(attempt.reportAnswers[field.id],field.answer,field.tolerance);return <div className="review-field-card" key={field.id}><span>{field.label}</span><strong>{submitted} {field.unit??''}</strong><small>Benchmark: {expected} {field.unit??''}</small><b className={correct?'review-good':'review-bad'}>{correct?'Correct':'Needs review'}</b></div>})}</div></ReviewDisclosure>

    <ReviewDisclosure title="Graph Selection" className="task1-review"><div className="review-answer detailed"><div><strong>Chart choice</strong><span>Suitable chart types: {scenario.report.visual.acceptedChartTypes.join(' / ')}</span><span className="review-explanation">{scenario.report.visual.explanation}</span></div>{reviewStatus(chartChoiceCorrect)}</div>{scenario.report.visual.dataFields.map(field=>{const submitted=attempt.graphAnswers?.[field.id]||'—';const correct=fieldAnswerIsCorrect(attempt.graphAnswers?.[field.id],field.answer,field.tolerance);return <div className="review-answer detailed" key={field.id}><div><strong>{field.label}</strong><span>Submitted: {submitted} {field.unit??''}</span><span>Expected: {String(field.answer)} {field.unit??''}</span></div>{reviewStatus(correct)}</div>})}</ReviewDisclosure>

    <ReviewDisclosure title="Visual Report" className="task1-review">{scenario.visualCases.map((c,i)=>{const submitted=attempt.visualCaseAnswers[c.question.id]||'—';const correct=answerIsCorrect(c.question,submitted);return <div className="review-answer detailed" key={c.id}><div><strong>Case {i+1}: {c.title}</strong><span>{c.question.prompt}</span><span>Submitted: {submitted}</span><span>Expected: {String(c.question.answer)} {c.question.unit??''}</span><span className="review-explanation">{c.question.explanation}</span></div>{reviewStatus(correct)}</div>})}</ReviewDisclosure>
  </div>;
}

export function SeaWolfDetailedReview({scenario,attempt}:{scenario:SeaWolfScenario;attempt:SeaWolfAttempt}){
  const selectedProspectsFor=(siteIndex:number)=>{
    const site=scenario.sites[siteIndex];
    const a=attempt.sites[site.id];
    return (a?.prospectDecisions??[]).map(decision=>
      site.prospectRounds.find(round=>round.id===decision.roundId)?.candidates.find(card=>card.id===decision.microbeId)
    ).filter(Boolean) as Microbe[];
  };
  const finalPoolFor=(siteIndex:number)=>{
    const site=scenario.sites[siteIndex];
    const a=attempt.sites[site.id];
    return [...deriveInitialProspectPool(site,a?.selectedCharacteristics??[]),...selectedProspectsFor(siteIndex)]
      .filter((card,index,all)=>all.findIndex(item=>item.id===card.id)===index);
  };

  return <div className="integrated-review-stack seawolf-detailed-review">
    <ReviewDisclosure title="Site Profiling" className="task2-review">
      {scenario.sites.map((site,index)=>{
        const a=attempt.sites[site.id];
        const selected=a?.selectedCharacteristics??[];
        const correct=isAcceptedCharacteristicSelection(site,selected);
        const reference=preferredCharacteristicSelection(site).join(' + ');
        return <div className="review-answer detailed" key={site.id}><div><strong>Site {index+1}: {site.title}</strong><span>Selected: {selected.join(' + ')||'—'}</span><span>Expected: {reference}</span></div>{reviewStatus(correct)}</div>;
      })}
    </ReviewDisclosure>

    <ReviewDisclosure title="Treatment Construction" className="task2-review">
      {scenario.sites.map((site,index)=>{
        const a=attempt.sites[site.id];
        const finalPool=finalPoolFor(index);
        const chosen=finalPool.filter(m=>a?.treatmentIds.includes(m.id));
        const effect=treatmentEffectiveness(site,chosen);
        const normalised=normalisedSitePerformance(effect,site.maximumFeasibleEffectiveness);
        const correct=normalised===100;
        return <div className="review-answer detailed treatment-review-answer" key={site.id}><div><strong>Site {index+1}: {site.title}</strong><span>Submitted treatment: {chosen.map(m=>m.name).join(' + ')||'—'}</span><span>Achieved effectiveness: {effect}%</span><span>Maximum feasible for this site: {site.maximumFeasibleEffectiveness}%</span></div>{reviewStatus(correct)}</div>;
      })}
    </ReviewDisclosure>
  </div>;
}
