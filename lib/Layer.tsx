import React from 'react';
import findS3Src from './find-s3-src';
import formatEquipmentImg from './format-equipment-img';
import formatAppearanceImg from './format-appearance-img';
import findVisualBuff from './find-visual-buff';

export interface LayerConfig {
  name: string;
  type?: string;
  subName?: string;
  prefix?: string;
  sizePrefix?: boolean;
  style?: React.CSSProperties;
  showWhenVisualBuffApplied?: boolean;
  itemsKey?: string;
}

export interface LayerProps {
  config: LayerConfig;
  user: any;
  ignore?: Record<string, boolean>;
  forceEquipment?: boolean;
  forceCostume?: boolean;
  useClassMode: boolean;
}

const Layer: React.FC<LayerProps> = ({
  config,
  user,
  ignore = {},
  forceEquipment,
  forceCostume,
  useClassMode,
}) => {
  const appearance = user.preferences;
  const gear = user.items.gear;
  const visualBuff = findVisualBuff(user);
  let s3Key: string | undefined;

  if (ignore[config.name]) return null;
  if (visualBuff && !config.showWhenVisualBuffApplied && !ignore.visualBuff) return null;

  let style: React.CSSProperties = { position: 'absolute', ...(config.style || {}) };

  if (config.type === 'buff') {
    s3Key = visualBuff;
  } else if (config.type === 'static') {
    s3Key = config.name;
  } else if (config.type === 'equipment') {
    if ((appearance.costume && !forceEquipment) || forceCostume) {
      s3Key = formatEquipmentImg(gear.costume[config.name], {});
    } else {
      s3Key = formatEquipmentImg(gear.equipped[config.name], {});
    }
  } else if (config.type === 'appearance') {
    s3Key = formatAppearanceImg(config.name, {
      ignore,
      subName: config.subName,
      appearance,
    });
  } else if (config.itemsKey) {
    s3Key = user.items[config.itemsKey];
  }

  if (!s3Key) return null;
  if (config.prefix) s3Key = config.prefix + s3Key;
  if (config.sizePrefix) s3Key = appearance.size + '_' + s3Key;

  if (useClassMode) {
    return <div className={s3Key} style={style} />;
  } else {
    return <img src={findS3Src(s3Key)} style={style} alt={config.name} />;
  }
};

export default Layer;
