import {
  ADVENTURE,
  EDGE,
  HEART,
  IRON,
  SHADOW,
  WITS,
  MOMENTUM,
  HARM,
  STRESS,
  SUPPLY,
  MOVE,
  PAY_THE_PRICE,
  HEALTH,
  SPIRIT,
  UNDERTAKE_A_JOURNEY
} from './constants';

const moves = [
  {
    name: 'Face Danger',
    type: ADVENTURE,
    desc: 'When you attempt something risky or react to an imminent threat, envision your action and roll.',
    roll: [
      [EDGE, 'With speed, agility, or precision'],
      [HEART, 'With charm, loyalty, or courage'],
      [IRON, 'With aggressive action, forceful defense, strength, or endurance'],
      [SHADOW, 'With deception, stealth, or trickery'],
      [WITS, 'With expertise, insight, or observation']
    ],
    add: null,
    choice: [],
    result: {
      strong: {
        message: 'You are successful.',
        outcome: [
          [MOMENTUM, 1]
        ],
        take: 1
      },
      weak: {
        message: 'You succeed, but face a troublesome cost. Choose one.',
        outcome: [
          {
            message: 'You are delayed, lose advantage, or face a new danger.',
            outcome: [
              [MOMENTUM, -1]
            ]
          },
          {
            message: 'You are tired or hurt.',
            outcome: [
              [HARM, 1]
            ]
          },
          {
            message: 'You are dispirited or afraid.',
            outcome: [
              [STRESS, 1]
            ]
          },
          {
            message: 'You sacrifice resources.',
            outcome: [
              [SUPPLY, -1]
            ]
          }
        ],
        take: 1
      },
      miss: {
        message: 'You fail, or your progress is undermined by a dramatic and costly turn of events.',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: 'Secure an Advantage',
    type: ADVENTURE,
    desc: 'When you assess a situation, make preparations, or attempt to gain leverage, envision your action and roll.',
    roll: [
      [EDGE, 'With speed, agility, or precision'],
      [HEART, 'With charm, loyalty, or courage'],
      [IRON, 'With aggressive action, forceful defense, strength, or endurance'],
      [SHADOW, 'With deception, stealth, or trickery'],
      [WITS, 'With expertise, insight, or observation']
    ],
    add: null,
    choice: [],
    result: {
      strong: {
        message: 'You gain advantage.',
        outcome: [
          {
            message: 'Take control, make another move now (not a progress move), and add + 1.',
            outcome: [
              [MOVE, 1]
            ]
          },
          {
            message: 'Prepare to act.',
            outcome: [
              [MOMENTUM, 2]
            ]
          }
        ],
        take: 1
      },
      weak: {
        message: 'Your advantage is short-lived.',
        outcome: [
          [MOMENTUM, 1]
        ],
        take: 1
      },
      miss: {
        message: 'You fail or your assumptions betray you.',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: 'Gather Information',
    type: ADVENTURE,
    desc: 'When you search an area, ask questions, conduct an investigation, or follow a track.',
    roll: [
      [WITS, 'Search an area, ask questions, conduct an investigation, or follow a track.']
    ],
    add: 'If you act within a community or ask questions of a person with whom you share a bond',
    choice: [],
    result: {
      strong: {
        message: 'You discover something helpful and specific. The path you must follow or action you must take to make progress is made clear. Envision what you learn(Ask the Oracle if unsure).',
        outcome: [
          [MOMENTUM, 2]
        ],
        take: 1
      },
      weak: {
        message: 'The information complicates your quest or introduces a new danger. Envision what you discover(Ask the Oracle if unsure).',
        outcome: [
          [MOMENTUM, 1]
        ],
        take: 1
      },
      miss: {
        message: 'Your investigation unearths a dire threat or reveals an unwelcome truth that undermines your quest.',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: 'Heal',
    type: ADVENTURE,
    desc: 'When you treat an injury or ailment.',
    roll: [
      [WITS, 'Treat an injury or ailment.'],
      [WITS, 'Mending your own wounds.'],
      [IRON, 'Mending your own wounds.']
    ],
    add: null,
    choice: ['Treat an injury or ailment.', 'Mending your own wounds.'],
    result: {
      strong: {
        message: 'Your care is helpful. If you (or the ally under your care) have the wounded condition, you may clear it.',
        outcome: [
          [HEALTH, 2]
        ],
        take: 1
      },
      weak: {
        message: 'your care is helpful. If you (or the ally under your care) have the wounded condition, you may clear it.',
        outcome: [
          [
            [HEALTH, 2],
            [SUPPLY, -1]
          ],
          [
            [HEALTH, 2],
            [MOMENTUM, -1]
          ]
        ],
        take: 1
      },
      miss: {
        message: 'Your aid is ineffective',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: 'Resupply',
    type: ADVENTURE,
    desc: 'When you hunt, forage, or scavenge.',
    roll: [
      [WITS, 'Hunt, forage, or scavenge.']
    ],
    add: null,
    choice: [],
    result: {
      strong: {
        message: 'You bolster your resources.',
        outcome: [
          [SUPPLY, 2]
        ],
        take: 1
      },
      weak: {
        message: 'You gain resources.',
        outcome: [
          [
            [SUPPLY, 1],
            [MOMENTUM, -1]
          ],
          [
            [SUPPLY, 2],
            [MOMENTUM, -2]
          ]
        ],
        take: 1
      },
      miss: {
        message: 'You find nothing helpful.',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: 'Make Camp',
    type: ADVENTURE,
    desc: 'When you rest and recover for several hours in the wild.',
    roll: [
      [SUPPLY, 'Rest and recover for several hours in the wild.']
    ],
    add: null,
    choice: [],
    result: {
      strong: {
        message: 'You rest and recover for several hours in the wild.',
        outcome: [
          [HEALTH, 1],
          [
            [HEALTH, 1],
            [SUPPLY, -1]
          ],
          [SPIRIT, 1],
          [MOMENTUM, 1],
          [UNDERTAKE_A_JOURNEY, 1]
        ],
        take: 2
      },
      weak: {
        message: 'You rest and recover for several hours in the wild.',
        outcome: [
          [HEALTH, 1],
          [
            [HEALTH, 1],
            [SUPPLY, -1]
          ],
          [SPIRIT, 1],
          [MOMENTUM, 1],
          [UNDERTAKE_A_JOURNEY, 1]
        ],
        take: 1
      },
      miss: {
        message: 'You take no comfort.',
        outcome: [
          [MOVE, PAY_THE_PRICE]
        ],
        take: 1
      }
    }
  },
  {
    name: UNDERTAKE_A_JOURNEY,
    type: ADVENTURE,
    desc: 'When you travel across hazardous or unfamiliar lands, set the rank of your journey.',
    roll: '',
    result: ''
  },
  {
    name: 'Reach Your Destination',
    type: 'progress',
    desc: 'When your journey comes to an end, roll the challenge dice and compare to your progress.Momentum is ignored on this roll.',
    roll: '',
    result: ''
  },
  {
    name: 'Compel',
    type: 'relationship',
    desc: 'When you attempt to persuade someone to do something, envision your approach and roll.',
    roll: '',
    result: ''
  },
  {
    name: 'Sojourn',
    type: 'relationship',
    desc: 'When you spend time in a community seeking assistance.',
    roll: '',
    result: ''
  },
  {
    name: 'Draw the Circle',
    type: 'relationship',
    desc: 'When you challenge someone to a formal duel, or accept a challenge.',
    roll: '',
    result: ''
  },
  {
    name: 'Forge a Bond',
    type: 'relationship',
    desc: 'When you spend significant time with a person or community, stand together to face hardships, or make sacrifices for their cause, you can attempt to create a bond. If you make this move after you successfully Fulfill Your Vow to their benefit, you may reroll any dice.',
    roll: '',
    result: ''
  },
  {
    name: 'Test Your Bond',
    type: 'relationship',
    desc: 'When your bond is tested through conflict, betrayal, or circumstance.',
    roll: '',
    result: ''
  },
  {
    name: 'Aid Your Ally',
    type: 'relationship',
    desc: 'When you Secure an Advantage in direct support of an ally, and score a hit, they(instead of you) can take the benefits of the move. If you are in combat and score a strong hit, you and your ally have initiative.',
    roll: '',
    result: ''
  },
  {
    name: 'Write Your Epilogue',
    type: 'progress',
    desc: 'When you retire from your life as Ironsworn, envision two things: What you hope for, and what you fear. Then, roll the challenge dice and compare to your bonds. Momentum is ignored on this roll.',
    roll: '',
    result: ''
  },
  {
    name: 'Enter the Fray',
    type: 'combat',
    desc: 'When you enter into combat, set the rank of each of your foes, then roll to determine who is in control.',
    roll: '',
    result: ''
  },
  {
    name: 'Strike',
    type: 'combat',
    desc: 'When you have initiative and attack.',
    roll: '',
    result: ''
  },
  {
    name: 'Clash',
    type: 'combat',
    desc: 'WHen your foe has initiative and you fight with them.',
    roll: '',
    result: ''
  },
  {
    name: 'Turn the Tide',
    type: 'combat',
    desc: 'Once per fight, when you risk it all, you may steal initiative from your foe to make a move(not a progress move).',
    roll: '',
    result: ''
  },
  {
    name: 'End the Fight',
    type: 'progress',
    desc: 'When you make a move to take decisive action, and score a strong hit, you may resolve the outcome of this fight. If you do, roll the challenge dice and compare to your progress. Momentum is ignored on this roll',
    roll: '',
    result: ''
  },
  {
    name: 'Battle',
    type: 'combat',
    desc: 'When you fight a battle, and it happens in a blur, envision your objective and roll.',
    roll: '',
    result: ''
  },
  {
    name: 'Endure Harm',
    type: 'suffer',
    desc: 'When you face physical damage, suffer -health equal to your foe’s rank or as appropriate to the situation. If your health is 0, suffer - momentum qual to any remaining - health.',
    roll: '',
    result: ''
  },
  {
    name: 'Face Death',
    type: 'suffer',
    desc: 'When you are brought to the brink of death, and glimpse the world beyond.',
    roll: '',
    result: ''
  },
  {
    name: 'Companion Endure Harm',
    type: 'suffer',
    desc: 'When your companion faces physical damage, they suffer -health equal to the amount of harm inflicted. If your companion’s health is 0, exchange any leftover - health for -momentum.',
    roll: '',
    result: ''
  },
  {
    name: 'Endure Stress',
    type: 'suffer',
    desc: 'When you face mental shock or despair, suffer -spirit equal to your foe’s rank or as appropriate to the situation. If your spirit is 0, suffer - momentum equal to any remaining - spirit.',
    roll: '',
    result: ''
  },
  {
    name: 'Face Desolation',
    type: 'suffer',
    desc: 'When you are brought to the brink of desolation.',
    roll: '',
    result: ''
  },
  {
    name: 'Out of Supply',
    type: 'suffer',
    desc: 'When your supply is exhausted (reduced to 0), mark unprepared. If you suffer additional - supply while unprepared, you must exchange each additional - supply for any combination of - health, -spirit or - momentum as appropriate to the circumstances.',
    roll: '',
    result: ''
  },
  {
    name: 'Face a Setback',
    type: 'suffer',
    desc: 'When your momentum is at its minimum (-6), and you suffer additional - momentum, choose one outcome.',
    roll: '',
    result: ''
  },
  {
    name: 'Swear an Iron Vow',
    type: 'quest',
    desc: 'When you swear upon iron to complete a quest, write your vow and give the quest a rank. Then, roll + heart. If you make this vow to a person or community with whom you share a bond, add + 1.',
    roll: '',
    result: ''
  },
  {
    name: 'Reach a Milestone',
    type: 'quest',
    desc: 'When you make significant progress in your quest by overcoming a critical obstacle, completing a perilous journey, solving a complex mystery, defeating a powerful threat, gaining vital support, or acquiring a crucial item, you may mark progress.',
    roll: '',
    result: ''
  },
  {
    name: 'Fulfill Your Vow',
    type: 'progress',
    desc: 'When you achieve what you believe to be the fulfillment of your vow, roll the challenge dice and compare to your progress. Momentum is ignored on this roll.',
    roll: '',
    result: ''
  },
  {
    name: 'Forsake Your Vow',
    type: 'quest',
    desc: 'When you renounce your quest, betray your promise, or the goal is lost to you, clear the vow and Endure Stress.You suffer - spirit equal to the rank of your quest. If the vow was made to a person or community with whom you share a bond, Test Your Bond when you next meet.',
    roll: '',
    result: ''
  },
  {
    name: 'Advance',
    type: 'quest',
    desc: 'When you focus on your skills, receive training, find inspiration, earn a reward, or gain a companion, you may spend 3 experience to add a new asset, or 2 experience to upgrade an asset.',
    roll: '',
    result: ''
  },
  {
    name: 'Pay the Price',
    type: 'fate',
    desc: 'When you suffer the outcome of a move, choose one outcome.',
    roll: '',
    result: ''
  },
  {
    name: 'Ask the Oracle',
    type: 'fate',
    desc: 'When you seek to resolve questions, discover details in the world, determine how other characters respond, or trigger encounters or events.',
    roll: '',
    result: ''
  }
];

export default moves;
