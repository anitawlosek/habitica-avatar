import { User } from "../types/User";
import { isDefined } from "./helpers";

interface Config {
  subName?: keyof User['preferences']['hair'];
  appearance: User['preferences'];
  ignore?: Record<string, boolean>;
}

export default function formatAppearanceImg(name: keyof User['preferences'], config: Config): string | undefined {
  let s3Key: string | number | undefined;
  const subName = config.subName;
  const appearance = config.appearance;
  const ignore = config.ignore || {};

  switch (name) {
    case 'hair':
      if (isDefined(subName)) {
        if (!appearance.hair[subName] || appearance.hair[subName] === '0') {
          break; // skip adding this hair bit, because it does not exist
        }

        s3Key = appearance.hair[subName];

        if (subName !== 'flower') {
          s3Key = s3Key + '_' + appearance.hair.color;
        }
      }
      break;

    case 'skin':
      s3Key = appearance.skin;

      if (appearance.sleep && !ignore.sleep) {
        s3Key = s3Key + '_sleep';
      }
      break;

    case 'sleep':
      if (!appearance.sleep) {
        return; // skip if user is not asleep
      }

      s3Key = 'zzz';
      break;

    default:
      s3Key = appearance[name] as string;
      break;
  }

  if (!isDefined(s3Key) || s3Key === 'none') {
    return; // return without supplying an image to look up
  }

  return String(s3Key);
}
