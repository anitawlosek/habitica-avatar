export interface User {
  preferences: {
    background?: string;
    costume?: boolean;
    size?: string;
    hair?: {
      base?: string | number;
      bangs?: string | number;
      mustache?: string | number;
      beard?: string | number;
      flower?: string | number;
      color?: string;
      [key: string]: any;
    };
    skin?: string;
    sleep?: boolean;
    [key: string]: any;
  };
  items: {
    gear: {
      equipped: Record<string, string>;
      costume: Record<string, string>;
    };
    currentMount?: string;
    currentPet?: string;
    [key: string]: any;
  };
  stats: {
    buffs: Record<string, boolean | number>;
    class?: string;
    [key: string]: any;
  };
  [key: string]: any;
}