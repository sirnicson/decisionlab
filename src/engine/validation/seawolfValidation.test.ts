import { describe, expect, it } from 'vitest';
import { SEA_WOLF_TRAITS, seaWolfScenarios } from '../../data/seawolf/scenarios';
import { characteristicOptions, combinations, deriveInitialProspectPool, maximumEffectiveness, preferredCharacteristicSelection, referenceFinalPool, referenceInitialProspectPool, treatmentEffectiveness } from '../scoring/seawolf';
import { characteristicPairs, reachableFinalPools, validateSeaWolfData } from './seawolfValidation';
import { SEA_WOLF_WEIGHTS } from '../scoring/results';

const expectedRoutingSplits:Record<string,[number,number,number]>={
  'cinder-1':[5,2,3],'cinder-2':[5,2,3],'cinder-3':[5,0,5],
  'tidal-1':[5,2,3],'tidal-2':[5,1,4],'tidal-3':[5,0,5],
  'azure-1':[5,2,3],'azure-2':[5,2,3],'azure-3':[5,0,5]
};

describe('Sea Wolf V1.2 characteristic-profiled fixed data',()=>{

  it('uses four Task 2 dimensions totalling 100%',()=>{
    expect(SEA_WOLF_WEIGHTS).toEqual({siteProfiling:10,categorisation:30,prospectSelection:25,treatment:35});
    expect(Object.values(SEA_WOLF_WEIGHTS).reduce((sum,value)=>sum+value,0)).toBe(100);
  });
  it('contains exactly 3 studies × 3 sites',()=>{
    expect(seaWolfScenarios).toHaveLength(3);
    expect(seaWolfScenarios.flatMap(s=>s.sites)).toHaveLength(9);
  });
  it('passes deterministic V1.2 deck validation',()=>expect(validateSeaWolfData()).toEqual([]));
  it('uses only the locked four traits and 1–10 integer indices',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      const cards=[...site.categorisationDeck,...site.initialPoolCandidateUniverse,...site.prospectRounds.flatMap(r=>r.candidates)];
      for(const card of cards){
        expect(SEA_WOLF_TRAITS).toContain(card.trait);
        expect([card.permeability,card.mobility,card.energy].every(v=>Number.isInteger(v)&&v>=1&&v<=10)).toBe(true);
      }
    }
  });
  it('matches the V1.2 routing split snapshot',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      const split:['current'|'next'|'return',number][]=[['current',0],['next',0],['return',0]];
      for(const card of site.categorisationDeck){const row=split.find(([route])=>route===card.expectedAllocation)!;row[1]++;}
      expect(split.map(([,count])=>count)).toEqual(expectedRoutingSplits[site.id]);
    }
  });
  it('offers 21 characteristic pairs and derives a six-card pool for every pair',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      expect(characteristicOptions(site)).toHaveLength(7);
      expect(characteristicPairs(site)).toHaveLength(21);
      const signatures=new Set<string>();
      for(const pair of characteristicPairs(site)){
        const pool=deriveInitialProspectPool(site,pair);
        expect(pool).toHaveLength(6);
        expect(new Set(pool.map(card=>card.id)).size).toBe(6);
        signatures.add(pool.map(card=>card.id).sort().join('|'));
      }
      expect(signatures.size).toBeGreaterThan(1);
    }
  });
  it('reproduces the validated reference six for the demonstrated preferred characteristic pair',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      const actual=new Set(deriveInitialProspectPool(site,preferredCharacteristicSelection(site)).map(card=>card.id));
      expect(actual).toEqual(new Set(site.referenceInitialProspectPoolIds));
    }
  });
  it('enumerates all 81 prospect paths from every characteristic-derived pool',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      for(const pair of characteristicPairs(site)){
        const initial=deriveInitialProspectPool(site,pair);
        const pools=reachableFinalPools(site,initial);
        expect(pools).toHaveLength(81);
        expect(pools.every(pool=>pool.length===10&&new Set(pool.map(card=>card.id)).size===10)).toBe(true);
      }
    }
  });
  it('builds the reference final pool as profiled 6 + four reference choices = 10',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      expect(referenceInitialProspectPool(site)).toHaveLength(6);
      expect(referenceFinalPool(site)).toHaveLength(10);
    }
  });
  it('keeps Azure Shelf Deep Shelf capped at 80% for all 21 characteristic pairs and every prospect path',()=>{
    const site=seaWolfScenarios.find(s=>s.id==='azure')!.sites.find(s=>s.id==='azure-3')!;
    for(const pair of characteristicPairs(site)){
      const initial=deriveInitialProspectPool(site,pair);
      expect(Math.max(...reachableFinalPools(site,initial).map(pool=>maximumEffectiveness(site,pool)))).toBeLessThanOrEqual(80);
    }
    const treatment=referenceFinalPool(site).filter(card=>site.referenceTreatmentIds.includes(card.id));
    expect(treatmentEffectiveness(site,treatment)).toBe(80);
  });
  it('preserves the declared preferred-profile maximum for all nine sites',()=>{
    for(const scenario of seaWolfScenarios)for(const site of scenario.sites){
      const preferred=referenceInitialProspectPool(site);
      expect(Math.max(...reachableFinalPools(site,preferred).map(pool=>maximumEffectiveness(site,pool)))).toBe(site.maximumFeasibleEffectiveness);
      expect(combinations(referenceFinalPool(site),3).some(combo=>treatmentEffectiveness(site,combo)===site.maximumFeasibleEffectiveness)).toBe(true);
    }
  });
});
