export default function isHabitica(): boolean {
  return typeof window !== 'undefined' && window.location.host === 'habitica.com';
}
