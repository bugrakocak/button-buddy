import { SIZES } from './constants';
import createButtonGroups from './createButtonGroups';

(async () => {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  figma.showUI(__html__, { height: 560, width: 450 });

  const localStyles = figma.getLocalPaintStyles();
  const localColors = localStyles.map((style) => ({
    name: style.name,
    color: (style.paints[0] as any).color,
  }));
  figma.ui.postMessage({ codeMessage: { type: 'render', localColors } });

  interface UIMessage {
    type: string;
    borderRadius: number;
    buttonStyle: string;
    primaryColor: string;
    secondaryColor: string;
    strokeWeight: number;
  }

  figma.ui.onmessage = (message: UIMessage) => {
    const {
      type: messageType,
      borderRadius,
      buttonStyle,
      primaryColor,
      secondaryColor,
      strokeWeight,
    } = message;

    const userStyles = {
      borderRadius,
      buttonStyle,
      primaryColor,
      secondaryColor,
      strokeWeight,
    };

    const instanceNodes: ComponentNode[] = [];
    const mainNodes: ComponentNode[] = [];
    const iconNodes: ComponentNode[] = [];

    if (messageType === 'ui-form-message') {
      SIZES.forEach((size, i) => {
        const { buttonComponent, iconComponent, buttons } = createButtonGroups(size, userStyles, i);

        mainNodes.push(buttonComponent);
        iconNodes.push(iconComponent);
        instanceNodes.push(...buttons);
      });

      const allNodes = [...instanceNodes, ...mainNodes];
      const variants = figma.combineAsVariants(instanceNodes, figma.currentPage);
      variants.name = `${message.buttonStyle} Button`;
      variants.clipsContent = false;

      figma.currentPage.selection = [...mainNodes, ...iconNodes, variants];
      figma.viewport.scrollAndZoomIntoView(allNodes);
    }

    figma.closePlugin(`Created ${message.buttonStyle} buttons 🎉`);
  };
})();
