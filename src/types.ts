export type UnitType = "orc" | "skeleton" | "skeleton-archer" | "soldier" | "swordsman" | "archer";

export type Rarity = "COMMON" | "FINE" | "RARE" | "EPIC" | "LEGENDARY";

export type ModifierType = "ALL_UNITS" | "SPECIFIC_UNIT" | "ECONOMIC" | "DEFENSE" | "UTILITY";

export type CastleStat = "hp" | "counterDamage";

export type UnitStat = "hp" | "damage" | "attacksPerMinute" | "speed" | "attackRange" | "sightRange" | "cost";

export type PlayerStat = "elixir" | "xp" | "gold" | "gems";

export type ModifierDetails =
    | {
          type: "ALL_UNITS";
          target: "ALL";
          stat: UnitStat;
      }
    | {
          type: "SPECIFIC_UNIT";
          target: UnitType;
          stat: UnitStat;
      }
    | {
          type: "ECONOMIC";
          target: "Player";
          stat: PlayerStat;
      }
    | {
          type: "DEFENSE";
          target: "Castle";
          stat: CastleStat;
      };

export type Modifier = ModifierDetails & {
    isPercent: boolean;
    amount: number;
};

export type SkillModifier = Modifier & { levelBonus: number };

export type SkillCard = {
    name: string;
    description: string;
    rarity: Rarity;
    modifier: SkillModifier;
    // image: string;
    // thumb: string;
};

export type PlayerSkillCard = SkillCard & { quantity: number };

// const a: Modifier = {
//     isPercent: true,
//     amount: 10,
//     // type: "ALL_UNITS",
//     // target: 'ALL',
//     // stat: 'damage'
//     type: 'SPECIFIC_UNIT',
//     target: 'skeleton',
//     stat: 'cost'
// }
// a
