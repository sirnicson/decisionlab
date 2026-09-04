import { describe, expect, it } from 'vitest';
import { isSessionReviewable } from './access';
import type { SimulationSession } from '../../types';

const base = {
  id:'s1',
  mode:'simulation' as const,
  selectedRedRockId:'salvanova',
  selectedSeaWolfId:'cinder-bay',
  startedAt:1
};

describe('result/review access gate',()=>{
  it('blocks an active but incomplete simulation',()=>{
    expect(isSessionReviewable(base as SimulationSession)).toBe(false);
  });

  it('blocks a simulation even if only Task 1 is complete',()=>{
    const session={...base,completedAt:2,redRockAttempt:{scenarioId:'salvanova',analysisAnswers:{},reportAnswers:{},visualCaseAnswers:{},journal:[],hintsUsed:0,retries:0,timeUsedSeconds:1,completed:true}};
    expect(isSessionReviewable(session as SimulationSession)).toBe(false);
  });

  it('allows a completed full simulation',()=>{
    const session={
      ...base,
      completedAt:2,
      redRockAttempt:{scenarioId:'salvanova',analysisAnswers:{},reportAnswers:{},visualCaseAnswers:{},journal:[],hintsUsed:0,retries:0,timeUsedSeconds:1,completed:true},
      seaWolfAttempt:{scenarioId:'cinder-bay',sites:{},hintsUsed:0,retries:0,timeUsedSeconds:1,completed:true}
    };
    expect(isSessionReviewable(session as SimulationSession)).toBe(true);
  });

  it('allows a completed single-task learning attempt',()=>{
    const session={
      id:'l1',
      mode:'learning' as const,
      selectedRedRockId:'salvanova',
      completedAt:2,
      redRockAttempt:{scenarioId:'salvanova',analysisAnswers:{},reportAnswers:{},visualCaseAnswers:{},journal:[],hintsUsed:0,retries:0,timeUsedSeconds:1,completed:true}
    };
    expect(isSessionReviewable(session as SimulationSession)).toBe(true);
  });
});
