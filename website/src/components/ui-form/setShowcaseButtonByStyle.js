// const setButtonStyles = (button, buttonStyle, primaryColor) => {

//   if (buttonStyle === 'basicSolid') {
//     button.style.backgroundColor = primaryColor;
//   }

//   if (buttonStyle === 'basicOutline') {
//     button.style.backgroundColor = '';
//     button.style.borderWidth = '2px';
//     button.style.borderColor = primaryColor;
//     button.style.color = primaryColor;
//   }

//   if (buttonStyle === 'modern') {
//     button.style.backgroundColor = primaryColor;
//     button.style.boxShadow = `0 4px rgba(${primaryColorasRgb, 0.4})`
//     button.effects = [{type: 'DROP_SHADOW', color: {...primaryColorAsRgbUnit, a: .4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL'}]
//   }

// //TODO// Shadow should be 0.3 darker than the original color.
//   if (buttonStyle === 'flatShadow') {
//     button.style.backgroundColor = primaryColor;
//     button.effects = [{type: 'DROP_SHADOW', color: {...primaryColorAsRgbUnit, b: primaryColorAsRgbUnit.b * .8 , a: 1}, offset: {x: 0, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }];
//   }

//   if (buttonStyle === 'glossy') {
//     button.style.backgroundColor = primaryColor;
//     button.effects = [
//       {type: 'INNER_SHADOW', color: {r: 0/255, g: 0/255, b: 0/255, a: 0.2}, offset: {x: 0, y: -8}, radius: 10, visible: true, blendMode: 'NORMAL' },
//       {type: 'INNER_SHADOW', color: {r: 255/255, g: 255/255, b: 255/255, a: 0.5}, offset: {x: 0, y: 4}, radius: 4, visible: true, blendMode: 'NORMAL' }
//     ];
//   }

//   if (buttonStyle === 'comicLight') {
//     button.style.backgroundColor = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
//     button.style.borderWidth = 2;
//     button.style.borderColor = primaryColor;
//     button.effects = [{type: 'DROP_SHADOW', color: {...primaryColorAsRgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]

//     const textNode = (button.findAll((node) => node.type === 'TEXT')[0] as any);
//     const vector = (button.findAll((node) => node.type === 'VECTOR')[0] as any);
//     button.style.color = [{type: 'SOLID', color: primaryColorAsRgbUnit }];
//     vector.fills = [{ type: 'SOLID', color: primaryColorAsRgbUnit}];
//   }

//   if (buttonStyle === 'comicBold') {
//     button.style.backgroundColor = primaryColor;
//     button.style.borderWidth = 2;
//     button.style.borderColor = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
//     button.effects = [{type: 'DROP_SHADOW', color: {...primaryColorAsRgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
//   }

//   if (buttonStyle === 'fancy') {
//     button.style.backgroundColor = primaryColor;
//     button.style.borderWidth = 2;
//     button.style.borderColor = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
//     button.effects = [{type: 'DROP_SHADOW', color: {...primaryColorAsRgbUnit, a: 0.4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL' }]
//   }

//   return button;
// }

// export default setButtonStyles;
