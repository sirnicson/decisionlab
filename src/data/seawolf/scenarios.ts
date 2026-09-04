import type { Microbe, SeaWolfScenario, SeaWolfSite } from '../../types';

export const SEA_WOLF_TRAITS = ['Heat Resistant','Aerobic','Phosphorus Removal','Light Sensitive'] as const;

export const seaWolfScenarios: SeaWolfScenario[] = [
  {
    "id": "cinder",
    "title": "Cinder Bay",
    "theme": "Industrial coastal recovery",
    "transferFocus": "Distinguish routing from treatment building and learn that individual fit is not trio fit.",
    "clientBrief": "I am coordinating a treatment programme across three contaminated coastal zones in Cinder Bay. I need a recommendation for each site, but the sites are connected: a microbe that looks useful now may be more valuable later, so I want you to protect the programme as a whole rather than optimise one site in isolation.",
    "assignment": "I want you to work site by site. First, choose two characteristics to shape the six-microbe treatment pool. Separately, route ten microbes between the current site, the next site where available, or return. I will keep the full current-site requirements and only limited next-site information visible. Then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so use the information and options available before you commit.",
    "researchBasisIds": [
      "SCI-MIC-01",
      "SCI-MIC-02",
      "SCI-MIC-03",
      "SCI-MIC-04",
      "SCI-MIC-05",
      "SCI-MIC-06",
      "SCI-MIC-07"
    ],
    "sites": [
      {
        "id": "cinder-1",
        "title": "Refinery Shore",
        "description": "Site 1 of three in Cinder Bay. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            6,
            8
          ],
          "mobility": [
            7,
            9
          ],
          "energy": [
            3,
            5
          ]
        },
        "desiredTrait": "Heat Resistant",
        "undesiredTrait": "Aerobic",
        "nextSiteInsight": {
          "kind": "attribute",
          "label": "Energy",
          "range": [
            2,
            4
          ]
        },
        "preferredFilterStrategy": {
          "attribute": "Mobility",
          "range": [
            7,
            9
          ],
          "trait": "Heat Resistant"
        },
        "categorisationDeck": [
          {
            "name": "Theloria",
            "permeability": 6,
            "mobility": 7,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "cinder1-route-theloria",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Marivex",
            "permeability": 8,
            "mobility": 9,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder1-route-marivex",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Cindera",
            "permeability": 6,
            "mobility": 6,
            "energy": 3,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "cinder1-route-cindera",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermessa",
            "permeability": 5,
            "mobility": 7,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "cinder1-route-thermessa",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Pelagor",
            "permeability": 8,
            "mobility": 7,
            "energy": 2,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder1-route-pelagor",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aervallis",
            "permeability": 5,
            "mobility": 6,
            "energy": 2,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "cinder1-route-aervallis",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phosyne",
            "permeability": 5,
            "mobility": 6,
            "energy": 2,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "next",
            "id": "cinder1-route-phosyne",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lucentia",
            "permeability": 5,
            "mobility": 7,
            "energy": 1,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "cinder1-route-lucentia",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Nerova",
            "permeability": 5,
            "mobility": 6,
            "energy": 1,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "cinder1-route-nerova",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerocline",
            "permeability": 8,
            "mobility": 9,
            "energy": 1,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "cinder1-route-aerocline",
            "allocationReason": "Reference route: Return. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "cinder1-round-1",
            "candidates": [
              {
                "name": "Acinera",
                "permeability": 5,
                "mobility": 7,
                "energy": 1,
                "trait": "Aerobic",
                "id": "cinder1-r1-acinera",
                "judgement": "strong",
                "reason": "All three carry the undesired trait; choose **Acinera** as the least-worst option because Mobility is the only useful in-range contribution."
              },
              {
                "name": "Bacoryx",
                "permeability": 2,
                "mobility": 2,
                "energy": 8,
                "trait": "Aerobic",
                "id": "cinder1-r1-bacoryx",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 0/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Celeris",
                "permeability": 10,
                "mobility": 3,
                "energy": 9,
                "trait": "Aerobic",
                "id": "cinder1-r1-celeris",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 0/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "cinder1-r1-acinera"
          },
          {
            "id": "cinder1-round-2",
            "candidates": [
              {
                "name": "Parolia",
                "permeability": 4,
                "mobility": 8,
                "energy": 1,
                "trait": "Phosphorus Removal",
                "id": "cinder1-r2-parolia",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Sedara",
                "permeability": 1,
                "mobility": 10,
                "energy": 4,
                "trait": "Heat Resistant",
                "id": "cinder1-r2-sedara",
                "judgement": "strong",
                "reason": "Choose **Sedara**: it avoids the undesired trait, carries the desired trait and contributes a usable Energy value."
              },
              {
                "name": "Noceria",
                "permeability": 10,
                "mobility": 10,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "cinder1-r2-noceria",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder1-r2-sedara"
          },
          {
            "id": "cinder1-round-3",
            "candidates": [
              {
                "name": "Aconia",
                "permeability": 5,
                "mobility": 7,
                "energy": 1,
                "trait": "Phosphorus Removal",
                "id": "cinder1-r3-aconia",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Shigora",
                "permeability": 6,
                "mobility": 9,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder1-r3-shigora",
                "judgement": "strong",
                "reason": "Choose **Shigora**: all three attributes fit the site even though its trait is non-binding."
              },
              {
                "name": "Synera",
                "permeability": 3,
                "mobility": 10,
                "energy": 10,
                "trait": "Heat Resistant",
                "id": "cinder1-r3-synera",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder1-r3-shigora"
          },
          {
            "id": "cinder1-round-4",
            "candidates": [
              {
                "name": "Alteria",
                "permeability": 6,
                "mobility": 10,
                "energy": 2,
                "trait": "Light Sensitive",
                "id": "cinder1-r4-alteria",
                "judgement": "strong",
                "reason": "All three are individually weak/tied; choose **Alteria** because high Mobility improves the existing pool's ability to hit the final average."
              },
              {
                "name": "Marinox",
                "permeability": 10,
                "mobility": 7,
                "energy": 6,
                "trait": "Light Sensitive",
                "id": "cinder1-r4-marinox",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Ioneta",
                "permeability": 9,
                "mobility": 3,
                "energy": 3,
                "trait": "Light Sensitive",
                "id": "cinder1-r4-ioneta",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder1-r4-alteria"
          }
        ],
        "referenceTreatmentIds": [
          "cinder1-pool-abyssia",
          "cinder1-r3-shigora",
          "cinder1-r4-alteria"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 24,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Abyssia",
            "permeability": 6,
            "mobility": 7,
            "energy": 2,
            "trait": "Heat Resistant",
            "id": "cinder1-pool-abyssia"
          },
          {
            "name": "Thermora",
            "permeability": 8,
            "mobility": 9,
            "energy": 4,
            "trait": "Heat Resistant",
            "id": "cinder1-pool-thermora"
          },
          {
            "name": "Nerella",
            "permeability": 4,
            "mobility": 8,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "id": "cinder1-pool-nerella"
          },
          {
            "name": "Pelagia",
            "permeability": 9,
            "mobility": 4,
            "energy": 6,
            "trait": "Light Sensitive",
            "id": "cinder1-pool-pelagia"
          },
          {
            "name": "Luminex",
            "permeability": 7,
            "mobility": 6,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "cinder1-pool-luminex"
          },
          {
            "name": "Vectria",
            "permeability": 8,
            "mobility": 7,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "cinder1-pool-vectria"
          },
          {
            "id": "cinder-1-profile-alt-1",
            "name": "Novarella",
            "permeability": 7,
            "mobility": 6,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "cinder-1-profile-alt-2",
            "name": "Pelonix",
            "permeability": 5,
            "mobility": 5,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "cinder-1-profile-alt-3",
            "name": "Ceryphora",
            "permeability": 7,
            "mobility": 6,
            "energy": 4,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "cinder-1-profile-alt-4",
            "name": "Valoris",
            "permeability": 5,
            "mobility": 5,
            "energy": 4,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "cinder-1-profile-alt-5",
            "name": "Oceanella",
            "permeability": 7,
            "mobility": 6,
            "energy": 4,
            "trait": "Light Sensitive"
          },
          {
            "id": "cinder-1-profile-alt-6",
            "name": "Rivexis",
            "permeability": 5,
            "mobility": 5,
            "energy": 4,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "cinder1-pool-abyssia",
          "cinder1-pool-thermora",
          "cinder1-pool-nerella",
          "cinder1-pool-pelagia",
          "cinder1-pool-luminex",
          "cinder1-pool-vectria"
        ]
      },
      {
        "id": "cinder-2",
        "title": "Inner Harbour",
        "description": "Site 2 of three in Cinder Bay. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            2,
            4
          ],
          "mobility": [
            3,
            5
          ],
          "energy": [
            2,
            4
          ]
        },
        "desiredTrait": "Aerobic",
        "undesiredTrait": "Heat Resistant",
        "nextSiteInsight": {
          "kind": "trait",
          "label": "Phosphorus Removal"
        },
        "preferredFilterStrategy": {
          "attribute": "Permeability",
          "range": [
            2,
            4
          ],
          "trait": "Aerobic"
        },
        "categorisationDeck": [
          {
            "name": "Brinella",
            "permeability": 2,
            "mobility": 3,
            "energy": 2,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "cinder2-route-brinella",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aqualon",
            "permeability": 4,
            "mobility": 5,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder2-route-aqualon",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Oxymara",
            "permeability": 2,
            "mobility": 2,
            "energy": 2,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "cinder2-route-oxymara",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aeriella",
            "permeability": 1,
            "mobility": 3,
            "energy": 1,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "cinder2-route-aeriella",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Coralia",
            "permeability": 4,
            "mobility": 3,
            "energy": 1,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder2-route-coralia",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phosena",
            "permeability": 3,
            "mobility": 8,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "next",
            "id": "cinder2-route-phosena",
            "allocationReason": "Reference route: Next. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phosrix",
            "permeability": 1,
            "mobility": 2,
            "energy": 1,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "next",
            "id": "cinder2-route-phosrix",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Luminor",
            "permeability": 1,
            "mobility": 3,
            "energy": 1,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "cinder2-route-luminor",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Neraxis",
            "permeability": 1,
            "mobility": 2,
            "energy": 1,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "cinder2-route-neraxis",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermex",
            "permeability": 4,
            "mobility": 5,
            "energy": 4,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "cinder2-route-thermex",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "cinder2-round-1",
            "candidates": [
              {
                "name": "Brinia",
                "permeability": 4,
                "mobility": 4,
                "energy": 2,
                "trait": "Aerobic",
                "id": "cinder2-r1-brinia",
                "judgement": "strong",
                "reason": "Choose **Brinia** for strong low-range fit plus the desired Aerobic trait."
              },
              {
                "name": "Corvex",
                "permeability": 5,
                "mobility": 6,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "cinder2-r1-corvex",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Therion",
                "permeability": 2,
                "mobility": 3,
                "energy": 4,
                "trait": "Heat Resistant",
                "id": "cinder2-r1-therion",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "cinder2-r1-brinia"
          },
          {
            "id": "cinder2-round-2",
            "candidates": [
              {
                "name": "Coralia",
                "permeability": 2,
                "mobility": 3,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder2-r2-coralia",
                "judgement": "strong",
                "reason": "Choose **Coralia** to add low Permeability/Mobility coverage without the undesired trait."
              },
              {
                "name": "Aervia",
                "permeability": 5,
                "mobility": 4,
                "energy": 3,
                "trait": "Aerobic",
                "id": "cinder2-r2-aervia",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Luminor",
                "permeability": 3,
                "mobility": 6,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "cinder2-r2-luminor",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder2-r2-coralia"
          },
          {
            "id": "cinder2-round-3",
            "candidates": [
              {
                "name": "Peloria",
                "permeability": 5,
                "mobility": 4,
                "energy": 3,
                "trait": "Light Sensitive",
                "id": "cinder2-r3-peloria",
                "judgement": "strong",
                "reason": "Choose **Peloria** as the best attribute-balancing option among the three."
              },
              {
                "name": "Therella",
                "permeability": 4,
                "mobility": 5,
                "energy": 4,
                "trait": "Heat Resistant",
                "id": "cinder2-r3-therella",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Phosia",
                "permeability": 1,
                "mobility": 3,
                "energy": 2,
                "trait": "Phosphorus Removal",
                "id": "cinder2-r3-phosia",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "cinder2-r3-peloria"
          },
          {
            "id": "cinder2-round-4",
            "candidates": [
              {
                "name": "Ventara",
                "permeability": 3,
                "mobility": 6,
                "energy": 2,
                "trait": "Aerobic",
                "id": "cinder2-r4-ventara",
                "judgement": "strong",
                "reason": "Choose **Ventara** to add Aerobic coverage and low Permeability/Energy optionality."
              },
              {
                "name": "Marevia",
                "permeability": 4,
                "mobility": 2,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "cinder2-r4-marevia",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Neraxis",
                "permeability": 6,
                "mobility": 5,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder2-r4-neraxis",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder2-r4-ventara"
          }
        ],
        "referenceTreatmentIds": [
          "cinder2-pool-aerona",
          "cinder2-pool-esturia",
          "cinder2-pool-spurana"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 52,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Aerona",
            "permeability": 3,
            "mobility": 4,
            "energy": 4,
            "trait": "Aerobic",
            "id": "cinder2-pool-aerona"
          },
          {
            "name": "Esturia",
            "permeability": 4,
            "mobility": 5,
            "energy": 3,
            "trait": "Phosphorus Removal",
            "id": "cinder2-pool-esturia"
          },
          {
            "name": "Spurana",
            "permeability": 2,
            "mobility": 5,
            "energy": 3,
            "trait": "Light Sensitive",
            "id": "cinder2-pool-spurana"
          },
          {
            "name": "Thermara",
            "permeability": 3,
            "mobility": 4,
            "energy": 3,
            "trait": "Heat Resistant",
            "id": "cinder2-pool-thermara"
          },
          {
            "name": "Luminia",
            "permeability": 5,
            "mobility": 3,
            "energy": 2,
            "trait": "Light Sensitive",
            "id": "cinder2-pool-luminia"
          },
          {
            "name": "Phorena",
            "permeability": 2,
            "mobility": 6,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "id": "cinder2-pool-phorena"
          },
          {
            "id": "cinder-2-profile-alt-1",
            "name": "Morvella",
            "permeability": 5,
            "mobility": 4,
            "energy": 3,
            "trait": "Heat Resistant"
          },
          {
            "id": "cinder-2-profile-alt-2",
            "name": "Deltaris",
            "permeability": 6,
            "mobility": 2,
            "energy": 3,
            "trait": "Heat Resistant"
          },
          {
            "id": "cinder-2-profile-alt-3",
            "name": "Ceronia",
            "permeability": 5,
            "mobility": 4,
            "energy": 3,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "cinder-2-profile-alt-4",
            "name": "Valluma",
            "permeability": 6,
            "mobility": 2,
            "energy": 3,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "cinder-2-profile-alt-5",
            "name": "Ocenrix",
            "permeability": 5,
            "mobility": 4,
            "energy": 3,
            "trait": "Light Sensitive"
          },
          {
            "id": "cinder-2-profile-alt-6",
            "name": "Rivena",
            "permeability": 6,
            "mobility": 2,
            "energy": 3,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "cinder2-pool-aerona",
          "cinder2-pool-esturia",
          "cinder2-pool-spurana",
          "cinder2-pool-thermara",
          "cinder2-pool-luminia",
          "cinder2-pool-phorena"
        ]
      },
      {
        "id": "cinder-3",
        "title": "Outer Breakwater",
        "description": "Site 3 of three in Cinder Bay. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "This is the final site, so there is no further transfer route. I need you to close the programme with the strongest feasible treatment you can assemble from the options you have preserved.",
        "ranges": {
          "permeability": [
            3,
            5
          ],
          "mobility": [
            8,
            10
          ],
          "energy": [
            5,
            7
          ]
        },
        "desiredTrait": "Phosphorus Removal",
        "undesiredTrait": "Heat Resistant",
        "preferredFilterStrategy": {
          "attribute": "Mobility",
          "range": [
            8,
            10
          ],
          "trait": "Phosphorus Removal"
        },
        "categorisationDeck": [
          {
            "name": "Phosara",
            "permeability": 3,
            "mobility": 8,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder3-route-phosara",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Bathyra",
            "permeability": 5,
            "mobility": 10,
            "energy": 7,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "cinder3-route-bathyra",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Mobilium",
            "permeability": 3,
            "mobility": 7,
            "energy": 5,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "cinder3-route-mobilium",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Nerevia",
            "permeability": 2,
            "mobility": 8,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "cinder3-route-nerevia",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Peliona",
            "permeability": 5,
            "mobility": 8,
            "energy": 4,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "cinder3-route-peliona",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermella",
            "permeability": 2,
            "mobility": 7,
            "energy": 4,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "cinder3-route-thermella",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerolin",
            "permeability": 2,
            "mobility": 7,
            "energy": 4,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "cinder3-route-aerolin",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lucora",
            "permeability": 2,
            "mobility": 8,
            "energy": 4,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "cinder3-route-lucora",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Talassa",
            "permeability": 2,
            "mobility": 7,
            "energy": 4,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "cinder3-route-talassa",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermora",
            "permeability": 5,
            "mobility": 10,
            "energy": 7,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "cinder3-route-thermora",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "cinder3-round-1",
            "candidates": [
              {
                "name": "Yajorix",
                "permeability": 9,
                "mobility": 7,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r1-yajorix",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Iaesora",
                "permeability": 2,
                "mobility": 9,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r1-iaesora",
                "judgement": "strong",
                "reason": "Choose **Iaesora** because it contributes two matching attributes plus the desired trait."
              },
              {
                "name": "Portella",
                "permeability": 4,
                "mobility": 6,
                "energy": 8,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r1-portella",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "cinder3-r1-iaesora"
          },
          {
            "id": "cinder3-round-2",
            "candidates": [
              {
                "name": "Plotogen",
                "permeability": 7,
                "mobility": 8,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "cinder3-r2-plotogen",
                "judgement": "strong",
                "reason": "The desired trait is already well represented; choose **Plotogen** for the stronger Mobility/Energy contribution."
              },
              {
                "name": "Phosmera",
                "permeability": 6,
                "mobility": 7,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r2-phosmera",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Aerovia",
                "permeability": 4,
                "mobility": 7,
                "energy": 8,
                "trait": "Aerobic",
                "id": "cinder3-r2-aerovia",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder3-r2-plotogen"
          },
          {
            "id": "cinder3-round-3",
            "candidates": [
              {
                "name": "Panora",
                "permeability": 6,
                "mobility": 8,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r3-panora",
                "judgement": "strong",
                "reason": "Choose **Panora** for two matching attributes plus desired-trait redundancy without the undesired trait."
              },
              {
                "name": "Conflora",
                "permeability": 2,
                "mobility": 8,
                "energy": 10,
                "trait": "Light Sensitive",
                "id": "cinder3-r3-conflora",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Kolsona",
                "permeability": 2,
                "mobility": 10,
                "energy": 5,
                "trait": "Heat Resistant",
                "id": "cinder3-r3-kolsona",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 2/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "cinder3-r3-panora"
          },
          {
            "id": "cinder3-round-4",
            "candidates": [
              {
                "name": "Mesopaea",
                "permeability": 7,
                "mobility": 10,
                "energy": 7,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r4-mesopaea",
                "judgement": "strong",
                "reason": "Choose **Mesopaea** because Mobility and Energy fit and it preserves several 100% trio options."
              },
              {
                "name": "Shewanix",
                "permeability": 6,
                "mobility": 7,
                "energy": 1,
                "trait": "Phosphorus Removal",
                "id": "cinder3-r4-shewanix",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              },
              {
                "name": "Aegiria",
                "permeability": 4,
                "mobility": 5,
                "energy": 8,
                "trait": "Aerobic",
                "id": "cinder3-r4-aegiria",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "cinder3-r4-mesopaea"
          }
        ],
        "referenceTreatmentIds": [
          "cinder3-pool-phosera",
          "cinder3-pool-iasona",
          "cinder3-r2-plotogen"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 52,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Phosera",
            "permeability": 4,
            "mobility": 9,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "cinder3-pool-phosera"
          },
          {
            "name": "Iasona",
            "permeability": 2,
            "mobility": 8,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "cinder3-pool-iasona"
          },
          {
            "name": "Plotara",
            "permeability": 5,
            "mobility": 8,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "cinder3-pool-plotara"
          },
          {
            "name": "Crovena",
            "permeability": 3,
            "mobility": 10,
            "energy": 7,
            "trait": "Aerobic",
            "id": "cinder3-pool-crovena"
          },
          {
            "name": "Thermia",
            "permeability": 4,
            "mobility": 9,
            "energy": 6,
            "trait": "Heat Resistant",
            "id": "cinder3-pool-thermia"
          },
          {
            "name": "Luminara",
            "permeability": 6,
            "mobility": 7,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "cinder3-pool-luminara"
          },
          {
            "id": "cinder-3-profile-alt-1",
            "name": "Norelia",
            "permeability": 4,
            "mobility": 7,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "cinder-3-profile-alt-2",
            "name": "Peladix",
            "permeability": 2,
            "mobility": 6,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "cinder-3-profile-alt-3",
            "name": "Cerynia",
            "permeability": 4,
            "mobility": 7,
            "energy": 6,
            "trait": "Aerobic"
          },
          {
            "id": "cinder-3-profile-alt-4",
            "name": "Valeron",
            "permeability": 2,
            "mobility": 6,
            "energy": 6,
            "trait": "Aerobic"
          },
          {
            "id": "cinder-3-profile-alt-5",
            "name": "Oceris",
            "permeability": 4,
            "mobility": 7,
            "energy": 6,
            "trait": "Light Sensitive"
          },
          {
            "id": "cinder-3-profile-alt-6",
            "name": "Rivella",
            "permeability": 2,
            "mobility": 6,
            "energy": 6,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "cinder3-pool-phosera",
          "cinder3-pool-iasona",
          "cinder3-pool-plotara",
          "cinder3-pool-crovena",
          "cinder3-pool-thermia",
          "cinder3-pool-luminara"
        ]
      }
    ]
  },
  {
    "id": "tidal",
    "title": "Tidal Reach",
    "theme": "Linked estuary recovery",
    "transferFocus": "Compare close alternatives, use pool balance as a tie-breaker and manage transferred options.",
    "clientBrief": "I am coordinating treatment across three connected environments in Tidal Reach, where stormwater, agricultural runoff and fuel contamination create overlapping needs. Several microbes will look useful in more than one place, so I need you to distinguish a strong individual card from a strong programme decision.",
    "assignment": "I want you to work site by site. First, choose two characteristics to shape the six-microbe treatment pool. Separately, route ten microbes between the current site, the next site where available, or return. I will keep the full current-site requirements and only limited next-site information visible. Then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so use the information and options available before you commit.",
    "researchBasisIds": [
      "SCI-MIC-01",
      "SCI-MIC-02",
      "SCI-MIC-03",
      "SCI-MIC-04",
      "SCI-MIC-05",
      "SCI-MIC-06",
      "SCI-MIC-07"
    ],
    "sites": [
      {
        "id": "tidal-1",
        "title": "Storm Estuary",
        "description": "Site 1 of three in Tidal Reach. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            4,
            5
          ],
          "mobility": [
            7,
            8
          ],
          "energy": [
            4,
            5
          ]
        },
        "desiredTrait": "Light Sensitive",
        "undesiredTrait": "Aerobic",
        "nextSiteInsight": {
          "kind": "attribute",
          "label": "Permeability",
          "range": [
            7,
            8
          ]
        },
        "preferredFilterStrategy": {
          "attribute": "Mobility",
          "range": [
            7,
            8
          ],
          "trait": "Light Sensitive"
        },
        "categorisationDeck": [
          {
            "name": "Estuvara",
            "permeability": 4,
            "mobility": 7,
            "energy": 4,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "tidal1-route-estuvara",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Brackia",
            "permeability": 5,
            "mobility": 8,
            "energy": 5,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "tidal1-route-brackia",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Rillora",
            "permeability": 4,
            "mobility": 6,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "tidal1-route-rillora",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Luxella",
            "permeability": 3,
            "mobility": 7,
            "energy": 3,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "tidal1-route-luxella",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Deltae",
            "permeability": 5,
            "mobility": 7,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "tidal1-route-deltae",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerosa",
            "permeability": 7,
            "mobility": 6,
            "energy": 3,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "tidal1-route-aerosa",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Halovex",
            "permeability": 7,
            "mobility": 6,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "next",
            "id": "tidal1-route-halovex",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phoralis",
            "permeability": 6,
            "mobility": 7,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "tidal1-route-phoralis",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Motella",
            "permeability": 6,
            "mobility": 6,
            "energy": 3,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "tidal1-route-motella",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerina",
            "permeability": 6,
            "mobility": 8,
            "energy": 5,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "tidal1-route-aerina",
            "allocationReason": "Reference route: Return. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "tidal1-round-1",
            "candidates": [
              {
                "name": "Solenia",
                "permeability": 4,
                "mobility": 8,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "tidal1-r1-solenia",
                "judgement": "strong",
                "reason": "Choose **Solenia**: strongest direct fit and desired trait."
              },
              {
                "name": "Varoxa",
                "permeability": 5,
                "mobility": 9,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "tidal1-r1-varoxa",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Cresta",
                "permeability": 3,
                "mobility": 7,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "tidal1-r1-cresta",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "tidal1-r1-solenia"
          },
          {
            "id": "tidal1-round-2",
            "candidates": [
              {
                "name": "Aervex",
                "permeability": 5,
                "mobility": 7,
                "energy": 4,
                "trait": "Aerobic",
                "id": "tidal1-r2-aervex",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Lumera",
                "permeability": 4,
                "mobility": 6,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "tidal1-r2-lumera",
                "judgement": "strong",
                "reason": "Avoid Aervex's undesired trait; **Lumera** preserves two useful attributes plus desired-trait coverage."
              },
              {
                "name": "Phorix",
                "permeability": 6,
                "mobility": 8,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "tidal1-r2-phorix",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal1-r2-lumera"
          },
          {
            "id": "tidal1-round-3",
            "candidates": [
              {
                "name": "Darsia",
                "permeability": 4,
                "mobility": 7,
                "energy": 6,
                "trait": "Phosphorus Removal",
                "id": "tidal1-r3-darsia",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Therava",
                "permeability": 5,
                "mobility": 8,
                "energy": 4,
                "trait": "Heat Resistant",
                "id": "tidal1-r3-therava",
                "judgement": "strong",
                "reason": "Choose **Therava** for three matching attributes."
              },
              {
                "name": "Lucora",
                "permeability": 3,
                "mobility": 9,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "tidal1-r3-lucora",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal1-r3-therava"
          },
          {
            "id": "tidal1-round-4",
            "candidates": [
              {
                "name": "Vellia",
                "permeability": 4,
                "mobility": 9,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "tidal1-r4-vellia",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Nerion",
                "permeability": 5,
                "mobility": 7,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "tidal1-r4-nerion",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Corvella",
                "permeability": 6,
                "mobility": 8,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "tidal1-r4-corvella",
                "judgement": "strong",
                "reason": "The options are close; choose **Corvella** to strengthen Mobility/Energy while the desired trait is already available."
              }
            ],
            "referenceChoiceId": "tidal1-r4-corvella"
          }
        ],
        "referenceTreatmentIds": [
          "tidal1-pool-luxara",
          "tidal1-pool-merona",
          "tidal1-pool-deltia"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 62,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Luxara",
            "permeability": 4,
            "mobility": 8,
            "energy": 4,
            "trait": "Light Sensitive",
            "id": "tidal1-pool-luxara"
          },
          {
            "name": "Merona",
            "permeability": 5,
            "mobility": 7,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "id": "tidal1-pool-merona"
          },
          {
            "name": "Deltia",
            "permeability": 4,
            "mobility": 7,
            "energy": 5,
            "trait": "Heat Resistant",
            "id": "tidal1-pool-deltia"
          },
          {
            "name": "Aerixa",
            "permeability": 5,
            "mobility": 8,
            "energy": 4,
            "trait": "Aerobic",
            "id": "tidal1-pool-aerixa"
          },
          {
            "name": "Rillia",
            "permeability": 3,
            "mobility": 8,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "tidal1-pool-rillia"
          },
          {
            "name": "Brixor",
            "permeability": 6,
            "mobility": 7,
            "energy": 4,
            "trait": "Heat Resistant",
            "id": "tidal1-pool-brixor"
          },
          {
            "id": "tidal-1-profile-alt-1",
            "name": "Tidera",
            "permeability": 4,
            "mobility": 6,
            "energy": 4,
            "trait": "Heat Resistant"
          },
          {
            "id": "tidal-1-profile-alt-2",
            "name": "Brinova",
            "permeability": 3,
            "mobility": 5,
            "energy": 4,
            "trait": "Heat Resistant"
          },
          {
            "id": "tidal-1-profile-alt-3",
            "name": "Cerylis",
            "permeability": 4,
            "mobility": 6,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "tidal-1-profile-alt-4",
            "name": "Valmera",
            "permeability": 3,
            "mobility": 5,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "tidal-1-profile-alt-5",
            "name": "Oselia",
            "permeability": 4,
            "mobility": 6,
            "energy": 4,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "tidal-1-profile-alt-6",
            "name": "Rivoria",
            "permeability": 3,
            "mobility": 5,
            "energy": 4,
            "trait": "Phosphorus Removal"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "tidal1-pool-luxara",
          "tidal1-pool-merona",
          "tidal1-pool-deltia",
          "tidal1-pool-aerixa",
          "tidal1-pool-rillia",
          "tidal1-pool-brixor"
        ]
      },
      {
        "id": "tidal-2",
        "title": "Agricultural Channel",
        "description": "Site 2 of three in Tidal Reach. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            7,
            8
          ],
          "mobility": [
            3,
            4
          ],
          "energy": [
            5,
            6
          ]
        },
        "desiredTrait": "Aerobic",
        "undesiredTrait": "Heat Resistant",
        "nextSiteInsight": {
          "kind": "attribute",
          "label": "Energy",
          "range": [
            2,
            3
          ]
        },
        "preferredFilterStrategy": {
          "attribute": "Permeability",
          "range": [
            7,
            8
          ],
          "trait": "Aerobic"
        },
        "categorisationDeck": [
          {
            "name": "Channelis",
            "permeability": 7,
            "mobility": 3,
            "energy": 5,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "tidal2-route-channelis",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Nitara",
            "permeability": 8,
            "mobility": 4,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "tidal2-route-nitara",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Pellon",
            "permeability": 7,
            "mobility": 2,
            "energy": 5,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "tidal2-route-pellon",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerovia",
            "permeability": 6,
            "mobility": 3,
            "energy": 4,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "tidal2-route-aerovia",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Maraxis",
            "permeability": 8,
            "mobility": 3,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "tidal2-route-maraxis",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermoril",
            "permeability": 5,
            "mobility": 8,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "next",
            "id": "tidal2-route-thermoril",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phosel",
            "permeability": 4,
            "mobility": 7,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "tidal2-route-phosel",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lumessa",
            "permeability": 6,
            "mobility": 3,
            "energy": 1,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "tidal2-route-lumessa",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Corvella",
            "permeability": 6,
            "mobility": 2,
            "energy": 1,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "tidal2-route-corvella",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermaris",
            "permeability": 8,
            "mobility": 4,
            "energy": 1,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "tidal2-route-thermaris",
            "allocationReason": "Reference route: Return. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "tidal2-round-1",
            "candidates": [
              {
                "name": "Aeronis",
                "permeability": 7,
                "mobility": 4,
                "energy": 6,
                "trait": "Aerobic",
                "id": "tidal2-r1-aeronis",
                "judgement": "strong",
                "reason": "Choose **Aeronis**: three matching attributes plus desired trait."
              },
              {
                "name": "Lumaris",
                "permeability": 8,
                "mobility": 5,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "tidal2-r1-lumaris",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Phorena",
                "permeability": 6,
                "mobility": 3,
                "energy": 6,
                "trait": "Phosphorus Removal",
                "id": "tidal2-r1-phorena",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal2-r1-aeronis"
          },
          {
            "id": "tidal2-round-2",
            "candidates": [
              {
                "name": "Aerivor",
                "permeability": 8,
                "mobility": 3,
                "energy": 4,
                "trait": "Aerobic",
                "id": "tidal2-r2-aerivor",
                "judgement": "strong",
                "reason": "Choose **Aerivor**: two attributes plus desired trait; avoid the Heat Resistant option."
              },
              {
                "name": "Theralia",
                "permeability": 7,
                "mobility": 4,
                "energy": 5,
                "trait": "Heat Resistant",
                "id": "tidal2-r2-theralia",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Lutex",
                "permeability": 9,
                "mobility": 4,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "tidal2-r2-lutex",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal2-r2-aerivor"
          },
          {
            "id": "tidal2-round-3",
            "candidates": [
              {
                "name": "Pelona",
                "permeability": 7,
                "mobility": 5,
                "energy": 6,
                "trait": "Phosphorus Removal",
                "id": "tidal2-r3-pelona",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Lumeris",
                "permeability": 8,
                "mobility": 3,
                "energy": 7,
                "trait": "Light Sensitive",
                "id": "tidal2-r3-lumeris",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Aeriom",
                "permeability": 6,
                "mobility": 4,
                "energy": 5,
                "trait": "Aerobic",
                "id": "tidal2-r3-aeriom",
                "judgement": "strong",
                "reason": "Choose **Aeriom** because desired-trait coverage plus two useful attributes offsets its Permeability miss."
              }
            ],
            "referenceChoiceId": "tidal2-r3-aeriom"
          },
          {
            "id": "tidal2-round-4",
            "candidates": [
              {
                "name": "Corvia",
                "permeability": 8,
                "mobility": 4,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "tidal2-r4-corvia",
                "judgement": "strong",
                "reason": "Choose **Corvia** for full attribute fit once Aerobic is already well represented."
              },
              {
                "name": "Theraxis",
                "permeability": 6,
                "mobility": 3,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "tidal2-r4-theraxis",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 2/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Aqualis",
                "permeability": 7,
                "mobility": 5,
                "energy": 4,
                "trait": "Aerobic",
                "id": "tidal2-r4-aqualis",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal2-r4-corvia"
          }
        ],
        "referenceTreatmentIds": [
          "tidal2-pool-aerixa",
          "tidal2-pool-oxera",
          "tidal2-pool-pellara"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 57,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Aerixa",
            "permeability": 7,
            "mobility": 4,
            "energy": 5,
            "trait": "Aerobic",
            "id": "tidal2-pool-aerixa"
          },
          {
            "name": "Oxera",
            "permeability": 8,
            "mobility": 3,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "tidal2-pool-oxera"
          },
          {
            "name": "Pellara",
            "permeability": 7,
            "mobility": 3,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "tidal2-pool-pellara"
          },
          {
            "name": "Thermex",
            "permeability": 8,
            "mobility": 4,
            "energy": 6,
            "trait": "Heat Resistant",
            "id": "tidal2-pool-thermex"
          },
          {
            "name": "Grena",
            "permeability": 6,
            "mobility": 4,
            "energy": 5,
            "trait": "Aerobic",
            "id": "tidal2-pool-grena"
          },
          {
            "name": "Marnor",
            "permeability": 9,
            "mobility": 3,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "tidal2-pool-marnor"
          },
          {
            "id": "tidal-2-profile-alt-1",
            "name": "Maronix",
            "permeability": 6,
            "mobility": 4,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "tidal-2-profile-alt-2",
            "name": "Pelarix",
            "permeability": 5,
            "mobility": 2,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "tidal-2-profile-alt-3",
            "name": "Ceryon",
            "permeability": 6,
            "mobility": 4,
            "energy": 6,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "tidal-2-profile-alt-4",
            "name": "Valtessa",
            "permeability": 5,
            "mobility": 2,
            "energy": 6,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "tidal-2-profile-alt-5",
            "name": "Ocevia",
            "permeability": 6,
            "mobility": 4,
            "energy": 6,
            "trait": "Light Sensitive"
          },
          {
            "id": "tidal-2-profile-alt-6",
            "name": "Rivenor",
            "permeability": 5,
            "mobility": 2,
            "energy": 6,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "tidal2-pool-aerixa",
          "tidal2-pool-oxera",
          "tidal2-pool-pellara",
          "tidal2-pool-thermex",
          "tidal2-pool-grena",
          "tidal2-pool-marnor"
        ]
      },
      {
        "id": "tidal-3",
        "title": "Fuel Runoff Basin",
        "description": "Site 3 of three in Tidal Reach. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "This is the final site, so there is no further transfer route. I need you to close the programme with the strongest feasible treatment you can assemble from the options you have preserved.",
        "ranges": {
          "permeability": [
            5,
            6
          ],
          "mobility": [
            8,
            9
          ],
          "energy": [
            2,
            3
          ]
        },
        "desiredTrait": "Heat Resistant",
        "undesiredTrait": "Light Sensitive",
        "preferredFilterStrategy": {
          "attribute": "Mobility",
          "range": [
            8,
            9
          ],
          "trait": "Heat Resistant"
        },
        "categorisationDeck": [
          {
            "name": "Hydrion",
            "permeability": 5,
            "mobility": 8,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "tidal3-route-hydrion",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Motrava",
            "permeability": 6,
            "mobility": 9,
            "energy": 3,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "tidal3-route-motrava",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Celiax",
            "permeability": 5,
            "mobility": 7,
            "energy": 2,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "tidal3-route-celiax",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermion",
            "permeability": 4,
            "mobility": 8,
            "energy": 1,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "tidal3-route-thermion",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Pelagis",
            "permeability": 6,
            "mobility": 8,
            "energy": 1,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "tidal3-route-pelagis",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Luxevia",
            "permeability": 4,
            "mobility": 7,
            "energy": 1,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "tidal3-route-luxevia",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerion",
            "permeability": 4,
            "mobility": 7,
            "energy": 1,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "tidal3-route-aerion",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phoralis",
            "permeability": 4,
            "mobility": 8,
            "energy": 1,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "tidal3-route-phoralis",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Sternia",
            "permeability": 4,
            "mobility": 7,
            "energy": 1,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "tidal3-route-sternia",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lumorae",
            "permeability": 6,
            "mobility": 9,
            "energy": 3,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "tidal3-route-lumorae",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "tidal3-round-1",
            "candidates": [
              {
                "name": "Theressa",
                "permeability": 6,
                "mobility": 8,
                "energy": 3,
                "trait": "Heat Resistant",
                "id": "tidal3-r1-theressa",
                "judgement": "strong",
                "reason": "Choose **Theressa**: three matching attributes plus desired trait."
              },
              {
                "name": "Aervon",
                "permeability": 5,
                "mobility": 10,
                "energy": 2,
                "trait": "Aerobic",
                "id": "tidal3-r1-aervon",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Lumora",
                "permeability": 4,
                "mobility": 8,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "tidal3-r1-lumora",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 1/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "tidal3-r1-theressa"
          },
          {
            "id": "tidal3-round-2",
            "candidates": [
              {
                "name": "Coraxis",
                "permeability": 5,
                "mobility": 9,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "tidal3-r2-coraxis",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Therella",
                "permeability": 7,
                "mobility": 8,
                "energy": 2,
                "trait": "Heat Resistant",
                "id": "tidal3-r2-therella",
                "judgement": "strong",
                "reason": "Choose **Therella**: desired trait and two useful dimensions, with no Light Sensitive penalty."
              },
              {
                "name": "Aeriax",
                "permeability": 6,
                "mobility": 7,
                "energy": 3,
                "trait": "Aerobic",
                "id": "tidal3-r2-aeriax",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal3-r2-therella"
          },
          {
            "id": "tidal3-round-3",
            "candidates": [
              {
                "name": "Mareon",
                "permeability": 5,
                "mobility": 8,
                "energy": 2,
                "trait": "Aerobic",
                "id": "tidal3-r3-mareon",
                "judgement": "strong",
                "reason": "Choose **Mareon** for full attribute fit once Heat Resistant is already secured."
              },
              {
                "name": "Luxeris",
                "permeability": 6,
                "mobility": 9,
                "energy": 3,
                "trait": "Light Sensitive",
                "id": "tidal3-r3-luxeris",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Therava",
                "permeability": 4,
                "mobility": 9,
                "energy": 2,
                "trait": "Heat Resistant",
                "id": "tidal3-r3-therava",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              }
            ],
            "referenceChoiceId": "tidal3-r3-mareon"
          },
          {
            "id": "tidal3-round-4",
            "candidates": [
              {
                "name": "Peloria",
                "permeability": 6,
                "mobility": 8,
                "energy": 3,
                "trait": "Phosphorus Removal",
                "id": "tidal3-r4-peloria",
                "judgement": "strong",
                "reason": "Choose **Peloria** to strengthen the numerical pool without introducing the undesired trait."
              },
              {
                "name": "Aerion",
                "permeability": 5,
                "mobility": 9,
                "energy": 4,
                "trait": "Aerobic",
                "id": "tidal3-r4-aerion",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Theruna",
                "permeability": 7,
                "mobility": 7,
                "energy": 2,
                "trait": "Heat Resistant",
                "id": "tidal3-r4-theruna",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              }
            ],
            "referenceChoiceId": "tidal3-r4-peloria"
          }
        ],
        "referenceTreatmentIds": [
          "tidal3-pool-therion",
          "tidal3-pool-celara",
          "tidal3-pool-motria"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 60,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Therion",
            "permeability": 5,
            "mobility": 9,
            "energy": 3,
            "trait": "Heat Resistant",
            "id": "tidal3-pool-therion"
          },
          {
            "name": "Celara",
            "permeability": 6,
            "mobility": 8,
            "energy": 2,
            "trait": "Phosphorus Removal",
            "id": "tidal3-pool-celara"
          },
          {
            "name": "Motria",
            "permeability": 5,
            "mobility": 8,
            "energy": 3,
            "trait": "Aerobic",
            "id": "tidal3-pool-motria"
          },
          {
            "name": "Luxara",
            "permeability": 6,
            "mobility": 9,
            "energy": 2,
            "trait": "Light Sensitive",
            "id": "tidal3-pool-luxara"
          },
          {
            "name": "Pelagos",
            "permeability": 4,
            "mobility": 9,
            "energy": 3,
            "trait": "Heat Resistant",
            "id": "tidal3-pool-pelagos"
          },
          {
            "name": "Sterna",
            "permeability": 7,
            "mobility": 8,
            "energy": 2,
            "trait": "Phosphorus Removal",
            "id": "tidal3-pool-sterna"
          },
          {
            "id": "tidal-3-profile-alt-1",
            "name": "Nerisca",
            "permeability": 6,
            "mobility": 7,
            "energy": 2,
            "trait": "Aerobic"
          },
          {
            "id": "tidal-3-profile-alt-2",
            "name": "Pelatrix",
            "permeability": 4,
            "mobility": 6,
            "energy": 2,
            "trait": "Aerobic"
          },
          {
            "id": "tidal-3-profile-alt-3",
            "name": "Ceryvia",
            "permeability": 6,
            "mobility": 7,
            "energy": 2,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "tidal-3-profile-alt-4",
            "name": "Valphora",
            "permeability": 4,
            "mobility": 6,
            "energy": 2,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "tidal-3-profile-alt-5",
            "name": "Oceanis",
            "permeability": 6,
            "mobility": 7,
            "energy": 2,
            "trait": "Light Sensitive"
          },
          {
            "id": "tidal-3-profile-alt-6",
            "name": "Rivessa",
            "permeability": 4,
            "mobility": 6,
            "energy": 2,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "tidal3-pool-therion",
          "tidal3-pool-celara",
          "tidal3-pool-motria",
          "tidal3-pool-luxara",
          "tidal3-pool-pelagos",
          "tidal3-pool-sterna"
        ]
      }
    ]
  },
  {
    "id": "azure",
    "title": "Azure Shelf",
    "theme": "Linked offshore recovery",
    "transferFocus": "Manage opportunity cost, constrained choice and an intentionally imperfect optimum.",
    "clientBrief": "I am coordinating treatment from the nearshore zone through to the deeper Azure Shelf. The options are tighter here and the trade-offs are less forgiving, so I need you to preserve scarce capabilities, accept constraints when they are real, and recommend the strongest feasible treatment rather than chase a perfect-looking answer.",
    "assignment": "I want you to work site by site. First, choose two characteristics to shape the six-microbe treatment pool. Separately, route ten microbes between the current site, the next site where available, or return. I will keep the full current-site requirements and only limited next-site information visible. Then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so use the information and options available before you commit.",
    "researchBasisIds": [
      "SCI-MIC-01",
      "SCI-MIC-02",
      "SCI-MIC-03",
      "SCI-MIC-04",
      "SCI-MIC-05",
      "SCI-MIC-06",
      "SCI-MIC-07"
    ],
    "sites": [
      {
        "id": "azure-1",
        "title": "Nearshore Film",
        "description": "Site 1 of three in Azure Shelf. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            5,
            7
          ],
          "mobility": [
            5,
            7
          ],
          "energy": [
            4,
            6
          ]
        },
        "desiredTrait": "Phosphorus Removal",
        "undesiredTrait": "Aerobic",
        "nextSiteInsight": {
          "kind": "attribute",
          "label": "Mobility",
          "range": [
            6,
            8
          ]
        },
        "preferredFilterStrategy": {
          "attribute": "Permeability",
          "range": [
            5,
            7
          ],
          "trait": "Phosphorus Removal"
        },
        "categorisationDeck": [
          {
            "name": "Surfara",
            "permeability": 5,
            "mobility": 5,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "azure1-route-surfara",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Pelinia",
            "permeability": 7,
            "mobility": 7,
            "energy": 6,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "azure1-route-pelinia",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Marivara",
            "permeability": 5,
            "mobility": 4,
            "energy": 4,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "azure1-route-marivara",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phoselle",
            "permeability": 4,
            "mobility": 5,
            "energy": 3,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "azure1-route-phoselle",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Coralune",
            "permeability": 7,
            "mobility": 5,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "azure1-route-coralune",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aervalis",
            "permeability": 4,
            "mobility": 8,
            "energy": 3,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "azure1-route-aervalis",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermaris",
            "permeability": 4,
            "mobility": 8,
            "energy": 2,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "azure1-route-thermaris",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Luceria",
            "permeability": 4,
            "mobility": 5,
            "energy": 3,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "azure1-route-luceria",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Nerella",
            "permeability": 4,
            "mobility": 5,
            "energy": 3,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "azure1-route-nerella",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aerivon",
            "permeability": 7,
            "mobility": 5,
            "energy": 6,
            "trait": "Aerobic",
            "expectedAllocation": "return",
            "id": "azure1-route-aerivon",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "azure1-round-1",
            "candidates": [
              {
                "name": "Coralia",
                "permeability": 5,
                "mobility": 6,
                "energy": 6,
                "trait": "Phosphorus Removal",
                "id": "azure1-r1-coralia",
                "judgement": "strong",
                "reason": "Choose **Coralia** for full attribute fit plus desired trait; the Aerobic candidate is excluded."
              },
              {
                "name": "Aervex",
                "permeability": 7,
                "mobility": 7,
                "energy": 5,
                "trait": "Aerobic",
                "id": "azure1-r1-aervex",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Therona",
                "permeability": 8,
                "mobility": 4,
                "energy": 5,
                "trait": "Heat Resistant",
                "id": "azure1-r1-therona",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure1-r1-coralia"
          },
          {
            "id": "azure1-round-2",
            "candidates": [
              {
                "name": "Lumera",
                "permeability": 6,
                "mobility": 8,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "azure1-r2-lumera",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Phorix",
                "permeability": 4,
                "mobility": 6,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "azure1-r2-phorix",
                "judgement": "strong",
                "reason": "Choose **Phorix** for desired-trait coverage and two useful attributes."
              },
              {
                "name": "Aerolis",
                "permeability": 5,
                "mobility": 5,
                "energy": 7,
                "trait": "Aerobic",
                "id": "azure1-r2-aerolis",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 2/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "azure1-r2-phorix"
          },
          {
            "id": "azure1-round-3",
            "candidates": [
              {
                "name": "Marex",
                "permeability": 7,
                "mobility": 6,
                "energy": 3,
                "trait": "Heat Resistant",
                "id": "azure1-r3-marex",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Phosara",
                "permeability": 5,
                "mobility": 8,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "azure1-r3-phosara",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Lucentia",
                "permeability": 6,
                "mobility": 5,
                "energy": 6,
                "trait": "Light Sensitive",
                "id": "azure1-r3-lucentia",
                "judgement": "strong",
                "reason": "Choose **Lucentia**: clean three-attribute fit without the undesired trait."
              }
            ],
            "referenceChoiceId": "azure1-r3-lucentia"
          },
          {
            "id": "azure1-round-4",
            "candidates": [
              {
                "name": "Nerava",
                "permeability": 5,
                "mobility": 7,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "azure1-r4-nerava",
                "judgement": "strong",
                "reason": "Choose **Nerava** to preserve balanced Permeability/Mobility/Energy options rather than chasing another desired-trait copy."
              },
              {
                "name": "Aerinae",
                "permeability": 6,
                "mobility": 4,
                "energy": 5,
                "trait": "Aerobic",
                "id": "azure1-r4-aerinae",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 2/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Phosel",
                "permeability": 8,
                "mobility": 6,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "azure1-r4-phosel",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              }
            ],
            "referenceChoiceId": "azure1-r4-nerava"
          }
        ],
        "referenceTreatmentIds": [
          "azure1-pool-phosia",
          "azure1-pool-azuron",
          "azure1-pool-pelina"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 63,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Phosia",
            "permeability": 6,
            "mobility": 6,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "id": "azure1-pool-phosia"
          },
          {
            "name": "Azuron",
            "permeability": 7,
            "mobility": 5,
            "energy": 6,
            "trait": "Light Sensitive",
            "id": "azure1-pool-azuron"
          },
          {
            "name": "Pelina",
            "permeability": 5,
            "mobility": 7,
            "energy": 4,
            "trait": "Heat Resistant",
            "id": "azure1-pool-pelina"
          },
          {
            "name": "Aerina",
            "permeability": 6,
            "mobility": 6,
            "energy": 5,
            "trait": "Aerobic",
            "id": "azure1-pool-aerina"
          },
          {
            "name": "Maris",
            "permeability": 4,
            "mobility": 7,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "id": "azure1-pool-maris"
          },
          {
            "name": "Thessa",
            "permeability": 8,
            "mobility": 5,
            "energy": 4,
            "trait": "Light Sensitive",
            "id": "azure1-pool-thessa"
          },
          {
            "id": "azure-1-profile-alt-1",
            "name": "Azellia",
            "permeability": 4,
            "mobility": 6,
            "energy": 5,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-1-profile-alt-2",
            "name": "Pelorix",
            "permeability": 3,
            "mobility": 4,
            "energy": 5,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-1-profile-alt-3",
            "name": "Cerynex",
            "permeability": 4,
            "mobility": 6,
            "energy": 5,
            "trait": "Aerobic"
          },
          {
            "id": "azure-1-profile-alt-4",
            "name": "Valuna",
            "permeability": 3,
            "mobility": 4,
            "energy": 5,
            "trait": "Aerobic"
          },
          {
            "id": "azure-1-profile-alt-5",
            "name": "Ocerella",
            "permeability": 4,
            "mobility": 6,
            "energy": 5,
            "trait": "Light Sensitive"
          },
          {
            "id": "azure-1-profile-alt-6",
            "name": "Rivona",
            "permeability": 3,
            "mobility": 4,
            "energy": 5,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "azure1-pool-phosia",
          "azure1-pool-azuron",
          "azure1-pool-pelina",
          "azure1-pool-aerina",
          "azure1-pool-maris",
          "azure1-pool-thessa"
        ]
      },
      {
        "id": "azure-2",
        "title": "Mid-Shelf Plume",
        "description": "Site 2 of three in Azure Shelf. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "I need a treatment strategy that responds to this site's requirements while keeping the wider three-site programme in view. Use the full information available here together with the limited next-site insight, and make the most defensible decision from the evidence you can see.",
        "ranges": {
          "permeability": [
            6,
            8
          ],
          "mobility": [
            6,
            8
          ],
          "energy": [
            3,
            5
          ]
        },
        "desiredTrait": "Light Sensitive",
        "undesiredTrait": "Phosphorus Removal",
        "nextSiteInsight": {
          "kind": "trait",
          "label": "Aerobic"
        },
        "preferredFilterStrategy": {
          "attribute": "Permeability",
          "range": [
            6,
            8
          ],
          "trait": "Light Sensitive"
        },
        "categorisationDeck": [
          {
            "name": "Plumeris",
            "permeability": 6,
            "mobility": 6,
            "energy": 3,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "azure2-route-plumeris",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Bluevia",
            "permeability": 8,
            "mobility": 8,
            "energy": 5,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "azure2-route-bluevia",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Calyra",
            "permeability": 6,
            "mobility": 5,
            "energy": 3,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "azure2-route-calyra",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lumina-A",
            "permeability": 5,
            "mobility": 6,
            "energy": 2,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "azure2-route-lumina-a",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Dexia-A",
            "permeability": 8,
            "mobility": 6,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "current",
            "id": "azure2-route-dexia-a",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aeridia",
            "permeability": 4,
            "mobility": 9,
            "energy": 5,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "azure2-route-aeridia",
            "allocationReason": "Reference route: Next. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aeriom",
            "permeability": 2,
            "mobility": 5,
            "energy": 2,
            "trait": "Aerobic",
            "expectedAllocation": "next",
            "id": "azure2-route-aeriom",
            "allocationReason": "Reference route: Next. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermava",
            "permeability": 5,
            "mobility": 6,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "azure2-route-thermava",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Corinox",
            "permeability": 5,
            "mobility": 5,
            "energy": 2,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "azure2-route-corinox",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phosarae",
            "permeability": 8,
            "mobility": 8,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "azure2-route-phosarae",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "azure2-round-1",
            "candidates": [
              {
                "name": "Lunara",
                "permeability": 6,
                "mobility": 7,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "azure2-r1-lunara",
                "judgement": "strong",
                "reason": "Choose **Lunara**: full attribute fit plus desired trait; reject Phosphorus Removal."
              },
              {
                "name": "Phorena",
                "permeability": 8,
                "mobility": 8,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "azure2-r1-phorena",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Theris",
                "permeability": 9,
                "mobility": 5,
                "energy": 3,
                "trait": "Heat Resistant",
                "id": "azure2-r1-theris",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure2-r1-lunara"
          },
          {
            "id": "azure2-round-2",
            "candidates": [
              {
                "name": "Aeria",
                "permeability": 7,
                "mobility": 6,
                "energy": 5,
                "trait": "Aerobic",
                "id": "azure2-r2-aeria",
                "judgement": "strong",
                "reason": "Choose **Aeria** for clean attribute fit after Light Sensitive is already represented."
              },
              {
                "name": "Lumae",
                "permeability": 5,
                "mobility": 8,
                "energy": 3,
                "trait": "Light Sensitive",
                "id": "azure2-r2-lumae",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Phosel",
                "permeability": 6,
                "mobility": 6,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "azure2-r2-phosel",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              }
            ],
            "referenceChoiceId": "azure2-r2-aeria"
          },
          {
            "id": "azure2-round-3",
            "candidates": [
              {
                "name": "Therava",
                "permeability": 8,
                "mobility": 7,
                "energy": 6,
                "trait": "Heat Resistant",
                "id": "azure2-r3-therava",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Lucora",
                "permeability": 7,
                "mobility": 5,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "azure2-r3-lucora",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Aerion",
                "permeability": 6,
                "mobility": 8,
                "energy": 5,
                "trait": "Aerobic",
                "id": "azure2-r3-aerion",
                "judgement": "strong",
                "reason": "Choose **Aerion**: three useful attributes and no undesired trait."
              }
            ],
            "referenceChoiceId": "azure2-r3-aerion"
          },
          {
            "id": "azure2-round-4",
            "candidates": [
              {
                "name": "Marevia",
                "permeability": 6,
                "mobility": 7,
                "energy": 3,
                "trait": "Aerobic",
                "id": "azure2-r4-marevia",
                "judgement": "defensible",
                "reason": "Strong individual fit at 3/4 positive criteria, but compare the card with what the current pool still needs."
              },
              {
                "name": "Phosara",
                "permeability": 7,
                "mobility": 8,
                "energy": 5,
                "trait": "Phosphorus Removal",
                "id": "azure2-r4-phosara",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Luminex",
                "permeability": 8,
                "mobility": 6,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "azure2-r4-luminex",
                "judgement": "strong",
                "reason": "Choose **Luminex** to add another fully compatible Light Sensitive option."
              }
            ],
            "referenceChoiceId": "azure2-r4-luminex"
          }
        ],
        "referenceTreatmentIds": [
          "azure2-pool-lumaria",
          "azure2-pool-bluex",
          "azure2-pool-calyx"
        ],
        "maximumFeasibleEffectiveness": 100,
        "referenceMaximumCount": 70,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Lumaria",
            "permeability": 7,
            "mobility": 7,
            "energy": 4,
            "trait": "Light Sensitive",
            "id": "azure2-pool-lumaria"
          },
          {
            "name": "Bluex",
            "permeability": 8,
            "mobility": 6,
            "energy": 5,
            "trait": "Aerobic",
            "id": "azure2-pool-bluex"
          },
          {
            "name": "Calyx",
            "permeability": 6,
            "mobility": 8,
            "energy": 3,
            "trait": "Heat Resistant",
            "id": "azure2-pool-calyx"
          },
          {
            "name": "Phosia",
            "permeability": 7,
            "mobility": 7,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "id": "azure2-pool-phosia"
          },
          {
            "name": "Nerina",
            "permeability": 5,
            "mobility": 8,
            "energy": 4,
            "trait": "Light Sensitive",
            "id": "azure2-pool-nerina"
          },
          {
            "name": "Dexia",
            "permeability": 9,
            "mobility": 6,
            "energy": 5,
            "trait": "Aerobic",
            "id": "azure2-pool-dexia"
          },
          {
            "id": "azure-2-profile-alt-1",
            "name": "Bluevia",
            "permeability": 5,
            "mobility": 7,
            "energy": 4,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-2-profile-alt-2",
            "name": "Pelaris",
            "permeability": 4,
            "mobility": 5,
            "energy": 4,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-2-profile-alt-3",
            "name": "Ceryssa",
            "permeability": 5,
            "mobility": 7,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "azure-2-profile-alt-4",
            "name": "Valexia",
            "permeability": 4,
            "mobility": 5,
            "energy": 4,
            "trait": "Aerobic"
          },
          {
            "id": "azure-2-profile-alt-5",
            "name": "Oceanor",
            "permeability": 5,
            "mobility": 7,
            "energy": 4,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "azure-2-profile-alt-6",
            "name": "Rivaxa",
            "permeability": 4,
            "mobility": 5,
            "energy": 4,
            "trait": "Phosphorus Removal"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "azure2-pool-lumaria",
          "azure2-pool-bluex",
          "azure2-pool-calyx",
          "azure2-pool-phosia",
          "azure2-pool-nerina",
          "azure2-pool-dexia"
        ]
      },
      {
        "id": "azure-3",
        "title": "Deep Shelf",
        "description": "Site 3 of three in Azure Shelf. Review the complete site information, then make the strongest feasible allocation and treatment decisions.",
        "decisionPrompt": "This is the final site, so there is no further transfer route. I need you to close the programme with the strongest feasible treatment you can assemble from the options you have preserved.",
        "ranges": {
          "permeability": [
            4,
            6
          ],
          "mobility": [
            7,
            9
          ],
          "energy": [
            5,
            7
          ]
        },
        "desiredTrait": "Aerobic",
        "undesiredTrait": "Heat Resistant",
        "preferredFilterStrategy": {
          "attribute": "Mobility",
          "range": [
            7,
            9
          ],
          "trait": "Aerobic"
        },
        "categorisationDeck": [
          {
            "name": "Bathyrene",
            "permeability": 4,
            "mobility": 7,
            "energy": 5,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "azure3-route-bathyrene",
            "allocationReason": "Reference route: Current. 4/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Phorixa",
            "permeability": 6,
            "mobility": 9,
            "energy": 7,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "azure3-route-phorixa",
            "allocationReason": "Reference route: Current. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Tressara",
            "permeability": 4,
            "mobility": 6,
            "energy": 5,
            "trait": "Light Sensitive",
            "expectedAllocation": "current",
            "id": "azure3-route-tressara",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Aeriaxa",
            "permeability": 3,
            "mobility": 7,
            "energy": 4,
            "trait": "Aerobic",
            "expectedAllocation": "current",
            "id": "azure3-route-aeriaxa",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Mavira",
            "permeability": 6,
            "mobility": 7,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "current",
            "id": "azure3-route-mavira",
            "allocationReason": "Reference route: Current. 2/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermissa",
            "permeability": 3,
            "mobility": 6,
            "energy": 4,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "azure3-route-thermissa",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Corivex",
            "permeability": 3,
            "mobility": 6,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "azure3-route-corivex",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Lumara",
            "permeability": 3,
            "mobility": 7,
            "energy": 4,
            "trait": "Phosphorus Removal",
            "expectedAllocation": "return",
            "id": "azure3-route-lumara",
            "allocationReason": "Reference route: Return. 1/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Nerissa",
            "permeability": 3,
            "mobility": 6,
            "energy": 4,
            "trait": "Light Sensitive",
            "expectedAllocation": "return",
            "id": "azure3-route-nerissa",
            "allocationReason": "Reference route: Return. 0/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          },
          {
            "name": "Thermorae",
            "permeability": 6,
            "mobility": 9,
            "energy": 7,
            "trait": "Heat Resistant",
            "expectedAllocation": "return",
            "id": "azure3-route-thermorae",
            "allocationReason": "Reference route: Return. 3/4 positive current-site criteria match before applying the undesired-trait exclusion and next-site insight."
          }
        ],
        "prospectRounds": [
          {
            "id": "azure3-round-1",
            "candidates": [
              {
                "name": "Phera",
                "permeability": 3,
                "mobility": 6,
                "energy": 4,
                "trait": "Heat Resistant",
                "id": "azure3-r1-phera",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 0/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Zorin",
                "permeability": 3,
                "mobility": 10,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "azure3-r1-zorin",
                "judgement": "strong",
                "reason": "Choose **Zorin** as the least-damaging non-Heat-Resistant option for the constrained pool."
              },
              {
                "name": "Vela",
                "permeability": 2,
                "mobility": 7,
                "energy": 8,
                "trait": "Phosphorus Removal",
                "id": "azure3-r1-vela",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure3-r1-zorin"
          },
          {
            "id": "azure3-round-2",
            "candidates": [
              {
                "name": "Neris",
                "permeability": 3,
                "mobility": 9,
                "energy": 4,
                "trait": "Light Sensitive",
                "id": "azure3-r2-neris",
                "judgement": "strong",
                "reason": "Choose **Neris** to protect Mobility while keeping the pool free of the undesired trait."
              },
              {
                "name": "Theron",
                "permeability": 5,
                "mobility": 7,
                "energy": 5,
                "trait": "Heat Resistant",
                "id": "azure3-r2-theron",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Phorin",
                "permeability": 3,
                "mobility": 10,
                "energy": 8,
                "trait": "Phosphorus Removal",
                "id": "azure3-r2-phorin",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure3-r2-neris"
          },
          {
            "id": "azure3-round-3",
            "candidates": [
              {
                "name": "Marea",
                "permeability": 2,
                "mobility": 8,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "azure3-r3-marea",
                "judgement": "strong",
                "reason": "Choose **Marea** over the extreme Aerobic card; the required Aerobic trait is already present in the initial pool."
              },
              {
                "name": "Aervia",
                "permeability": 1,
                "mobility": 9,
                "energy": 9,
                "trait": "Aerobic",
                "id": "azure3-r3-aervia",
                "judgement": "defensible",
                "reason": "Useful on two current-site dimensions, but it leaves more balancing work for the final treatment."
              },
              {
                "name": "Lunex",
                "permeability": 3,
                "mobility": 10,
                "energy": 3,
                "trait": "Light Sensitive",
                "id": "azure3-r3-lunex",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure3-r3-marea"
          },
          {
            "id": "azure3-round-4",
            "candidates": [
              {
                "name": "Cressa",
                "permeability": 3,
                "mobility": 8,
                "energy": 4,
                "trait": "Phosphorus Removal",
                "id": "azure3-r4-cressa",
                "judgement": "strong",
                "reason": "Choose **Cressa** for the best remaining balance; no 100% treatment exists in this fixed deck."
              },
              {
                "name": "Thera",
                "permeability": 6,
                "mobility": 9,
                "energy": 7,
                "trait": "Heat Resistant",
                "id": "azure3-r4-thera",
                "judgement": "weak",
                "reason": "Carries the site's undesired trait. Even with 3/4 positive matches, that creates a direct treatment constraint."
              },
              {
                "name": "Lumora",
                "permeability": 2,
                "mobility": 10,
                "energy": 5,
                "trait": "Light Sensitive",
                "id": "azure3-r4-lumora",
                "judgement": "weak",
                "reason": "Limited direct fit. It is only defensible if it solves a specific imbalance in the existing pool."
              }
            ],
            "referenceChoiceId": "azure3-r4-cressa"
          }
        ],
        "referenceTreatmentIds": [
          "azure3-pool-aeriax",
          "azure3-pool-luma",
          "azure3-pool-tressa"
        ],
        "maximumFeasibleEffectiveness": 80,
        "referenceMaximumCount": 11,
        "researchBasisIds": [
          "SCI-MIC-01",
          "SCI-MIC-02",
          "SCI-MIC-03",
          "SCI-MIC-04",
          "SCI-MIC-05",
          "SCI-MIC-06",
          "SCI-MIC-07"
        ],
        "initialPoolCandidateUniverse": [
          {
            "name": "Aeriax",
            "permeability": 2,
            "mobility": 10,
            "energy": 10,
            "trait": "Aerobic",
            "id": "azure3-pool-aeriax"
          },
          {
            "name": "Luma",
            "permeability": 4,
            "mobility": 5,
            "energy": 3,
            "trait": "Light Sensitive",
            "id": "azure3-pool-luma"
          },
          {
            "name": "Tressa",
            "permeability": 5,
            "mobility": 10,
            "energy": 6,
            "trait": "Phosphorus Removal",
            "id": "azure3-pool-tressa"
          },
          {
            "name": "Mavix",
            "permeability": 3,
            "mobility": 10,
            "energy": 5,
            "trait": "Light Sensitive",
            "id": "azure3-pool-mavix"
          },
          {
            "name": "Corin",
            "permeability": 3,
            "mobility": 10,
            "energy": 5,
            "trait": "Phosphorus Removal",
            "id": "azure3-pool-corin"
          },
          {
            "name": "Sela",
            "permeability": 6,
            "mobility": 8,
            "energy": 6,
            "trait": "Heat Resistant",
            "id": "azure3-pool-sela"
          },
          {
            "id": "azure-3-profile-alt-1",
            "name": "Neralis",
            "permeability": 5,
            "mobility": 6,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-3-profile-alt-2",
            "name": "Pelanox",
            "permeability": 3,
            "mobility": 5,
            "energy": 6,
            "trait": "Heat Resistant"
          },
          {
            "id": "azure-3-profile-alt-3",
            "name": "Ceryra",
            "permeability": 5,
            "mobility": 6,
            "energy": 6,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "azure-3-profile-alt-4",
            "name": "Valtis",
            "permeability": 3,
            "mobility": 5,
            "energy": 6,
            "trait": "Phosphorus Removal"
          },
          {
            "id": "azure-3-profile-alt-5",
            "name": "Ocephora",
            "permeability": 5,
            "mobility": 6,
            "energy": 6,
            "trait": "Light Sensitive"
          },
          {
            "id": "azure-3-profile-alt-6",
            "name": "Rivaryn",
            "permeability": 3,
            "mobility": 5,
            "energy": 6,
            "trait": "Light Sensitive"
          }
        ],
        "referenceInitialProspectPoolIds": [
          "azure3-pool-aeriax",
          "azure3-pool-luma",
          "azure3-pool-tressa",
          "azure3-pool-mavix",
          "azure3-pool-corin",
          "azure3-pool-sela"
        ]
      }
    ]
  }
];


export const getSeaWolfScenario = (id?: string) => seaWolfScenarios.find((scenario) => scenario.id === id) ?? seaWolfScenarios[0];

export const allSiteCandidateUniverse = (site: SeaWolfSite): Microbe[] => [
  ...site.initialPoolCandidateUniverse,
  ...site.prospectRounds.flatMap((round) => round.candidates)
];
