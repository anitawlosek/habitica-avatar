const S3 = 'https://s3.amazonaws.com/habitica-assets/mobileApp/images/';

const GIFS: Record<string, boolean> = [
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
  'background_airship',
  'background_clocktower',
  'background_steamworks',
].reduce((obj, value) => {
  obj[value] = true;
  
  return obj;
}, {} as Record<string, boolean>);

export default function findS3Src(value: string): string {
  let ext = 'png';

  if (GIFS[value]) {
    ext = 'gif';
  }
  return S3 + value + '.' + ext;
}
