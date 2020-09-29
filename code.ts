function hexToRgb(hex) {  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);  return result ? {    r: parseInt(result[1], 16),    g: parseInt(result[2], 16),    b: parseInt(result[3], 16)  } : null;}

(async () => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  figma.showUI(__html__);

  const sizeStyles = {
    small: {
      verticalPadding: 8,
      horizontalPadding: 16,
      iconFrameSize: 16,
      fontSize: 14,
      lineHeight: {
        unit: "PIXELS",
        value: 16
      },
    },
    medium: {
      verticalPadding: 12,
      horizontalPadding: 24,
      iconFrameSize: 24,
      fontSize: 16,
      lineHeight: {
        unit: "PIXELS",
        value: 24
      },
    },
    large: {
      verticalPadding: 16,
      horizontalPadding: 32,
      iconFrameSize: 32,
      fontSize: 24,
      lineHeight: {
        unit: "PIXELS",
        value: 32
      },
    }
  };

  const sizes = ['small', 'medium', 'large'];
  const states = ['idle', 'hover', 'focus', 'active', 'disabled'];
  const layouts = ['textOnly', 'text+IconR', 'text+IconL'];

  const iconsBySize = {
    small: (color) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><defs/><path fill="${color}" fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.244-8.131a.875.875 0 00-1.238-1.238L7.125 8.513 5.994 7.38A.875.875 0 004.756 8.62l1.75 1.75a.875.875 0 001.238 0l3.5-3.5z" clip-rule="evenodd"/></svg>`,
    medium: (color) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><defs/><path fill="${color}" fill-rule="evenodd" d="M12 22a10 10 0 100-20 10 10 0 000 20zm4.634-11.616a1.25 1.25 0 00-1.768-1.768l-4.116 4.117-1.616-1.617a1.25 1.25 0 00-1.768 1.768l2.5 2.5a1.25 1.25 0 001.768 0l5-5z" clip-rule="evenodd"/></svg>`,
    large: (color) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><defs/><path fill="${color}" fill-rule="evenodd" d="M16 30a14 14 0 100-28 14 14 0 000 28zm6.487-16.263a1.75 1.75 0 00-2.474-2.474l-5.763 5.763-2.263-2.263a1.75 1.75 0 00-2.474 2.474l3.5 3.5a1.75 1.75 0 002.474 0l7-7z" clip-rule="evenodd"/></svg>`,
  }

  const createSideIcon = (color, size) => {
    const iconNode = figma.createNodeFromSvg(iconsBySize[size](color));
    iconNode.name = "sideIcon";
    return iconNode;
  };

  const createText = (hexColor) => {
    const text = figma.createText();
    text.fontSize = 16;
    text.lineHeight = {
      unit: "PIXELS",
      value: 24
    };
    text.characters = "BUTTON";
    text.fontName = {
      family: 'Inter',
      style: 'Bold',
    };
    const rgb = hexToRgb(hexColor);
    text.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    return text;
  }

  const createButton = ({ borderRadius, style, color, iconPosition, size }) => {
    const buttonComponent = figma.createComponent();
    const text = createText(color);

    buttonComponent.name = `${style} / Master`
    buttonComponent.layoutMode = "VERTICAL";
    buttonComponent.counterAxisSizingMode = "AUTO";
    buttonComponent.cornerRadius = borderRadius;

    const sizeStyle = sizeStyles[size];
    buttonComponent.verticalPadding = sizeStyle.verticalPadding;
    buttonComponent.horizontalPadding = sizeStyle.horizontalPadding;
    text.fontSize = sizeStyle.fontSize;
    text.lineHeight = sizeStyle.lineHeight;

    const frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.fills = [];
    frame.name = 'Content';

    if (iconPosition === 'leftOnly') {
      const vectorLeft = createSideIcon(color, size);
      frame.insertChild(0, vectorLeft);
      frame.insertChild(1, text);
    }

    if (iconPosition === 'rightOnly') {
      const vectorRight = createSideIcon(color, size);
      frame.insertChild(0, text);
      frame.insertChild(1, vectorRight);
    }

    if (iconPosition === 'bothSide') {
      const vectorRight = createSideIcon(color, size);
      const vectorLeft = createSideIcon(color, size);
      frame.insertChild(0, vectorLeft);
      frame.insertChild(1, text);
      frame.insertChild(2, vectorRight);
    }

    if (!iconPosition) {
      frame.insertChild(0, text);
    }

    buttonComponent.insertChild(0, frame);

    if (style === "basic-solid") {
      buttonComponent.fills = [{type: 'SOLID', color: {r: 0/255, g: 56/255, b: 255/255}}];
    }

    return buttonComponent;
  }

  figma.ui.onmessage = msg => {
    const nodes: SceneNode[] = [];
    if (msg.type === 'button-maker') {
      const buttonCreator = ({ iconPosition, size }: { iconPosition?: string; size?: string; }) => createButton({ borderRadius: msg.borderRadius, style: msg.styleValue, color: msg.textColor, iconPosition, size });
      sizes.forEach(size => {
        if (size === 'small') {
          const smallMaster = buttonCreator({ iconPosition: 'bothSide', size });
          smallMaster.name = `${msg.styleValue} / ${size} / Master`;
          figma.currentPage.appendChild(smallMaster);
          nodes.push(smallMaster);
          layouts.forEach(layout => {
            if (layout === 'textOnly') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ size });
                clone.x = i * 300;
                clone.y = 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'text+IconR') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'rightOnly', size });
                clone.x = i * 300;
                clone.y = 400;
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'text+IconL') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'leftOnly', size });
                clone.x = i * 300;
                clone.y = 600;
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
          })
        }
        if (size === 'medium') {
          const mediumMaster = buttonCreator({ iconPosition: 'bothSide', size });
          mediumMaster.name = `${msg.styleValue} / ${size} / Master`;
          mediumMaster.y = 1100;
          figma.currentPage.appendChild(mediumMaster);
          nodes.push(mediumMaster);
          layouts.forEach(layout => {
            if (layout === 'textOnly') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ size });
                clone.x = i * 300;
                clone.y = 1100 + 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'text+IconR') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'rightOnly', size });
                clone.x = i * 300;
                clone.y = 1100 + 400
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'text+IconL') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'leftOnly', size });
                clone.x = i * 300;
                clone.y = 1100 + 600
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
          })
        }
        if (size === 'large') {
          const largeMaster = buttonCreator({ iconPosition: 'bothSide', size });
          largeMaster.name = `${msg.styleValue} / ${size} / Master`;
          largeMaster.y = 2200;
          figma.currentPage.appendChild(largeMaster);
          nodes.push(largeMaster);
          layouts.forEach(layout => {
            if (layout === 'textOnly') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ size });
                clone.x = i * 300;
                clone.y = 2200 + 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }

            if (layout === 'text+IconR') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'rightOnly', size });
                clone.x = i * 300;
                clone.y = 2200 + 400
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }

            if (layout === 'text+IconL') {
              states.forEach((state, i) => {
                const clone = buttonCreator({ iconPosition: 'leftOnly', size });
                clone.x = i * 300;
                clone.y = 2200 + 600
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
          })
        }
      })

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    figma.closePlugin();
  };
})();