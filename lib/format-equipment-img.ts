const EQUIPMENT_WITH_CUSTOM_STYLES: Record<string, React.CSSProperties> = {
  weapon_special_critical: {
    marginLeft: '-12px',
    marginTop: '12px',
  },
};

export default function formatEquipmentImg(
  equipment: string,
  img: { style: React.CSSProperties }
): string | undefined {
  if (!equipment || equipment.indexOf('base_0') > -1) {
    return;
  }

  if (equipment in EQUIPMENT_WITH_CUSTOM_STYLES) {
    Object.assign(img.style, EQUIPMENT_WITH_CUSTOM_STYLES[equipment]);
  }

  return equipment;
}
