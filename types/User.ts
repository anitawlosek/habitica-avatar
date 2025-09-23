export type User = {
  items: {
    gear: {
      equipped: Gear;
      costume: Gear;
    };
    currentPet: string;
    currentMount: string;
    [key: string]: any;
  };
  preferences: {
    size: string;
    hair: {
      color: string;
      base: number;
      bangs: number;
      beard: number;
      mustache: number;
      flower: number;
    };
    skin: string;
    shirt: string;
    chair: string;
    costume: boolean;
    sleep: boolean;
    background: string;
  };
  stats: {
    buffs: {
      snowball: boolean;
      spookySparkles: boolean;
      shinySeed: boolean;
      seafoam: boolean;
    };
    class: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export type Gear = {
  [key: string]: string;
}