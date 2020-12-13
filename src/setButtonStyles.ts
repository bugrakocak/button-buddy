import { rgb } from "color";
import { hexToRgbUnitObject } from "./utils";

const setButtonStyles = (button, buttonStyle, primaryColor) => {
  const rgbUnit = hexToRgbUnitObject(primaryColor);

  if (buttonStyle === 'basicSolid') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
  }

  if (buttonStyle === 'basicOutline') {
    button.fills = [];
    button.strokeWeight = 2;
    button.strokes = [{type: 'SOLID', color: rgbUnit}];
    const textNode = (button.findAll((node) => node.type === 'TEXT')[0] as any);
    textNode.fills = [{type: 'SOLID', color: rgbUnit }];
    const vector = button.findAll((node) => node.type === 'VECTOR')[0] as any;
    vector.fills = [{ type: 'SOLID', color: rgbUnit}];
  }

  if (buttonStyle === 'modern') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
    button.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: .4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL'}]
    const textNode = (button.findAll((node) => node.type === 'TEXT')[0] as any);
    const vector = (button.findAll((node) => node.type === 'VECTOR')[0] as any);
    textNode.fills = [{type: 'SOLID', color: rgbUnit }];
    vector.fills = [{ type: 'SOLID', color: rgbUnit}];
  }

//TODO// Shadow should be 0.3 darker than the original color.
  if (buttonStyle === 'flatShadow') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
    button.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, b: rgbUnit.b * .8 , a: 1}, offset: {x: 0, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }];
  }

  if (buttonStyle === 'glossy') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
    button.effects = [
      {type: 'INNER_SHADOW', color: {r: 0/255, g: 0/255, b: 0/255, a: 0.2}, offset: {x: 0, y: -8}, radius: 10, visible: true, blendMode: 'NORMAL' },
      {type: 'INNER_SHADOW', color: {r: 255/255, g: 255/255, b: 255/255, a: 0.5}, offset: {x: 0, y: 4}, radius: 4, visible: true, blendMode: 'NORMAL' }
    ];
  }

  if (buttonStyle === 'comicLight') {
    button.fills = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
    button.strokeWeight = 2;
    button.strokes = [{type: 'SOLID', color: rgbUnit}];
    button.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]

    const textNode = (button.findAll((node) => node.type === 'TEXT')[0] as any);
    const vector = (button.findAll((node) => node.type === 'VECTOR')[0] as any);
    textNode.fills = [{type: 'SOLID', color: rgbUnit }];
    vector.fills = [{ type: 'SOLID', color: rgbUnit}];
  }

  if (buttonStyle === 'comicBold') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
    button.strokeWeight = 2;
    button.strokes = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
    button.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
  }

  if (buttonStyle === 'fancy') {
    button.fills = [{type: 'SOLID', color: rgbUnit}];
    button.strokeWeight = 2;
    button.strokes = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
    button.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: 0.4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL' }]
  }

  return button;
}

export default setButtonStyles;
