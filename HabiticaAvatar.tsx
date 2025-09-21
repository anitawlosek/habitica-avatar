import React, { useMemo } from 'react';
import Layer, { LayerConfig } from './Layer';
import CHARACTER_SPRITE_NODES from './lib/character-sprites-config';
import findS3Src from './lib/find-s3-src';

export interface HabiticaAvatarProps {
  user: any;
  ignore?: Record<string, boolean>;
  forceEquipment?: boolean;
  forceCostume?: boolean;
  forceImageMode?: boolean;
  forceClassMode?: boolean;
  containerStyle?: React.CSSProperties;
}

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  user,
  ignore = {},
  forceEquipment,
  forceCostume,
  forceImageMode,
  forceClassMode,
  containerStyle = {},
}) => {
  const appearance = user.preferences;
  const useClass = !forceImageMode && (typeof window !== 'undefined' && window.location && window.location.host === 'habitica.com' || forceClassMode);

  const avatarContainerStyle: React.CSSProperties = {
    height: '147px',
    width: '140px',
    position: 'relative',
    boxSizing: 'border-box',
    imageRendering: 'pixelated',
    ...( (!user.items.currentMount || ignore.mount) ? { paddingTop: '24.5px' } : {} ),
    ...containerStyle,
  };

  if (appearance.background && !ignore.background && useClass) {
    avatarContainerStyle.background = undefined;
  } else if (appearance.background && !ignore.background) {
    avatarContainerStyle.backgroundImage = `url("${findS3Src('background_' + appearance.background)}")`;
  }

  const characterSpritesStyle: React.CSSProperties = {
    margin: '0 auto 0 24px',
    width: '90px',
    height: '90px',
  };

  const layers = useMemo(() =>
    (CHARACTER_SPRITE_NODES as LayerConfig[]).map(config =>
      <Layer
        key={config.name}
        config={config}
        user={user}
        ignore={ignore}
        forceEquipment={forceEquipment}
        forceCostume={forceCostume}
        useClassMode={!!useClass}
      />
    ), [user, ignore, !!forceEquipment, !!forceCostume, useClass]
  );

  return (
    <div style={avatarContainerStyle} className={useClass && appearance.background && !ignore.background ? `background_${appearance.background}` : undefined}>
      <div style={characterSpritesStyle}>
        {layers}
      </div>
    </div>
  );
};

export default HabiticaAvatar;
