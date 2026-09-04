import { describe, expect, it } from 'vitest';
import type { SimulationSession } from '../../types';
import { migrateSessionForCurrentModel, SALVANOVA_MODEL_REVISION } from './storage';

const oldSalvanovaSession=():SimulationSession=>({
  id:'old-salvanova',mode:'learning',selectedRedRockId:'salvanova',currentTask:'redrock',
  redRockAttempt:{
    scenarioId:'salvanova',analysisAnswers:{'s-a2':'386,890','s-a3':'22.46','s-a7':'75000'},
    reportAnswers:{'s-r6':'386890','s-r9':'100000'},graphAnswers:{},visualCaseAnswers:{},
    journal:[
      {id:'fact-ex1-y5-wolves',factId:'ex1-y5-wolves',label:'With wolves · Year 5',value:'386,890 hares',important:true,source:'investigation',origin:'Exhibit 1'},
      {id:'fact-s-ex2-tourism-revenue-index-000-year-2',factId:'s-ex2-tourism-revenue-index-000-year-2',label:'Tourism revenue · Year 2',value:'$50,000',important:false,source:'investigation',origin:'Exhibit 2'},
      {id:'fact-s-ex2-tourism-revenue-index-000-year-3',factId:'s-ex2-tourism-revenue-index-000-year-3',label:'Tourism revenue · Year 3',value:'$75,000',important:true,source:'investigation',origin:'Exhibit 2'},
    ],hintsUsed:1,retries:2,timeUsedSeconds:120,completed:false,stage:'analysis',analysisLocked:false,writtenLocked:false,graphLocked:false,visualLocked:false,
  }
});

describe('Salvanova model revision migration',()=>{
  it('refreshes only former Salvanova model benchmarks and affected journal evidence',()=>{
    const migrated=migrateSessionForCurrentModel(oldSalvanovaSession());
    expect(migrated.salvanovaModelRevision).toBe(SALVANOVA_MODEL_REVISION);
    expect(migrated.redRockAttempt?.analysisAnswers['s-a2']).toBe('347373');
    expect(migrated.redRockAttempt?.analysisAnswers['s-a3']).toBe('13.64');
    expect(migrated.redRockAttempt?.analysisAnswers['s-a7']).toBe('75000');
    expect(migrated.redRockAttempt?.reportAnswers['s-r6']).toBe('347373');
    expect(migrated.redRockAttempt?.reportAnswers['s-r9']).toBe('100000');
    expect(migrated.redRockAttempt?.journal.map(item=>item.value)).toEqual(['347,373 hares','$45,000','$70,000']);
    expect(migrated.redRockAttempt?.journal.map(item=>item.important)).toEqual([true,false,true]);
  });

  it('preserves non-benchmark learner answers rather than overwriting them',()=>{
    const session=oldSalvanovaSession();
    session.redRockAttempt!.analysisAnswers['s-a2']='350000';
    session.redRockAttempt!.analysisAnswers['s-a3']='15';
    session.redRockAttempt!.reportAnswers['s-r6']='350000';
    const migrated=migrateSessionForCurrentModel(session);
    expect(migrated.redRockAttempt?.analysisAnswers['s-a2']).toBe('350000');
    expect(migrated.redRockAttempt?.analysisAnswers['s-a3']).toBe('15');
    expect(migrated.redRockAttempt?.reportAnswers['s-r6']).toBe('350000');
  });

  it('does not alter unrelated scenarios',()=>{
    const session=oldSalvanovaSession();
    session.selectedRedRockId='caldera';
    session.redRockAttempt={...session.redRockAttempt!,scenarioId:'caldera'};
    const migrated=migrateSessionForCurrentModel(session);
    expect(migrated).toEqual(session);
  });
});
