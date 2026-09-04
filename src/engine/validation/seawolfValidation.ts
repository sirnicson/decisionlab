import { allSiteCandidateUniverse, SEA_WOLF_TRAITS, seaWolfScenarios } from '../../data/seawolf/scenarios';
import type { Microbe, SeaWolfSite } from '../../types';
import {
  characteristicOptions,
  combinations,
  deriveInitialProspectPool,
  maximumEffectiveness,
  preferredCharacteristicSelection,
  referenceFinalPool,
  referenceInitialProspectPool,
  treatmentEffectiveness
} from '../scoring/seawolf';

export type ValidationIssue={siteId:string;message:string};

export function characteristicPairs(site:SeaWolfSite):[string,string][]{
  return combinations(characteristicOptions(site),2) as [string,string][];
}

/** Enumerate every 3^4 prospect-selection path from a supplied six-card profiled pool. */
export function reachableFinalPools(site:SeaWolfSite,initialPool:Microbe[]=referenceInitialProspectPool(site)):Microbe[][]{
  let pools:Microbe[][]=[initialPool];
  for(const round of site.prospectRounds){
    pools=pools.flatMap(pool=>round.candidates.map(candidate=>[...pool,candidate]));
  }
  return pools;
}

function inRange(value:number,[lo,hi]:[number,number]){return value>=lo&&value<=hi}
function positiveMatches(site:SeaWolfSite,card:Microbe){
  return [
    inRange(card.permeability,site.ranges.permeability),
    inRange(card.mobility,site.ranges.mobility),
    inRange(card.energy,site.ranges.energy),
    card.trait===site.desiredTrait
  ].filter(Boolean).length;
}
function routeFromAvailableInformation(site:SeaWolfSite,card:Microbe,hasNextSite:boolean):'current'|'next'|'return'{
  if(positiveMatches(site,card)>=2&&card.trait!==site.undesiredTrait)return 'current';
  if(hasNextSite&&site.nextSiteInsight){
    const insight=site.nextSiteInsight;
    const matches=insight.kind==='trait'
      ? card.trait===insight.label
      : insight.label==='Permeability'
        ? Boolean(insight.range&&inRange(card.permeability,insight.range))
        : insight.label==='Mobility'
          ? Boolean(insight.range&&inRange(card.mobility,insight.range))
          : Boolean(insight.range&&inRange(card.energy,insight.range));
    if(matches)return 'next';
  }
  return 'return';
}

export function validateSeaWolfData():ValidationIssue[]{
  const issues:ValidationIssue[]=[];
  for(const scenario of seaWolfScenarios){
    for(const [siteIndex,site] of scenario.sites.entries()){
      if(site.categorisationDeck.length!==10)issues.push({siteId:site.id,message:`Expected 10 categorisation microbes; found ${site.categorisationDeck.length}.`});
      if(site.initialPoolCandidateUniverse.length!==12)issues.push({siteId:site.id,message:`Expected 12 fixed profiling candidates; found ${site.initialPoolCandidateUniverse.length}.`});
      if(site.referenceInitialProspectPoolIds.length!==6)issues.push({siteId:site.id,message:`Expected 6 reference Initial Prospect Pool IDs; found ${site.referenceInitialProspectPoolIds.length}.`});
      if(site.prospectRounds.length!==4)issues.push({siteId:site.id,message:`Expected 4 prospect rounds; found ${site.prospectRounds.length}.`});
      for(const round of site.prospectRounds){
        if(round.candidates.length!==3)issues.push({siteId:site.id,message:`${round.id} must contain exactly 3 candidates.`});
        if(!round.candidates.some(candidate=>candidate.id===round.referenceChoiceId))issues.push({siteId:site.id,message:`${round.id} reference choice is not present in its candidate trio.`});
      }

      const allCards=[...site.categorisationDeck,...allSiteCandidateUniverse(site)];
      if(new Set(allCards.map(card=>card.id)).size!==allCards.length)issues.push({siteId:site.id,message:'Microbe IDs must be unique across routing, profiling and prospect decks.'});
      for(const card of allCards){
        if(![card.permeability,card.mobility,card.energy].every(v=>Number.isInteger(v)&&v>=1&&v<=10))issues.push({siteId:site.id,message:`${card.name} has an attribute outside the locked 1–10 integer range.`});
        if(!SEA_WOLF_TRAITS.includes(card.trait))issues.push({siteId:site.id,message:`${card.name} uses an unsupported trait: ${card.trait}.`});
      }

      // Validate the authored routing deck against the locked Current / Next / Return rule.
      const hasNextSite=siteIndex<scenario.sites.length-1;
      for(const card of site.categorisationDeck){
        if(!card.expectedAllocation){issues.push({siteId:site.id,message:`${card.name} has no reference routing outcome.`});continue;}
        const computed=routeFromAvailableInformation(site,card,hasNextSite);
        if(computed!==card.expectedAllocation)issues.push({siteId:site.id,message:`${card.name} reference route ${card.expectedAllocation} conflicts with locked routing rule (${computed}).`});
      }

      if(hasNextSite){
        const nextSite=scenario.sites[siteIndex+1];
        const hasLaterSite=siteIndex+1<scenario.sites.length-1;
        for(const card of site.categorisationDeck.filter(card=>card.expectedAllocation==='next')){
          const reassessed=routeFromAvailableInformation(nextSite,card,hasLaterSite);
          if(!['current','next','return'].includes(reassessed))issues.push({siteId:site.id,message:`${card.name} cannot be reassessed at ${nextSite.title}.`});
        }
      }

      // Characteristic selection must genuinely shape the six-card Initial Prospect Pool.
      const pairs=characteristicPairs(site);
      if(pairs.length!==21)issues.push({siteId:site.id,message:`Expected 21 two-characteristic combinations; found ${pairs.length}.`});
      const poolSignatures=new Set<string>();
      for(const pair of pairs){
        const profiled=deriveInitialProspectPool(site,pair);
        if(profiled.length!==6||new Set(profiled.map(card=>card.id)).size!==6)issues.push({siteId:site.id,message:`Characteristic pair ${pair.join(' + ')} did not derive six unique microbes.`});
        poolSignatures.add([...profiled.map(card=>card.id)].sort().join('|'));
        const reachable=reachableFinalPools(site,profiled);
        if(reachable.length!==81)issues.push({siteId:site.id,message:`Characteristic pair ${pair.join(' + ')} produced ${reachable.length} prospect paths instead of 81.`});
        for(const finalPool of reachable){
          if(finalPool.length!==10||new Set(finalPool.map(card=>card.id)).size!==10)issues.push({siteId:site.id,message:`Characteristic pair ${pair.join(' + ')} produced a non-unique final pool.`});
          const pathMax=maximumEffectiveness(site,finalPool);
          if(pathMax>site.maximumFeasibleEffectiveness)issues.push({siteId:site.id,message:`Characteristic pair ${pair.join(' + ')} creates a ${pathMax}% treatment, above the declared site maximum ${site.maximumFeasibleEffectiveness}%.`});
        }
      }
      if(poolSignatures.size<2)issues.push({siteId:site.id,message:'Characteristic selection does not materially change the Initial Prospect Pool.'});

      // The demonstrated A + Desired Trait strategy must reproduce the validated reference six.
      const preferred=deriveInitialProspectPool(site,preferredCharacteristicSelection(site));
      const preferredIds=new Set(preferred.map(card=>card.id));
      if(site.referenceInitialProspectPoolIds.some(id=>!preferredIds.has(id)))issues.push({siteId:site.id,message:'Preferred characteristic pair no longer reproduces the validated reference Initial Prospect Pool.'});

      const refPool=referenceFinalPool(site);
      if(refPool.length!==10||new Set(refPool.map(card=>card.id)).size!==10)issues.push({siteId:site.id,message:`Reference final pool must contain exactly 10 unique microbes; found ${refPool.length}.`});
      const preferredReachable=reachableFinalPools(site,referenceInitialProspectPool(site));
      const preferredMaximum=Math.max(...preferredReachable.map(pool=>maximumEffectiveness(site,pool)));
      if(preferredMaximum!==site.maximumFeasibleEffectiveness)issues.push({siteId:site.id,message:`Preferred characteristic profile reaches ${preferredMaximum}%, expected ${site.maximumFeasibleEffectiveness}%.`});

      const universe=allSiteCandidateUniverse(site);
      const computedUniverseMax=maximumEffectiveness(site,universe);
      if(computedUniverseMax>site.maximumFeasibleEffectiveness)issues.push({siteId:site.id,message:`Candidate universe permits ${computedUniverseMax}%, above the declared site maximum ${site.maximumFeasibleEffectiveness}%.`});
      const refMax=maximumEffectiveness(site,refPool);
      if(refMax!==site.maximumFeasibleEffectiveness)issues.push({siteId:site.id,message:`Reference final pool maximum ${refMax}% does not match declared ${site.maximumFeasibleEffectiveness}%.`});
      const maxCount=combinations(refPool,3).filter(c=>treatmentEffectiveness(site,c)===refMax).length;
      if(maxCount!==site.referenceMaximumCount)issues.push({siteId:site.id,message:`Expected ${site.referenceMaximumCount} maximum-scoring reference-pool trios; found ${maxCount}.`});
      const referenceTreatment=refPool.filter(card=>site.referenceTreatmentIds.includes(card.id));
      if(referenceTreatment.length!==3)issues.push({siteId:site.id,message:'Reference treatment must resolve to exactly three cards.'});
      else if(treatmentEffectiveness(site,referenceTreatment)!==site.maximumFeasibleEffectiveness)issues.push({siteId:site.id,message:'Reference treatment does not reach the declared maximum feasible effectiveness.'});
    }
  }
  return issues;
}
