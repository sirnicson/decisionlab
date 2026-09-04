import { describe, expect, it } from 'vitest';
import { seaWolfScenarios } from '../../data/seawolf/scenarios';
import { deriveInitialProspectPool, evaluateProspectRound, normalisedSitePerformance, preferredCharacteristicSelection, treatmentEffectiveness } from './seawolf';

describe('Sea Wolf scoring',()=>{
  it('scores the Cinder Bay canonical treatment at 100%',()=>{
    const site=seaWolfScenarios[0].sites[0];
    const initial=deriveInitialProspectPool(site,preferredCharacteristicSelection(site));
    const shigora=site.prospectRounds[2].candidates.find(m=>m.name==='Shigora')!;
    const alteria=site.prospectRounds[3].candidates.find(m=>m.name==='Alteria')!;
    const abyssia=initial.find(m=>m.name==='Abyssia')!;
    expect(treatmentEffectiveness(site,[abyssia,shigora,alteria])).toBe(100);
  });
  it('changes the six-card pool when the characteristic lens changes',()=>{
    const site=seaWolfScenarios[0].sites[0];
    const preferred=deriveInitialProspectPool(site,preferredCharacteristicSelection(site));
    const alternative=deriveInitialProspectPool(site,[`Permeability ${site.ranges.permeability.join('–')}`,'Aerobic']);
    expect(new Set(alternative.map(card=>card.id))).not.toEqual(new Set(preferred.map(card=>card.id)));
  });
  it('evaluates prospect quality against the actual profiled pool',()=>{
    const site=seaWolfScenarios[0].sites[0];
    const pool=deriveInitialProspectPool(site,preferredCharacteristicSelection(site));
    const evaluations=evaluateProspectRound(site,pool,0);
    expect(evaluations).toHaveLength(3);
    expect(evaluations.some(item=>item.judgement==='strong')).toBe(true);
  });
  it('normalises a best-feasible 80 to 100',()=>expect(normalisedSitePerformance(80,80)).toBe(100));
});
