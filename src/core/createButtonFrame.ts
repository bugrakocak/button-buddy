const createButtonFrame = () => {
  const frame = figma.createFrame();
  frame.name = 'Content';
  frame.layoutMode = 'HORIZONTAL';
  frame.counterAxisSizingMode = 'AUTO';
  frame.layoutAlign = 'STRETCH';
  frame.itemSpacing = 8;
  frame.fills = [];
  return frame;
}

export default createButtonFrame;
