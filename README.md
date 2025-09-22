# habitica-avatar

A React-based fork of the original Habitica avatar library.
This version rewrites the avatar rendering logic using React components and TypeScript, making it easier to use in modern React projects.

## Usage

### npm

```sh
npm install --save habitica-avatar
```

```js
import HabiticaAvatar from 'habitica-avatar';

<HabiticaAvatar user={userObject} />
```

## Advanced options

### Ignore

You can ignore properties, causing them to not render by passing an ignore object.

```js
habiticaAvatar({
  user: user,
  ignore: {
    background: true,
    visualBuff: true,
    mount: true,
    hair: true,
    chair: true,
    back: true, // back equipment
    skin: true,
    shirt: true,
    head_0: true, // outline of head on all avatars
    body: true, // body accessory equipment
    eyewear: true,
    head: true,
    headAccessory: true,
    shield: true, // offhand equipment
    sleep: true,
    weapon: true,
    pet: true
  }
})
```

### Force Costume

By default, the costume will render if the user has the costume feature turned on. You can force the costume to be shown with the `forceCostume` option.

```js
habiticaAvatar({
  user: user,
  forceCostume: true
})
```

### Force Equipment

By default, the equipment will render if the user has the costume feature turned off. You can force the equipment to be shown with the `forceEquipment` option.

```js
habiticaAvatar({
  user: user,
  forceEquipment: true
})
```

## Testing

```sh
npm test
```

## Demo - Storybook

```sh
npm run storybook
```

