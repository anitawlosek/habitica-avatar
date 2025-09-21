interface User {
  stats: {
    buffs: Record<string, boolean>;
    class: string;
  };
}

const VISUAL_BUFFS: Record<string, string> = {
  snowball: 'snowman',
  spookySparkles: 'ghost',
  shinySeed: 'avatar_floral',
  seafoam: 'seafoam_star',
};

export default function findVisualBuff(user: User): string | undefined {
  let buffKey: string | undefined;
  let buff: string | undefined;

  for (const key of Object.keys(VISUAL_BUFFS)) {
    if (user.stats.buffs[key]) {
      buffKey = key;
    }
  }

  if (buffKey) {
    buff = VISUAL_BUFFS[buffKey];
    if (buffKey === 'shinySeed') {
      buff = buff + '_' + user.stats.class;
    }
  }

  return buff;
}
