import { User } from "../types/User";

interface Appearance {
  hair: User['preferences']['hair'];
  skin?: string;
  sleep?: boolean;
  [key: string]: any;
}

interface Config {
  subName?: string;
  appearance: Appearance;
  ignore?: Record<string, boolean>;
}

export default function formatAppearanceImg(name: string, config: Config): string | undefined {
  let s3Key: string | number | undefined;
  const subName = config.subName;
  const appearance = config.appearance;
  const ignore = config.ignore || {};

  if (name === 'hair') {
    if (!appearance.hair[subName!] || appearance.hair[subName!] === '0') {
      return; // skip adding this hair bit, because it does not exist
    }

    s3Key = appearance.hair[subName!];

    if (subName !== 'flower') {
      s3Key = s3Key + '_' + appearance.hair.color;
    }
  } else if (name === 'skin') {
    s3Key = appearance.skin;

    if (appearance.sleep && !ignore.sleep) {
      s3Key = s3Key + '_sleep';
    }
  } else if (name === 'sleep') {
    if (!appearance.sleep) {
      return; // skip if user is not asleep
    }
    s3Key = 'zzz';
  } else {
    s3Key = appearance[name];
  }

  if (s3Key === 'none') {
    return; // return without supplying an image to look up
  }

  return String(s3Key);
}
