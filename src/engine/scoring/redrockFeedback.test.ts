import { describe, expect, it } from 'vitest';
import type { Task1Score } from '../../types';
import { redRockPrimaryConcern } from './redrock';

const score=(overrides:Partial<Task1Score>):Task1Score=>({
  total:0,
  analysis:100,
  writtenReport:100,
  visualReport:100,
  visualCases:100,
  timeDiscipline:100,
  ...overrides
});

describe('Red Rock Primary Concern client synthesis',()=>{
  it('recognises a fully client-ready submission',()=>{
    const concern=redRockPrimaryConcern(score({total:100}));
    expect(concern.title).toContain('No material concern');
    expect(concern.detail).toContain('technical work');
  });

  it('connects weak analysis and report while acknowledging stronger communication',()=>{
    const concern=redRockPrimaryConcern(score({analysis:20,writtenReport:30,visualReport:100,visualCases:40}));
    expect(concern.title).toContain('analysis is not yet translating');
    expect(concern.detail).toContain('graph selection');
    expect(concern.detail).toContain('analytical');
    expect(concern.detail).toContain('written report');
  });


  it('identifies communication weakness when the technical foundation is sound',()=>{
    const concern=redRockPrimaryConcern(score({analysis:90,writtenReport:90,visualReport:40,visualCases:55}));
    expect(concern.title).toContain('technical case');
    expect(concern.detail).toContain('visual');
  });
});
