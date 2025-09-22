const VISUAL_BUFFS: Record<string, string> = {
  snowball: 'snowman',
  spookySparkles: 'ghost',
  shinySeed: 'avatar_floral',
  seafoam: 'seafoam_star',
};

interface User {
  stats: {
    buffs: Record<string, boolean>;
    class?: string;
  };
}

export default function findVisualBuff(user: User): string | undefined {
  let buffKey: string | undefined;
  let buff: string | undefined;

  Object.keys(VISUAL_BUFFS).forEach((key) => {
    if (user.stats.buffs[key]) {
      buffKey = key;
    }
  });

  if (buffKey) {
    buff = VISUAL_BUFFS[buffKey];
    
    if (buffKey === 'shinySeed' && user.stats.class) {
      buff = buff + '_' + user.stats.class;
    }
  }

  return buff;
}
