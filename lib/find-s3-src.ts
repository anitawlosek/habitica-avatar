const S3 = 'https://s3.amazonaws.com/habitica-assets/mobileApp/images/';

const GIFS = [
  'broad_armor_special_0',
  'slim_armor_special_0',
  'broad_armor_special_1',
  'slim_armor_special_1',
  'head_special_0',
  'head_special_1',
  'shield_special_0',
  'weapon_special_0',
  'weapon_special_critical',
  'Pet-Wolf-Cerberus',
].reduce<Record<string, boolean>>((obj, value) => {
  obj[value] = true;
  return obj;
}, {});

export default function findS3Src(value: string): string {
  const ext = GIFS[value] ? 'gif' : 'png';
  return `${S3}${value}.${ext}`;
}
