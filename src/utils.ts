import Color from 'color';

const hexToRgbUnitObject = (hex) => Color(hex).rgb().unitObject();
const rgbUnitObjectToHex = ({ r, g, b }) => Color({ r: r * 255, g: g * 255, b: b * 255 }).hex();

export { hexToRgbUnitObject, rgbUnitObjectToHex };
