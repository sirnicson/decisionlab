import type { Judgement, Microbe, ProspectCandidate, Range, SeaWolfSite } from '../../types';

export const judgementScore: Record<Judgement, number> = {
  strong: 100,
  defensible: 65,
  weak: 20
};

const inRange = (value:number,[lo,hi]:Range) => value >= lo && value <= hi;

export function treatmentEffectiveness(site: SeaWolfSite, microbes: Microbe[]) {
  if (microbes.length !== 3) return 0;
  const avg = {
    permeability: microbes.reduce((s,m)=>s+m.permeability,0)/3,
    mobility: microbes.reduce((s,m)=>s+m.mobility,0)/3,
    energy: microbes.reduce((s,m)=>s+m.energy,0)/3
  };
  let score = 100;
  if (!inRange(avg.permeability, site.ranges.permeability)) score -= 20;
  if (!inRange(avg.mobility, site.ranges.mobility)) score -= 20;
  if (!inRange(avg.energy, site.ranges.energy)) score -= 20;
  const traits = microbes.map((m)=>m.trait);
  if (!traits.includes(site.desiredTrait)) score -= 20;
  if (traits.includes(site.undesiredTrait)) score -= 20;
  return Math.max(0, score);
}

export function combinations<T>(items:T[], size:number):T[][] {
  const out:T[][]=[];
  const walk=(start:number, chosen:T[])=>{
    if(chosen.length===size){out.push([...chosen]);return;}
    for(let i=start;i<items.length;i++) walk(i+1,[...chosen,items[i]]);
  };
  walk(0,[]);
  return out;
}

export function maximumEffectiveness(site: SeaWolfSite, universe: Microbe[]) {
  if (universe.length < 3) return 0;
  return Math.max(...combinations(universe,3).map((c)=>treatmentEffectiveness(site,c)));
}

export function normalisedSitePerformance(submitted:number, maximumFeasible:number) {
  if (maximumFeasible <= 0) return 0;
  return Math.min(100, Math.round((submitted / maximumFeasible) * 100));
}

export function characteristicOptions(site:SeaWolfSite):string[]{
  return [
    `Permeability ${site.ranges.permeability.join('–')}`,
    `Mobility ${site.ranges.mobility.join('–')}`,
    `Energy ${site.ranges.energy.join('–')}`,
    'Heat Resistant','Aerobic','Phosphorus Removal','Light Sensitive'
  ];
}

export function preferredCharacteristicSelection(site:SeaWolfSite):[string,string]{
  return [
    `${site.preferredFilterStrategy.attribute} ${site.preferredFilterStrategy.range.join('–')}`,
    site.preferredFilterStrategy.trait
  ];
}

function characteristicMatch(site:SeaWolfSite,microbe:Microbe,key:string):number{
  if(key.startsWith('Permeability ')) return inRange(microbe.permeability,site.ranges.permeability)?100:0;
  if(key.startsWith('Mobility ')) return inRange(microbe.mobility,site.ranges.mobility)?100:0;
  if(key.startsWith('Energy ')) return inRange(microbe.energy,site.ranges.energy)?100:0;
  return microbe.trait===key?100:0;
}

function positiveSiteMatches(site:SeaWolfSite,microbe:Microbe):number{
  return [
    inRange(microbe.permeability,site.ranges.permeability),
    inRange(microbe.mobility,site.ranges.mobility),
    inRange(microbe.energy,site.ranges.energy),
    microbe.trait===site.desiredTrait
  ].filter(Boolean).length;
}

/**
 * Deterministically derives the six-microbe Initial Prospect Pool from the
 * two characteristics selected by the learner. The site owns a fixed 12-card
 * candidate universe. Selected characteristics dominate the ranking; the
 * six authored reference cards receive only a small tie-break preference so
 * the demonstrated A + Desired Trait selection reproduces the validated V1.2
 * reference pool while alternative selections materially change the pool.
 */
export function deriveInitialProspectPool(site:SeaWolfSite,selectedCharacteristics:string[]):Microbe[]{
  const selected=selectedCharacteristics.slice(0,2);
  const referenceIds=new Set(site.referenceInitialProspectPoolIds);
  return site.initialPoolCandidateUniverse
    .map((microbe,index)=>({
      microbe,
      index,
      score:selected.reduce((sum,key)=>sum+characteristicMatch(site,microbe,key),0)
        +(referenceIds.has(microbe.id)?10:0)
        +positiveSiteMatches(site,microbe)*0.1
    }))
    .sort((a,b)=>b.score-a.score||a.index-b.index)
    .slice(0,6)
    .map(({microbe})=>microbe);
}

export function isPreferredCharacteristicSelection(site:SeaWolfSite,selectedCharacteristics:string[]):boolean{
  const preferred=new Set(preferredCharacteristicSelection(site));
  return selectedCharacteristics.length===2&&selectedCharacteristics.every(key=>preferred.has(key));
}

type ProspectEvaluation={
  candidate:ProspectCandidate;
  judgement:Judgement;
  bestReachable:number;
  futurePathCount:number;
  maxScoringTreatmentCount:number;
  reason:string;
};

function futureProspectPaths(site:SeaWolfSite,fromRoundIndex:number):Microbe[][]{
  const remaining=site.prospectRounds.slice(fromRoundIndex+1);
  let paths:Microbe[][]=[[]];
  for(const round of remaining) paths=paths.flatMap(path=>round.candidates.map(candidate=>[...path,candidate]));
  return paths;
}

/**
 * Context-sensitive prospect evaluation. Unlike the old fixed judgement on
 * the card, this looks at the learner's actual profiled pool and all remaining
 * prospect rounds. That keeps feedback valid when Characteristic selection
 * changes the six-card starting pool.
 */
export function evaluateProspectRound(site:SeaWolfSite,currentPool:Microbe[],roundIndex:number):ProspectEvaluation[]{
  const round=site.prospectRounds[roundIndex];
  if(!round) return [];
  const futurePaths=futureProspectPaths(site,roundIndex);
  const desiredAlready=currentPool.filter(card=>card.trait===site.desiredTrait).length;
  const desiredStillScarce=desiredAlready<2;
  const allCandidatesUndesired=round.candidates.every(candidate=>candidate.trait===site.undesiredTrait);
  const attributeFit=(candidate:Microbe)=>[
    inRange(candidate.permeability,site.ranges.permeability),
    inRange(candidate.mobility,site.ranges.mobility),
    inRange(candidate.energy,site.ranges.energy)
  ].filter(Boolean).length;

  const raw=round.candidates.map(candidate=>{
    let bestReachable=0;
    let futurePathCount=0;
    let maxScoringTreatmentCount=0;
    for(const path of futurePaths){
      const finalPool=[...currentPool,candidate,...path];
      const pathBest=maximumEffectiveness(site,finalPool);
      const treatmentCount=combinations(finalPool,3).filter(combo=>treatmentEffectiveness(site,combo)===pathBest).length;
      if(pathBest>bestReachable){
        bestReachable=pathBest;
        futurePathCount=1;
        maxScoringTreatmentCount=treatmentCount;
      }else if(pathBest===bestReachable){
        futurePathCount+=1;
        maxScoringTreatmentCount+=treatmentCount;
      }
    }
    return {
      candidate,
      bestReachable,
      futurePathCount,
      maxScoringTreatmentCount,
      safe:allCandidatesUndesired||candidate.trait!==site.undesiredTrait,
      attributeFit:attributeFit(candidate),
      desiredContribution:desiredStillScarce&&candidate.trait===site.desiredTrait?1:0
    };
  });

  const tuple=(item:typeof raw[number])=>[
    item.safe?1:0,
    item.bestReachable,
    item.attributeFit,
    item.desiredContribution,
    item.maxScoringTreatmentCount
  ];
  const compareTuple=(a:number[],b:number[])=>{
    for(let i=0;i<a.length;i++)if(a[i]!==b[i])return a[i]-b[i];
    return 0;
  };
  const best=[...raw].sort((a,b)=>compareTuple(tuple(b),tuple(a)))[0];

  return raw.map(item=>{
    const isTop=compareTuple(tuple(item),tuple(best))===0;
    let judgement:Judgement;
    if(isTop) judgement='strong';
    else if(!item.safe) judgement='weak';
    else if(item.bestReachable===best.bestReachable&&item.attributeFit>=Math.max(0,best.attributeFit-1)) judgement='defensible';
    else judgement='weak';

    const safetyText=!allCandidatesUndesired&&item.candidate.trait===site.undesiredTrait
      ? `It carries the site's undesired trait, which makes it costly unless no safer option exists.`
      : allCandidatesUndesired
        ? `All three candidates carry the undesired trait, so this round is a least-worst allocation.`
        : `It avoids the site's undesired trait.`;
    const desiredText=desiredStillScarce
      ? (item.candidate.trait===site.desiredTrait?` It also adds the desired trait while that trait is still scarce in the pool.`:'')
      : ` The desired trait is already represented in the pool, so another copy is less valuable than useful attribute balance.`;
    const reason=judgement==='strong'
      ? `${safetyText} It matches ${item.attributeFit}/3 target attributes and preserves the strongest downstream treatment options from the pool you currently hold.${desiredText}`
      : judgement==='defensible'
        ? `${safetyText} It can still preserve a ${item.bestReachable}% treatment path, but the strongest candidate offers a better combination of attribute fit and portfolio optionality.${desiredText}`
        : `${safetyText} From the pool you currently hold, this option is weaker on immediate fit and/or downstream treatment optionality than the strongest candidate in the round.${desiredText}`;
    return {...item,judgement,reason};
  });
}

export function referenceInitialProspectPool(site:SeaWolfSite):Microbe[]{
  return deriveInitialProspectPool(site,preferredCharacteristicSelection(site));
}

export function referenceFinalPool(site:SeaWolfSite):Microbe[]{
  return [
    ...referenceInitialProspectPool(site),
    ...site.prospectRounds.map(round=>round.candidates.find(candidate=>candidate.id===round.referenceChoiceId)!).filter(Boolean)
  ];
}

/**
 * A profiling lens is accepted when it is the authored reference pair or when
 * the six-card pool it generates already preserves the site's maximum feasible
 * treatment outcome. This keeps the reference strategy privileged without
 * forcing one memorised pair when another lens is genuinely decision-equivalent.
 */
export function isAcceptedCharacteristicSelection(site:SeaWolfSite,selectedCharacteristics:string[]):boolean{
  if(selectedCharacteristics.length!==2)return false;
  if(isPreferredCharacteristicSelection(site,selectedCharacteristics))return true;
  const pool=deriveInitialProspectPool(site,selectedCharacteristics);
  return maximumEffectiveness(site,pool)>=site.maximumFeasibleEffectiveness;
}
