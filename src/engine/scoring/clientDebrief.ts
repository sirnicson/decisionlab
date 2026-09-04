import type { Task1Score, Task2Score } from '../../types';

export function task1ClientDebrief(score:Task1Score){
  if(score.total<=50){
    return 'I’m not ready to take this recommendation forward yet. You’ve identified some of the right evidence, but the analysis doesn’t connect it clearly enough to the decision we need to make. I need you to revisit the key assumptions, make the comparison more rigorous, and then tell me—in one clear recommendation—what you think we should do and why.';
  }
  if(score.total<85){
    return 'This is moving in the right direction, but I would want a few corrections before I take it into the decision meeting. The core case is there; tighten the weaker analysis, make sure the written and visual evidence are consistent, and sharpen the recommendation so the decision and rationale are unmistakable.';
  }
  return 'I’m comfortable taking this recommendation into the decision meeting. The analysis is clear, the evidence supports the recommendation, and the written and visual outputs give me a defensible basis for action. Be ready to explain the key assumptions and trade-offs if challenged.';
}

export function task2ClientDebrief(score:Task2Score):string[]{
  if(score.total>=85){
    return [
      'You’ve given me a treatment strategy I can take forward. Across the three sites, the decisions are generally aligned with the environmental requirements, and the sequence preserves enough flexibility to build effective final treatments rather than optimising one choice in isolation.',
      'The final combinations are also consistent with what is realistically achievable at each site. Where the environment imposes a hard constraint, I am more interested in whether you reached the strongest feasible outcome than whether the headline number happens to be 100. I would be comfortable moving this programme into technical review, with the site assumptions and treatment performance monitored during implementation.'
    ];
  }
  if(score.total>50){
    return [
      'The overall direction is workable, but I would want several decisions revisited before we commit to the treatment programme. You identified useful microbes and produced some credible site outcomes, but the decision path is not yet consistent enough across profiling, routing, prospect selection and final treatment construction.',
      'Before I take this forward, I would check the weaker stages against the original site requirements and trace how those choices affected the options available later. The programme is not fundamentally off course, but I need a more defensible chain from site need to final treatment.'
    ];
  }
  return [
    'I’m not ready to take this treatment strategy forward yet. Too many of the earlier choices are carrying through into the final portfolios, which means I cannot be confident that the proposed treatments are responding reliably to the conditions at each site.',
    'I would reassess the site requirements first, then revisit the routing and prospect decisions before rebuilding the final treatments. The priority is to establish a clear connection between what each site needs and why each microbe is being retained, transferred or selected.'
  ];
}
