import { describe, expect, it } from 'vitest';
import { redRockScenarios } from '../../data/redrock/scenarios';
import { RED_ROCK_WEIGHTS, scoreRedRock } from '../scoring/redrock';

describe('Red Rock data',()=>{
  it('contains exactly 3 studies',()=>expect(redRockScenarios).toHaveLength(3));

  it('uses the authoritative 3-stage content grammar',()=>{
    for(const scenario of redRockScenarios){
      expect(scenario.exhibits).toHaveLength(2);
      expect(scenario.analysisSections).toHaveLength(4);
      expect(scenario.visualCases).toHaveLength(6);
      expect(scenario.report.fields.length).toBeGreaterThan(0);
      expect(scenario.report.visual.chartOptions).toHaveLength(3);
      expect(scenario.report.visual.dataFields.length).toBeGreaterThan(0);
      for(const c of scenario.visualCases)expect(c.exhibit).toBeDefined();
    }
  });

  it('uses context-specific Graph Selection option sets with two accepted choices',()=>{
    const expected={
      salvanova:{options:['Clustered bar chart','Slope chart','Scatter plot'],accepted:['Clustered bar chart','Slope chart']},
      caldera:{options:['Dumbbell chart','Clustered bar chart','Line chart'],accepted:['Dumbbell chart','Clustered bar chart']},
      norvale:{options:['Line chart','Slope chart','Pie chart'],accepted:['Line chart','Slope chart']},
    } as const;
    for(const scenario of redRockScenarios){
      const rule=expected[scenario.id as keyof typeof expected];
      expect(scenario.report.visual.chartOptions, `${scenario.title} chart options`).toEqual(rule.options);
      expect(scenario.report.visual.acceptedChartTypes, `${scenario.title} accepted charts`).toEqual(rule.accepted);
      expect(scenario.report.visual.acceptedChartTypes).toHaveLength(2);
    }
  });

  it('has unique scenario-local ids',()=>{
    for(const scenario of redRockScenarios){
      const ids=[...scenario.facts.map(x=>x.id),...scenario.analysisQuestions.map(x=>x.id),...scenario.visualCases.map(x=>x.id),...scenario.exhibits.map(x=>x.id)];
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('provides at least 8 written-report fields and four-paragraph decision-ready report copy',()=>{
    for(const scenario of redRockScenarios){
      expect(scenario.report.fields.length, `${scenario.title} written report field count`).toBeGreaterThanOrEqual(8);
      const reportText=scenario.report.template.filter(segment=>segment.type==='text').map(segment=>segment.text).join('');
      const paragraphs=reportText.split('\n\n').filter(Boolean);
      expect(paragraphs.length, `${scenario.title} written report paragraph count`).toBeGreaterThanOrEqual(4);
    }
  });

  it('keeps Written Report benchmark values out of non-field narrative copy',()=>{
    const escapeRegExp=(value:string)=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    for(const scenario of redRockScenarios){
      const prose=scenario.report.template.filter(segment=>segment.type==='text').map(segment=>segment.text).join(' ');
      for(const field of scenario.report.fields){
        const numeric=Number(field.answer);
        if(!Number.isFinite(numeric))continue;
        // Small whole numbers such as Year 5 are legitimate context labels; derived timing/capacity leaks are guarded below.
        if(Number.isInteger(numeric)&&Math.abs(numeric)<10)continue;
        const forms=new Set([String(field.answer),numeric.toLocaleString('en-US')]);
        for(const form of forms){
          const pattern=new RegExp(`(^|[^0-9.])${escapeRegExp(form)}($|[^0-9.])`);
          expect(pattern.test(prose),`${scenario.title}: report prose leaks ${field.label} (${form})`).toBe(false);
        }
      }
      expect(prose,`${scenario.title}: threshold timing leak`).not.toContain('only reached at the end');
      expect(prose,`${scenario.title}: delivery-capacity leak`).not.toContain('technically deliverable within the stated five-year horizon');
    }
  });

  it('maps every draggable Study Information fact to inline evidence text',()=>{
    for(const scenario of redRockScenarios){
      const mapped=new Set((scenario.studyEvidence??[]).map(x=>x.factId));
      for(const fact of scenario.facts.filter(f=>f.source==='study'&&f.draggable)){
        expect(mapped.has(fact.id), `${scenario.title}: ${fact.id} missing inline evidence mapping`).toBe(true);
      }
      for(const span of scenario.studyEvidence??[]){
        expect(scenario.facts.some(f=>f.id===span.factId), `${scenario.title}: missing fact ${span.factId}`).toBe(true);
        expect(scenario.studyInformation[span.paragraphIndex]?.includes(span.text), `${scenario.title}: inline text not found: ${span.text}`).toBe(true);
      }
    }
  });

  it('keeps both Investigation exhibits available as structured evidence sources',()=>{
    for(const scenario of redRockScenarios){
      for(const exhibit of scenario.exhibits){
        expect(Boolean((exhibit.series&&exhibit.labels)||(exhibit.rows&&exhibit.columns)), `${scenario.title}: ${exhibit.id} lacks tabular source data`).toBe(true);
      }
      for(const binding of scenario.exhibitEvidenceBindings??[]){
        expect(scenario.exhibits.some(e=>e.id===binding.exhibitId), `${scenario.title}: missing exhibit ${binding.exhibitId}`).toBe(true);
        expect(scenario.facts.some(f=>f.id===binding.factId), `${scenario.title}: missing bound fact ${binding.factId}`).toBe(true);
      }
    }
  });

  it('keeps Dr. Cross sponsor requests case-specific across all Red Rock studies',()=>{
    for(const scenario of redRockScenarios){
      expect(scenario.writtenReportPrompt.trim().length, `${scenario.title}: missing written-report client prompt`).toBeGreaterThan(40);
      for(const [index,visualCase] of scenario.visualCases.entries()){
        expect(visualCase.clientPrompt?.trim().length??0, `${scenario.title}: Visual Report Case ${index+1} missing Dr. Cross prompt`).toBeGreaterThan(40);
        expect(visualCase.clientPrompt, `${scenario.title}: Visual Report Case ${index+1} still uses generic fallback`).not.toContain('Read this exhibit as a decision for me');
      }
    }
  });

  it('treats Graph Selection as all-or-nothing',()=>{
    const scenario=redRockScenarios[0];
    const base={scenarioId:scenario.id,analysisAnswers:{},reportAnswers:{},graphAnswers:{},visualCaseAnswers:{},journal:[],hintsUsed:0,retries:0,timeUsedSeconds:0,completed:true,visualChartType:scenario.report.visual.acceptedChartTypes[0]};
    expect(scoreRedRock(scenario,base).visualReport).toBe(0);
    const completeGraphAnswers=Object.fromEntries(scenario.report.visual.dataFields.map(field=>[field.id,String(field.answer)]));
    expect(scoreRedRock(scenario,{...base,graphAnswers:completeGraphAnswers}).visualReport).toBe(100);
  });

  it('uses the approved Salvanova hare recurrence and proportional tourism trajectory',()=>{
    const salvanova=redRockScenarios.find(s=>s.id==='salvanova')!;
    const hareExhibit=salvanova.exhibits.find(e=>e.id==='s-ex1')!;
    const withWolves=hareExhibit.series?.find(series=>series.name==='With Wolves')?.values;
    expect(withWolves).toEqual([500000,475000,447500,417250,383975,347373]);
    expect(salvanova.facts.find(f=>f.id==='ex1-y5-wolves')?.value).toBe(347373);
    expect(salvanova.analysisQuestions.find(q=>q.id==='s-a2')?.answer).toBe(347373);
    expect(salvanova.analysisQuestions.find(q=>q.id==='s-a3')?.answer).toBe(13.64);
    expect(salvanova.report.fields.find(f=>f.id==='s-r6')?.answer).toBe(347373);

    const tourismExhibit=salvanova.exhibits.find(e=>e.id==='s-ex2')!;
    const tourism=tourismExhibit.series?.find(series=>series.name==='Tourism revenue index ($000)')?.values;
    expect(tourism).toEqual([0,25,45,70,90,100]);
    expect(salvanova.analysisQuestions.find(q=>q.id==='s-a7')?.answer).toBe(75000);
    expect(salvanova.report.fields.find(f=>f.id==='s-r9')?.answer).toBe(100000);
  });

  it('places Salvanova no-intervention Year-5 vegetation in Study Information rather than Exhibit 2',()=>{
    const salvanova=redRockScenarios.find(s=>s.id==='salvanova')!;
    const prose=salvanova.studyInformation.join(' ');
    expect(prose).toContain('65% by Year 5');
    expect(prose).not.toContain('100% by Year 5');
    expect(salvanova.facts.find(f=>f.id==='ex2-veg-nowolves')?.source).toBe('study');
    expect(salvanova.exhibits[1].note).not.toContain('no-wolf');
  });

  it('keeps Caldera Exhibit 2 to supplied thresholds without precomputed achievement years',()=>{
    const caldera=redRockScenarios.find(s=>s.id==='caldera')!;
    const exhibit=caldera.exhibits.find(e=>e.id==='c-ex2')!;
    expect(exhibit.columns).toEqual(['Indicator','Programme threshold']);
    expect(exhibit.rows?.every(row=>row.length===2)).toBe(true);
    expect(JSON.stringify(exhibit)).not.toMatch(/First year met|Year 3|Year 4|Year 5/);
  });

  it('keeps Norvale Exhibit 2 to raw delivery inputs rather than derived analysis answers',()=>{
    const norvale=redRockScenarios.find(s=>s.id==='norvale')!;
    const exhibit=norvale.exhibits.find(e=>e.id==='n-ex2')!;
    const text=JSON.stringify(exhibit);
    expect(text).toContain('16,000 ha');
    expect(text).toContain('3,200 ha/year');
    expect(text).toContain('$4,500/ha');
    expect(text).toContain('$75m');
    expect(text).not.toContain('$72m');
    expect(text).not.toContain('5 years');
  });
  it('Task 1 assessment uses four dimensions totalling 100% without time discipline',()=>{
    expect(Object.values(RED_ROCK_WEIGHTS).reduce((sum,value)=>sum+value,0)).toBe(100);
    expect(RED_ROCK_WEIGHTS.analysis).toBe(50);
    expect(RED_ROCK_WEIGHTS.writtenReport).toBe(20);
    expect(RED_ROCK_WEIGHTS.visualReport).toBe(10);
    expect(RED_ROCK_WEIGHTS.visualCases).toBe(20);
    expect(Object.keys(RED_ROCK_WEIGHTS)).toHaveLength(4);
  });

});
