
import React from 'react';
import { User } from './types/User';
import findS3Src from './lib/find-s3-src';
import CHARACTER_SPRITE_NODES from './lib/character-sprites-config';
import Layer from './Layer';

interface HabiticaAvatarProps {
  user: User;
  style?: React.CSSProperties;
}

const HabiticaAvatar: React.FC<HabiticaAvatarProps> = ({
  user,
  style = {},
}) => {
  const background = user.preferences.background;

  // Container style
  const avatarStyle: React.CSSProperties = {
    height: '147px',
    width: '140px',
    position: 'relative',
    boxSizing: 'border-box',
    imageRendering: 'pixelated',
    backgroundImage: background && `url("${findS3Src('background_' + background)}")`,
    paddingTop: !user.items.currentMount ? '24.5px' : '0px',
    ...style,
  };

  // Style for character layers
  const characterSpritesStyle: React.CSSProperties = {
    margin: '0 auto 0 24px',
    width: '90px',
    height: '90px',
  };

  return (
    <div style={avatarStyle}>
      <div style={characterSpritesStyle}>
        {CHARACTER_SPRITE_NODES.map((config, idx) => (
          <Layer
            key={idx}
            config={config}
            user={user}
          />
        ))}
   </div>
    </div>
  );
};

export default HabiticaAvatar;
