interface Appearance {
  hair: Record<string, string> & { color?: string };
  skin?: string;
  sleep?: boolean;
  [key: string]: any;
}

interface FormatAppearanceConfig {
  subName?: string;
  appearance: Appearance;
  ignore?: Record<string, boolean>;
}

export default function formatAppearanceImg(
  name: string,
  config: FormatAppearanceConfig
): string | undefined {
  let s3Key: string | undefined;
  const { subName, appearance, ignore = {} } = config;

  if (name === 'hair') {
    if (!appearance.hair[subName!] || appearance.hair[subName!] === '0') {
      return;
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
      return;
    }
    s3Key = 'zzz';
  } else {
    s3Key = appearance[name];
  }

  if (s3Key === 'none') {
    return;
  }

  return String(s3Key);
}
