import { hexToRgbUnitObject } from './utils';

const createText = ({ fontSize, lineHeight, color }) => {
  const text = figma.createText();
  text.fontSize = fontSize;
  text.lineHeight = lineHeight;
  text.characters = 'BUTTON';
  text.fontName = {
    family: 'Inter',
    style: 'Bold',
  };
  text.fills = [{type: 'SOLID', color: hexToRgbUnitObject(color)}];

  return text;
}

export default createText;
