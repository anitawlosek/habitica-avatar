import { User } from "../types/User";

type BuffKey = keyof User['stats']['buffs'];

const VISUAL_BUFFS: Record<BuffKey, string> = {
  snowball: 'snowman',
  spookySparkles: 'ghost',
  shinySeed: 'avatar_floral',
  seafoam: 'seafoam_star',
};

export default function findVisualBuff(user: User): string | undefined {
  let buffKey: BuffKey | undefined;
  let buff: string | undefined;

  Object.keys(VISUAL_BUFFS).forEach((key) => {
    const buffKeyCandidate = key as BuffKey;
    
    if (user.stats.buffs[buffKeyCandidate]) {
      buffKey = buffKeyCandidate;
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
