import Color from "color";
import { hexToRgbUnitObject, rgbUnitObjectToHex } from "../utils";

const setStateStyles = (instance: InstanceNode, state, style, secondaryColor, primaryColorAsRgbUnit) => {
  const primaryColor = rgbUnitObjectToHex(primaryColorAsRgbUnit);
  if (state === 'HOVER' || state === 'ACTIVE') {
    const colorDarken = hexToRgbUnitObject(Color(primaryColor).darken(0.4));
    instance.fills = [{ type: 'SOLID', color: colorDarken }];

    if (style === 'basicOutline') {
      const color = primaryColorAsRgbUnit;
      const text = (instance.findAll((node) => node.type === 'TEXT')[0] as any);
      const vector = (instance.findAll((node) => node.type === 'VECTOR')[0] as any);
      instance.fills = [{ type: 'SOLID', color: color }];
      text.fills = [{ type: 'SOLID', color: hexToRgbUnitObject(secondaryColor)}];
      vector.fills = [{ type: 'SOLID', color: hexToRgbUnitObject(secondaryColor)}];
    }

    if (style === 'comicLight' || style === 'comicBold') {
      const color = primaryColorAsRgbUnit;
      instance.fills = [{ type: 'SOLID', color: color }];
      instance.effects = []
    }
  }

  if (state === 'DISABLED') {
    instance.opacity = 0.4;
  }

  if (state === 'FOCUS') {
    instance.strokes = [{ type: 'SOLID', color: hexToRgbUnitObject(Color(primaryColor).lighten(0.4)) }],
    instance.strokeWeight = 4,
    instance.strokeAlign = 'OUTSIDE';
  }
}

export default setStateStyles;
