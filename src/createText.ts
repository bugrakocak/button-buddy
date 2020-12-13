import { hexToRgbUnitObject } from './utils';

const createText = (hex) => {
  const text = figma.createText();
  text.fontSize = 16;
  text.lineHeight = {
    unit: 'PIXELS',
    value: 24
  };
  text.characters = 'BUTTON';
  text.fontName = {
    family: 'Inter',
    style: 'Bold',
  };
  text.fills = [{type: 'SOLID', color: hexToRgbUnitObject(hex)}];

  return text;
}

export default createText;
