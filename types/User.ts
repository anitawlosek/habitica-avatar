export interface User {
  preferences: {
    costume?: boolean;
    size?: string;
    hair: {
      [key: string]: string | number | undefined;
      color?: string;
    };
    [key: string]: any;
  };
  items: {
    gear: {
      costume: Record<string, string>;
      equipped: Record<string, string>;
    };
    [key: string]: any;
  };
  stats: {
    buffs: Record<string, boolean>;
    class?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
