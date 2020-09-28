function hexToRgb(hex) {  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);  return result ? {    r: parseInt(result[1], 16),    g: parseInt(result[2], 16),    b: parseInt(result[3], 16)  } : null;}

(async () => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

  figma.showUI(__html__);

  const sizes = ['small', 'medium', 'large'];
  const states = ['empty', 'hover', 'disabled', 'focus'];
  const layouts = ['noIcon', 'rightIcon', 'leftIcon'];

  const createSideIcon = (color) => {
    const iconNode = figma.createNodeFromSvg(`<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.6A9.6 9.6 0 1010 .4a9.6 9.6 0 000 19.2zm4.448-11.152a1.2 1.2 0 00-1.696-1.696L8.8 10.703 7.248 9.152a1.2 1.2 0 00-1.696 1.696l2.4 2.4a1.2 1.2 0 001.696 0l4.8-4.8z" fill="${color}"/></svg>`);
    iconNode.layoutMode = "HORIZONTAL";
    iconNode.name = "sideIcon";
    iconNode.counterAxisSizingMode = "AUTO";
    iconNode.verticalPadding = 2;
    iconNode.horizontalPadding = 2;
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
    const rgb = hexToRgb(hexColor);
    text.fills = [{type: 'SOLID', color: {r: rgb.r/255, g: rgb.g/255, b: rgb.b/255}}];
    return text;
  }

  const createButton = ({ borderRadius, style, color,  }) => {
    const buttonComponent = figma.createComponent();
    const text = createText(color);
    const vectorRight = createSideIcon(color);
    const vectorLeft = createSideIcon(color);
    vectorLeft.name = 'vectorLeft';
    vectorRight.name = 'vectorRight';

    buttonComponent.name = `${style} / Master`
    // buttonComponent.x = i * 150;
    buttonComponent.layoutMode = "HORIZONTAL";
    buttonComponent.counterAxisSizingMode = "AUTO";
    buttonComponent.horizontalPadding = 24;
    buttonComponent.verticalPadding = 12;
    buttonComponent.itemSpacing = 4;
    buttonComponent.cornerRadius = borderRadius;
    buttonComponent.insertChild(0, vectorLeft);
    buttonComponent.insertChild(1, text);
    buttonComponent.insertChild(2, vectorRight);

    if (style === "basic-solid") {
      buttonComponent.fills = [{type: 'SOLID', color: {r: 0/255, g: 56/255, b: 255/255}}];
    }

    return buttonComponent;
  }

  figma.ui.onmessage = msg => {
    const nodes: SceneNode[] = [];
    if (msg.type === 'button-maker') {
      const buttonCreator = () => createButton({ borderRadius: msg.borderRadius, style: msg.styleValue, color: msg.textColor })
      sizes.forEach(size => {
        if (size === 'small') {
          const smallMaster = buttonCreator();
          smallMaster.name = `${msg.styleValue} / ${size} / Master`;
          figma.currentPage.appendChild(smallMaster);
          nodes.push(smallMaster);
          layouts.forEach(layout => {
            if (layout === 'noIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'rightIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 400;
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'leftIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
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
          const smallMaster = buttonCreator();
          smallMaster.name = `${msg.styleValue} / ${size} / Master`;
          smallMaster.y = 1100;
          figma.currentPage.appendChild(smallMaster);
          nodes.push(smallMaster);
          layouts.forEach(layout => {
            if (layout === 'noIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 1100 + 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'rightIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 1100 + 400
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'leftIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
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
          const smallMaster = buttonCreator();
          smallMaster.name = `${msg.styleValue} / ${size} / Master`;
          smallMaster.y = 2200;
          figma.currentPage.appendChild(smallMaster);
          nodes.push(smallMaster);
          layouts.forEach(layout => {
            if (layout === 'noIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 2200 + 200
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'rightIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
                clone.x = i * 300;
                clone.y = 2200 + 400
                clone.name = `${msg.styleValue} / ${size} / ${layout} / ${state}`;
                figma.currentPage.appendChild(clone);
                nodes.push(clone);
              })
            }
            if (layout === 'leftIcon') {
              states.forEach((state, i) => {
                const clone = buttonCreator();
                const children = clone.findChildren(node => node.type === 'VECTOR');
                children.forEach(c => c.visible = false);
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