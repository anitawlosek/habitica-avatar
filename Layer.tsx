import React from 'react';
import findS3Src from './lib/find-s3-src';
import formatEquipmentImg from './lib/format-equipment-img';
import formatAppearanceImg from './lib/format-appearance-img';
import findVisualBuff from './lib/find-visual-buff';
import { User } from './types/User';

interface LayerConfig {
  name: string;
  prefix?: string;
  itemsKey?: string;
  type?: string;
  showWhenVisualBuffApplied?: boolean;
  style?: React.CSSProperties;
  subName?: string;
  sizePrefix?: boolean;
}

interface LayerProps {
  config: LayerConfig;
  user: User;
  ignore?: Record<string, boolean>;
  useClassMode?: boolean;
  forceEquipment?: boolean;
  forceCostume?: boolean;
}

const Layer: React.FC<LayerProps> = ({ config, user, ignore = {}, useClassMode, forceEquipment, forceCostume }) => {
  const appearance = user.preferences;
  const gear = user.items.gear;
  const visualBuff = findVisualBuff(user);

  if (ignore[config.name]) {
    return null;
  }

  if (visualBuff && !config.showWhenVisualBuffApplied && !ignore.visualBuff) {
    return null;
  }

  let s3Key: string | undefined;
  let style: React.CSSProperties = { position: 'absolute', ...(config.style || {}) };

  if (config.type === 'buff') {
    s3Key = visualBuff;
  } else if (config.type === 'static') {
    s3Key = config.name;
  } else if (config.type === 'equipment') {
    if ((appearance.costume && !forceEquipment) || forceCostume) {
      s3Key = formatEquipmentImg(gear.costume[config.name], { style });
    } else {
      s3Key = formatEquipmentImg(gear.equipped[config.name], { style });
    }
  } else if (config.type === 'appearance') {
    s3Key = formatAppearanceImg(config.name, {
      ignore: ignore,
      subName: config.subName,
      appearance: appearance,
    });
  } else if (config.itemsKey) {
    s3Key = user.items[config.itemsKey];
  }

  if (!s3Key) {
    return null;
  }

  if (config.prefix) {
    s3Key = config.prefix + s3Key;
  }

  if (config.sizePrefix) {
    s3Key = appearance.size + '_' + s3Key;
  }

  if (useClassMode) {
    return <div className={s3Key} style={style} />;
  } else {
    return <img src={findS3Src(s3Key)} style={style} alt={config.name} />;
  }
};

export default Layer;
