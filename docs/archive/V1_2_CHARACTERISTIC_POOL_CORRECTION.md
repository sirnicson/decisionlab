# V1.2 Characteristic-Profiled Initial Pool Correction

This patch closes the remaining Sea Wolf implementation gap identified after the first integrated V1.2 build.

## Corrected behaviour

The Characteristics stage is now causally connected to treatment building:

`12 fixed profiling candidates → select any 2 of 7 characteristics → deterministic ranking → Initial Prospect Pool of 6`

The seven characteristics are the site's three target attributes plus the locked four-trait vocabulary. There are 21 possible two-characteristic pairs per site.

The 10-card Categorisation deck remains completely separate and is never used to populate the Initial Prospect Pool.

## Reference profile

The demonstrated Learning Mode strategy remains:

`one strategically discriminating Attribute + Desired Trait`

For every site, that preferred profile reproduces the previously validated reference six. Alternative characteristic pairs generate different six-card pools.

## Prospect Selection correction

Because the starting six can now change, Prospect Selection can no longer rely on static candidate judgements. Learning Mode now evaluates each 1-of-3 candidate against:

- the learner's actual current pool;
- undesired-trait exposure;
- current attribute fit;
- whether the desired trait is still scarce;
- all remaining prospect rounds;
- downstream treatment optionality.

The recorded judgement is therefore contextual to the pool the learner actually created.

## Validation

For every one of the nine Sea Wolf sites the validator checks all 21 characteristic pairs. Each pair must derive six unique microbes and then support all 81 prospect-selection paths, giving 1,701 prospect paths per site before treatment-combination enumeration.

Azure Shelf Site 3 remains capped at 80% under every characteristic pair and every prospect path.

## Persistence compatibility

The active-session and history storage keys were bumped for this patch so an in-progress attempt created under the earlier static-pool build is not silently resumed under the corrected characteristic-profiled logic.
