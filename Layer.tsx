import React from 'react';
import findS3Src from './lib/find-s3-src';
import formatEquipmentImg from './lib/format-equipment-img';
import formatAppearanceImg from './lib/format-appearance-img';
import findVisualBuff from './lib/find-visual-buff';
import { User } from './types/User';

import { CharacterSpriteConfig } from './lib/character-sprites-config';

interface LayerProps {
  config: CharacterSpriteConfig;
  user: User;
}

const Layer: React.FC<LayerProps> = ({ config, user }) => {
  const appearance = user.preferences;
  const gear = user.items.gear;
  const visualBuff = findVisualBuff(user);

  if (visualBuff && !config.showWhenVisualBuffApplied) {
    return null;
  }

  let s3Key: string | undefined;
  let style: React.CSSProperties = { position: 'absolute', ...(config.style || {}) };

  switch (config.type) {
    case 'buff':
      s3Key = visualBuff;
      break;
    case 'static':
      s3Key = config.name;
      break;
    case 'equipment':
      if (appearance.costume) {
        s3Key = formatEquipmentImg(gear.costume[config.name], { style });
      } else {
        s3Key = formatEquipmentImg(gear.equipped[config.name], { style });
      }

      break;
    case 'appearance':
      const configName = config.name as keyof User['preferences'];
      s3Key = formatAppearanceImg(configName, {
        subName: config.subName,
        appearance,
      });
      break;
    default:
      if (config.itemsKey) {
        s3Key = user.items[config.itemsKey];
      }
      break;
  }

  if (!s3Key) {
    return;
  }

  if (config.prefix) {
    s3Key = config.prefix + s3Key;
  }

  if (config.sizePrefix) {
    s3Key = appearance.size + '_' + s3Key;
  }

  return <img src={findS3Src(s3Key)} style={style} alt={config.name} />;
};

export default Layer;
