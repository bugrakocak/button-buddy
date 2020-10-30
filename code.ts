function hexToRgb(hex) {  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);  return result ? {    r: parseInt(result[1], 16),    g: parseInt(result[2], 16),    b: parseInt(result[3], 16)  } : null;}

(async () => {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  figma.showUI(__html__);

  const sizeStyles = {
    small: {
      verticalPadding: 8,
      horizontalPadding: 16,
      iconFrameSize: 16,
      fontSize: 14,
      lineHeight: {
        unit: 'PIXELS',
        value: 16
      },
    },
    medium: {
      verticalPadding: 12,
      horizontalPadding: 24,
      iconFrameSize: 24,
      fontSize: 16,
      lineHeight: {
        unit: 'PIXELS',
        value: 24
      },
    },
    large: {
      verticalPadding: 16,
      horizontalPadding: 32,
      iconFrameSize: 32,
      fontSize: 24,
      lineHeight: {
        unit: 'PIXELS',
        value: 32
      },
    }
  };

  const sizes = ['small', 'medium', 'large'];
  const states = ['idle', 'hover', 'focus', 'active', 'disabled'];
  const layouts = ['Without Icon', 'With Icon'];

  const iconsBySize = {
    small: (textColor) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'><defs/><path fill='${textColor}' fill-rule='evenodd' d='M8 15A7 7 0 108 1a7 7 0 000 14zm3.244-8.131a.875.875 0 00-1.238-1.238L7.125 8.513 5.994 7.38A.875.875 0 004.756 8.62l1.75 1.75a.875.875 0 001.238 0l3.5-3.5z' clip-rule='evenodd'/></svg>`,
    medium: (textColor) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'><defs/><path fill='${textColor}' fill-rule='evenodd' d='M12 22a10 10 0 100-20 10 10 0 000 20zm4.634-11.616a1.25 1.25 0 00-1.768-1.768l-4.116 4.117-1.616-1.617a1.25 1.25 0 00-1.768 1.768l2.5 2.5a1.25 1.25 0 001.768 0l5-5z' clip-rule='evenodd'/></svg>`,
    large: (textColor) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32'><defs/><path fill='${textColor}' fill-rule='evenodd' d='M16 30a14 14 0 100-28 14 14 0 000 28zm6.487-16.263a1.75 1.75 0 00-2.474-2.474l-5.763 5.763-2.263-2.263a1.75 1.75 0 00-2.474 2.474l3.5 3.5a1.75 1.75 0 002.474 0l7-7z' clip-rule='evenodd'/></svg>`,
  }

  const createSideIcon = (textColor, size, name) => {
    const iconNode = figma.createNodeFromSvg(iconsBySize[size](textColor));
    iconNode.name = name;
    return iconNode;
  };

  const createText = (hexColor) => {
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
    const rgb = hexToRgb(hexColor);
    text.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    return text;
  }
  

  const createButton = ({ borderRadius, style, textColor, size, strokeWeight, buttonColor }) => {
    const buttonComponent = figma.createComponent();
    const text = createText(textColor);
    const rgb = hexToRgb(buttonColor);

    buttonComponent.name = `${style} Main`;
    buttonComponent.layoutMode = 'VERTICAL';
    buttonComponent.counterAxisSizingMode = 'AUTO';
    buttonComponent.cornerRadius = borderRadius;
    buttonComponent.strokeWeight = strokeWeight;

    const sizeStyle = sizeStyles[size];
    buttonComponent.verticalPadding = sizeStyle.verticalPadding;
    buttonComponent.horizontalPadding = sizeStyle.horizontalPadding;
    text.fontSize = sizeStyle.fontSize;
    text.lineHeight = sizeStyle.lineHeight;

    const frame = figma.createFrame();
    frame.name = 'Content';
    frame.layoutMode = 'HORIZONTAL';
    frame.counterAxisSizingMode = 'AUTO';
    frame.layoutAlign = 'CENTER';
    frame.itemSpacing = 8;
    frame.fills = [];

    const vector = createSideIcon(textColor, size, 'Icon');
    frame.insertChild(0, text);
    frame.insertChild(1, vector);

    buttonComponent.insertChild(0, frame);
    

    if (style === 'BasicSolid') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    }

    if (style === 'BasicOutline') {
      buttonComponent.fills = [];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    }

    if (style === 'Modern') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255, a: .4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL'}]
    }
//TODO// Adjust the shadow brightness based on the original color's threshold. OR work with HSL
    if (style === 'FlatShadow') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {r: rgb.r/255, g: rgb.g/255, b: (rgb.b/255 *.8) , a: 1}, offset: {x: 0, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }];
    }

//TODO// Gradient is vertical but it's position is off on x axis.
    if (style === 'SoftGradient') {
      
      buttonComponent.fills = [{type: 'GRADIENT_LINEAR',
      gradientTransform: [ 
        [0, 1, -1], 
        [1, 0, 0] 
      ],
          gradientStops: [
            {
              position: 0,
              color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255, a: 1},
            },
            {
              position: 1,
              color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255 * .6, a: 1},
            }
          ],
      }];
    }
    if (style === 'Glossy') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
      buttonComponent.effects = [
        {type: 'INNER_SHADOW', color: {r: 0/255, g: 0/255, b: 0/255, a: 0.2}, offset: {x: 0, y: -8}, radius: 10, visible: true, blendMode: 'NORMAL' },
        {type: 'INNER_SHADOW', color: {r: 255/255, g: 255/255, b: 255/255, a: 0.5}, offset: {x: 0, y: 4}, radius: 4, visible: true, blendMode: 'NORMAL' }
      ];
    }
    if (style === 'ComicLight') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
    }
    if (style === 'ComicBold') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
    }

    // ** Couldn't find a way to make the icon color equal to buttonColor
    // if (style === 'Fillet') {
    //   buttonComponent.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    //   text.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255 * .5}}]
    //   buttonComponent.effects = [{type: 'DROP_SHADOW', color: {r: rgb.r/255, g: rgb.g/255, b: (rgb.b/255 *.8), a: 1}, offset: {x: 0, y: 4}, radius: 10, visible: true, blendMode: 'NORMAL' },];
    //   text.effects = [
    //     {type: 'INNER_SHADOW', color: {r: 0/255, g: 0/255, b: 0/255, a: 0.2}, offset: {x: 0, y: 2}, radius: 1, visible: true, blendMode: 'NORMAL' },
    //     {type: 'DROP_SHADOW', color: {r: 255/255, g: 255/255, b: 255/255, a: 0.3}, offset: {x: 0, y: 1}, radius: 1, visible: true, blendMode: 'NORMAL' }
    //   ];
    // }
    return buttonComponent;
  }


  const hideIconByLayout = (layout, component: ComponentNode) => {
    if (layout === 'Without Icon') {
      const icon = component.findAll(n => n.name === 'Icon');
      icon.forEach(i => i.visible = false);
    }

    if (layout === 'With Icon') {
      const icon = component.findOne(n => n.name === 'Icon');
      icon.visible = true;
    }
    return component;
  }

  const createInstanceComponent = ({ main, x, y, name, layout }) => {
    const instance = main.createInstance();
    const instanceComponent = figma.createComponent();
    instanceComponent.layoutMode = 'VERTICAL';
    instanceComponent.counterAxisSizingMode = 'AUTO';
    instanceComponent.fills = [];
    instanceComponent.insertChild(0, instance);
    instanceComponent.x = x;
    instanceComponent.y = y;
    instanceComponent.name = name;
    return hideIconByLayout(layout, instanceComponent);
  }

  figma.ui.onmessage = msg => {
    const nodes: SceneNode[] = [];
    if (msg.type === 'button-maker') {
      const buttonCreator = ({ size }: { size?: string; }) => createButton({ borderRadius: msg.borderRadius, style: msg.styleValue, textColor: msg.textColor, strokeWeight: msg.strokeWeight, buttonColor: msg.buttonColor, size });
      sizes.forEach(size => {
        if (size === 'small') {
          const smallMain = buttonCreator({ size });
          smallMain.name = `${msg.styleValue} Button Main`;
          nodes.push(smallMain);
          layouts.forEach(layout => {
            if (layout === 'Without Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / false / ${state}`;
                const instanceComponent = createInstanceComponent({ main: smallMain, x: i * 300, y: 200, name, layout })
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }
            if (layout === 'With Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / true / ${state}`;
                const instanceComponent = createInstanceComponent({ main: smallMain, x: i * 300, y: 400, name, layout });
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }
          })
        }
        if (size === 'medium') {
          const mediumMain = buttonCreator({ size });
          mediumMain.name = `${msg.styleValue} Button Main`;
          mediumMain.y = 1100;
          figma.currentPage.appendChild(mediumMain);
          nodes.push(mediumMain);
          layouts.forEach(layout => {
            if (layout === 'Without Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / false / ${state}`;
                const instanceComponent = createInstanceComponent({ main: mediumMain, x: i * 300, y: 1100 + 200, name, layout });
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }
            if (layout === 'With Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / true / ${state}`;
                const instanceComponent = createInstanceComponent({ main: mediumMain, x: i * 300, y: 1100 + 400, name, layout });
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }
          })
        }
        if (size === 'large') {
          const largeMain = buttonCreator({ size });
          largeMain.name = `${msg.styleValue} Button Main`;
          largeMain.y = 2200;
          figma.currentPage.appendChild(largeMain);
          nodes.push(largeMain);
          layouts.forEach(layout => {
            if (layout === 'Without Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / false / ${state}`;
                const instanceComponent = createInstanceComponent({ main: largeMain, x: i * 300, y: 2200 + 200, name, layout });
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }

            if (layout === 'With Icon') {
              states.forEach((state, i) => {
                const name = `${msg.styleValue} Button / ${size} / true / ${state}`;
                const instanceComponent = createInstanceComponent({ main: largeMain, x: i * 300, y: 2200 + 400, name, layout });
                figma.currentPage.appendChild(instanceComponent);
                nodes.push(instanceComponent);
              })
            }
          })
        }
      })

      figma.currentPage.selection = nodes;
      // figma.combineAsVariants(figma.currentPage.selection, parent)
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    figma.closePlugin(`Created ${msg.styleValue} buttons 🎉`);
  };
})();
