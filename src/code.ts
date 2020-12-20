import Color from 'color';
import setButtonStyles from './setButtonStyles';
import sizeStyles from './sizeStyles';
import iconsBySize from './iconsBySize';
import createText from './createText';
import { hexToRgbUnitObject, rgbUnitObjectToHex } from './utils';
import { LAYOUTS, SIZES, STATES, GAP_BETWEEN_LAYOUTS, GAP_BETWEEN_MAIN_BUTTON_AND_INSTANCE } from './constants';

(async () => {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  figma.showUI(__html__, { height: 560, width: 450 });

  const createSideIcon = (color, size, name, y) => {
    const iconNode = figma.createNodeFromSvg(iconsBySize[size](color));
    iconNode.name = name;
    const component = figma.createComponent();
    component.name = `${name} / ${size.toLowerCase()}`;
    const iconSize = sizeStyles[size].iconFrameSize;
    component.resize(iconSize, iconSize)
    component.insertChild(0, iconNode);
    component.y = y;
    return component;
  };

  const createButtonComponent = ({ y, size, buttonStyle, primaryColor, secondaryColor, strokeWeight, borderRadius  }) => {
    const button = figma.createComponent();

    const sizeStyle = sizeStyles[size];
    button.layoutMode = 'VERTICAL';
    button.counterAxisSizingMode = 'AUTO';
    button.cornerRadius = borderRadius;
    button.strokeWeight = strokeWeight;
    button.name = `${buttonStyle} ${size.toLowerCase()} Base`;
    button.y = y;
    button.paddingTop = sizeStyle.paddingTop
    button.paddingBottom = sizeStyle.paddingBottom
    button.paddingLeft = sizeStyle.paddingLeft
    button.paddingRight = sizeStyle.paddingRight

    const text = createText(secondaryColor);
    text.fontSize = sizeStyle.fontSize;
    text.lineHeight = sizeStyle.lineHeight;

    const frame = figma.createFrame();
    frame.name = 'Content';
    frame.layoutMode = 'HORIZONTAL';
    frame.counterAxisSizingMode = 'AUTO';
    frame.layoutAlign = 'STRETCH';
    frame.itemSpacing = 8;
    frame.fills = [];

    const sideIcon = createSideIcon(secondaryColor, size, 'Icon', y + 100);
    const sideIconInstance = sideIcon.createInstance();

    frame.insertChild(0, text);
    frame.insertChild(1, sideIconInstance);

    button.insertChild(0, frame);

    return {
      mainComponent: setButtonStyles(button, buttonStyle, primaryColor),
      iconComponent: sideIcon,
    };
  }

  const hideIconByLayout = (layout, component: ComponentNode) => {
    const icon = component.findOne(n => n.name.includes('Icon'));

    if (layout === 'WITHOUT_ICON') {
      icon.visible = false;
    }

    if (layout === 'WITH_ICON') {
      icon.visible = true;
    }

    return component;
  }

  const setStateStyles = (instance: InstanceNode, state, style, secondaryColor, primaryColorAsRgbUnit) => {
    const primaryColor = rgbUnitObjectToHex(primaryColorAsRgbUnit);
    if (state === 'HOVER' || state === 'ACTIVE') {
      const colorDarken = hexToRgbUnitObject(Color(primaryColor).darken(0.4));
      instance.fills = [{ type: 'SOLID', color: colorDarken }];

      if (instance.effects && instance.effects[0] && instance.effects[0].type === 'DROP_SHADOW') {
        const effectClone = instance.effects.slice();
        const newEffect = {...effectClone[0], color: {...colorDarken, a: 1}};
        instance.effects = [newEffect]
      }

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

  const createInstanceComponent = ({ mainButton, x, y, name, layout, state, buttonStyle, secondaryColor }) => {
    let instance = (mainButton as ComponentNode).createInstance();
    instance.layoutAlign = 'STRETCH'
    const instanceComponent = figma.createComponent();
    instanceComponent.layoutMode = 'VERTICAL';
    instanceComponent.counterAxisSizingMode = 'AUTO';
    instanceComponent.fills = [];
    instanceComponent.insertChild(0, instance);
    const color = instance.fills[0] ? instance.fills[0].color : (instance.findAll((node) => node.type === 'TEXT')[0] as any).fills[0].color;
    setStateStyles(instance, state, buttonStyle, secondaryColor, color);
    instanceComponent.x = x;
    instanceComponent.y = y;
    instanceComponent.name = name;
    return hideIconByLayout(layout, instanceComponent);
  }

  const createButtonsByState = (mainButton, buttonStyle, layout, secondaryColor, instanceY, instanceX, nameBuilder) => {
    const nodes: ComponentNode[] = [];
    STATES.forEach((state, i) => {
      const name = nameBuilder(state.toLocaleLowerCase());
      const component = createInstanceComponent({ mainButton, x: (i * 300) + instanceX , y: instanceY, name, layout, state, buttonStyle, secondaryColor });
      figma.currentPage.appendChild(component);
      nodes.push(component);
    })

    return nodes;
  }

  const createButtonsByLayout = (mainButton, size, buttonStyle, secondaryColor, instanceY, instanceX) => {
    const nodes: ComponentNode[] = [];
    LAYOUTS.forEach(layout => {
      if (layout === 'WITHOUT_ICON') {
        const nameBuilder = (state) => `${buttonStyle} Button / ${size.toLowerCase()} / ${state} / false`;
        const newNodes = createButtonsByState(mainButton, buttonStyle, layout, secondaryColor, instanceY, instanceX, nameBuilder);
        nodes.push(...newNodes);
      }

      if (layout === 'WITH_ICON') {
        const nameBuilder = (state) => `${buttonStyle} Button / ${size.toLowerCase()} / ${state} / true`;
        const newNodes = createButtonsByState(mainButton, buttonStyle, layout, secondaryColor, instanceY + 200, instanceX, nameBuilder);
        nodes.push(...newNodes);
      }
    })

    return nodes;
  }

  figma.ui.onmessage = msg => {
    const instanceNodes: ComponentNode[] = [];
    const mainNodes: ComponentNode[] = [];
    const iconNodes: ComponentNode[] = [];

    if (msg.type === 'button-buddy') {
      SIZES.forEach((size, i) => {
        const mainButtonY = i * GAP_BETWEEN_LAYOUTS;
        const { borderRadius, buttonStyle, secondaryColor, strokeWeight, primaryColor} = msg;
        const { mainComponent, iconComponent } = createButtonComponent({ y: mainButtonY, size, buttonStyle, primaryColor, secondaryColor, strokeWeight, borderRadius });
        const instanceY = mainButtonY;
        const instanceX = GAP_BETWEEN_MAIN_BUTTON_AND_INSTANCE;
        const buttons = createButtonsByLayout(mainComponent, size, msg.buttonStyle, msg.secondaryColor, instanceY, instanceX);
        mainNodes.push(mainComponent);
        iconNodes.push(iconComponent);
        instanceNodes.push(...buttons);
      })

      const allNodes = [...instanceNodes, ...mainNodes];

      const variants = figma.combineAsVariants(instanceNodes, figma.currentPage);
      variants.clipsContent = false;
      figma.currentPage.selection = [...mainNodes, ...iconNodes, variants];
      figma.viewport.scrollAndZoomIntoView(allNodes);
    }

    figma.closePlugin(`Created ${msg.buttonStyle} buttons 🎉`);
  };
})();
