
import React from 'react';
import { User } from './types/User';
import isHabitica from './lib/is-habitica';
import findS3Src from './lib/find-s3-src';
import CHARACTER_SPRITE_NODES from './lib/character-sprites-config';
import Layer from './Layer';

interface HabiticaAvatarProps {
  user: User;
  ignore?: Record<string, boolean>;
  forceEquipment?: boolean;
  forceCostume?: boolean;
  forceImageMode?: boolean;
  forceClassMode?: boolean;
  style?: React.CSSProperties;
}

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  user,
  ignore = {},
  forceEquipment,
  forceCostume,
  forceImageMode,
  forceClassMode,
  style = {},
}) => {
  const appearance = user.preferences;
  const useClassMode = !forceImageMode && (isHabitica() || forceClassMode);

  // Container style
  const avatarStyle: React.CSSProperties = {
    height: '147px',
    width: '140px',
    position: 'relative',
    boxSizing: 'border-box',
    imageRendering: 'pixelated',
    ...style,
  };

  if (!user.items.currentMount || ignore.mount) {
    avatarStyle.paddingTop = '24.5px';
  }

  if (appearance.background && !ignore.background) {
    if (useClassMode) {
      avatarStyle.background = undefined;
      avatarStyle.backgroundImage = undefined;
      avatarStyle.backgroundColor = undefined;
    } else {
      avatarStyle.backgroundImage = `url("${findS3Src('background_' + appearance.background)}")`;
    }
  }

  // Style for character layers
  const characterSpritesStyle: React.CSSProperties = {
    margin: '0 auto 0 24px',
    width: '90px',
    height: '90px',
  };

  return (
    <div style={avatarStyle} className={useClassMode && appearance.background && !ignore.background ? `background_${appearance.background}` : undefined}>
      <div style={characterSpritesStyle}>
        {CHARACTER_SPRITE_NODES.map((config, idx) => (
          <Layer
            key={idx}
            config={config}
            user={user}
            ignore={ignore}
            useClassMode={useClassMode}
            forceEquipment={forceEquipment}
            forceCostume={forceCostume}
          />
        ))}
   </div>
    </div>
  );
};

export default HabiticaAvatar;
