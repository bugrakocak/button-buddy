import Color from 'color';

const hexToRgbUnitObject = (hex) => Color(hex).rgb().unitObject();
const rgbUnitObjectToHex = ({r, g, b}) => Color({ r: r * 255, g: g * 255, b: b * 255 }).hex();

(async () => {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  figma.showUI(__html__, { height: 560, width: 450 });

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
  const states = ['idle', 'hover', 'active', 'disabled', 'focus'];
  const layouts = ['withoutIcon', 'withIcon'];

  const iconsBySize = {
    small: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'><defs/><path fill='${color}' fill-rule='evenodd' d='M8 15A7 7 0 108 1a7 7 0 000 14zm3.244-8.131a.875.875 0 00-1.238-1.238L7.125 8.513 5.994 7.38A.875.875 0 004.756 8.62l1.75 1.75a.875.875 0 001.238 0l3.5-3.5z' clip-rule='evenodd'/></svg>`,
    medium: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'><defs/><path fill='${color}' fill-rule='evenodd' d='M12 22a10 10 0 100-20 10 10 0 000 20zm4.634-11.616a1.25 1.25 0 00-1.768-1.768l-4.116 4.117-1.616-1.617a1.25 1.25 0 00-1.768 1.768l2.5 2.5a1.25 1.25 0 001.768 0l5-5z' clip-rule='evenodd'/></svg>`,
    large: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32'><defs/><path fill='${color}' fill-rule='evenodd' d='M16 30a14 14 0 100-28 14 14 0 000 28zm6.487-16.263a1.75 1.75 0 00-2.474-2.474l-5.763 5.763-2.263-2.263a1.75 1.75 0 00-2.474 2.474l3.5 3.5a1.75 1.75 0 002.474 0l7-7z' clip-rule='evenodd'/></svg>`,
  }

  const createSideIcon = (color, size, name) => {
    const iconNode = figma.createNodeFromSvg(iconsBySize[size](color));
    iconNode.name = name;
    return iconNode;
  };

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

  const createButton = ({ borderRadius, style, textColor, size, strokeWeight, buttonColor }) => {
    const buttonComponent = figma.createComponent();
    const text = createText(textColor);

    buttonComponent.name = `${style} Base`;
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

    const rgbUnit = hexToRgbUnitObject(buttonColor);

    if (style === 'basicSolid') {
      buttonComponent.fills = [{type: 'SOLID', color: rgbUnit}];
    }

    if (style === 'basicOutline') {
      buttonComponent.fills = [];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: rgbUnit}];
    }

    if (style === 'modern') {
      buttonComponent.fills = [{type: 'SOLID', color: rgbUnit}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: .4}, offset: {x: 0, y: 4}, radius: 16, visible: true, blendMode: 'NORMAL'}]
    }
//TODO// Adjust the shadow brightness based on the original color's threshold. OR work with HSL
    if (style === 'flatShadow') {
      buttonComponent.fills = [{type: 'SOLID', color: rgbUnit}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, b: rgbUnit.b * .8 , a: 1}, offset: {x: 0, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }];
    }

//TODO// Gradient is vertical but it's position is off on x axis.
    if (style === 'softGradient') {

      buttonComponent.fills = [{type: 'GRADIENT_LINEAR',
      gradientTransform: [
        [0, 1, -1],
        [1, 0, 0]
      ],
          gradientStops: [
            {
              position: 0,
              color: {...rgbUnit, a: 1},
            },
            {
              position: 1,
              color: {...rgbUnit, b: rgbUnit.b * .6, a: 1},
            }
          ],
      }];
      console.log(buttonComponent.fills);
    }

    if (style === 'glossy') {
      buttonComponent.fills = [{type: 'SOLID', color: rgbUnit}];
      buttonComponent.effects = [
        {type: 'INNER_SHADOW', color: {r: 0/255, g: 0/255, b: 0/255, a: 0.2}, offset: {x: 0, y: -8}, radius: 10, visible: true, blendMode: 'NORMAL' },
        {type: 'INNER_SHADOW', color: {r: 255/255, g: 255/255, b: 255/255, a: 0.5}, offset: {x: 0, y: 4}, radius: 4, visible: true, blendMode: 'NORMAL' }
      ];
    }

    if (style === 'comicLight') {
      buttonComponent.fills = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: rgbUnit}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
    }

    if (style === 'comicBold') {
      buttonComponent.fills = [{type: 'SOLID', color: rgbUnit}];
      buttonComponent.strokeWeight = strokeWeight;
      buttonComponent.strokes = [{type: 'SOLID', color: {r: 255/255, g: 255/255, b: 255/255}}];
      buttonComponent.effects = [{type: 'DROP_SHADOW', color: {...rgbUnit, a: 1}, offset: {x: -4, y: 4}, radius: 0, visible: true, blendMode: 'NORMAL' }]
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
    const icon = component.findOne(n => n.name === 'Icon');

    if (layout === 'withoutIcon') {
      icon.visible = false;
    }

    if (layout === 'withIcon') {
      icon.visible = true;
    }

    return component;
  }

  const setPropertiesByState = (instance, state, rgbUnit) => {
    if (state === 'hover') {
      instance.fills = [{ type: 'SOLID', color: hexToRgbUnitObject(Color(rgbUnitObjectToHex(rgbUnit)).darken(0.4)) }];
    }

    if (state === 'disabled') {
      instance.opacity = 0.4;
    }

    if (state === 'active') {
      instance.fills = [{ type: 'SOLID', color: hexToRgbUnitObject(Color(rgbUnitObjectToHex(rgbUnit)).darken(0.4)) }];
    }
  }

  const createInstanceComponent = ({ main, x, y, name, layout, state }) => {
    let instance = main.createInstance();
    const instanceComponent = figma.createComponent();
    instanceComponent.layoutMode = 'VERTICAL';
    instanceComponent.counterAxisSizingMode = 'AUTO';
    instanceComponent.fills = [];
    instanceComponent.insertChild(0, instance);
    setPropertiesByState(instance, state,instance.fills[0].color);
    instanceComponent.x = x;
    instanceComponent.y = y;
    instanceComponent.name = name;
    return hideIconByLayout(layout, instanceComponent);
  }

  const buttonCreator = ({ size, msg }: { size?: string; msg: any }) => createButton({
    borderRadius: msg.borderRadius,
    style: msg.styleValue,
    textColor: msg.textColor,
    strokeWeight: msg.strokeWeight,
    buttonColor: msg.buttonColor,
    size
  });

  const adjustButtonBySize = (size, msg, sizeIndex) => {
    const nodes: SceneNode[] = [];
    const button = buttonCreator({ size, msg });
    button.name = `${msg.styleValue} Base`;
    const baseY = sizeIndex * 900;
    const instanceY = 200 + baseY;
    button.y = baseY;
    nodes.push(button);

    layouts.forEach(layout => {
      if (layout === 'withoutIcon') {
        states.forEach((state, i) => {
          const name = `${msg.styleValue} / ${size} / ${state} / false`;
          const instanceComponent = createInstanceComponent({ main: button, x: i * 300, y: instanceY, name, layout, state });
          figma.currentPage.appendChild(instanceComponent);
          nodes.push(instanceComponent);
        })
      }

      if (layout === 'withIcon') {
        states.forEach((state, i) => {
          const name = `${msg.styleValue} Button / ${size} / ${state} / true `;
          const instanceComponent = createInstanceComponent({ main: button, x: i * 300, y: instanceY + 200, name, layout, state });
          figma.currentPage.appendChild(instanceComponent);
          nodes.push(instanceComponent);
        })
      }
    })

    return nodes;
  }

  figma.ui.onmessage = msg => {
    let nodes: SceneNode[] = [];
    if (msg.type === 'button-maker') {

      sizes.forEach((size, i) => {
        const buttons = adjustButtonBySize(size, msg, i);
        nodes = nodes.concat(buttons);
      })

      figma.currentPage.selection = nodes;
      // figma.combineAsVariants(figma.currentPage.selection, parent)
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    figma.closePlugin(`Created ${msg.styleValue} buttons 🎉`);
  };
})();
