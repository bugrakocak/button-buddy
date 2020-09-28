var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function hexToRgb(hex) { var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null; }
(() => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
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
        text.fills = [{ type: 'SOLID', color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 } }];
        return text;
    };
    const createButton = ({ borderRadius, style, color, }) => {
        const buttonComponent = figma.createComponent();
        const text = createText(color);
        const vectorRight = createSideIcon(color);
        const vectorLeft = createSideIcon(color);
        vectorLeft.name = 'vectorLeft';
        vectorRight.name = 'vectorRight';
        buttonComponent.name = `${style} / Master`;
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
            buttonComponent.fills = [{ type: 'SOLID', color: { r: 0 / 255, g: 56 / 255, b: 255 / 255 } }];
        }
        return buttonComponent;
    };
    figma.ui.onmessage = msg => {
        const nodes = [];
        if (msg.type === 'button-maker') {
            const buttonCreator = () => createButton({ borderRadius: msg.borderRadius, style: msg.styleValue, color: msg.textColor });
            sizes.forEach(size => {
                if (size === 'small') {
                    const smallMasterClone = buttonCreator();
                    smallMasterClone.y = -200;
                    figma.currentPage.appendChild(smallMasterClone);
                    nodes.push(smallMasterClone);
                    layouts.forEach(layout => {
                        if (layout === 'noIcon') {
                            states.forEach((state, i) => {
                                const clone = buttonCreator();
                                const children = clone.findChildren(node => node.type === 'VECTOR');
                                clone.x = i * 200;
                                clone.name = `${msg.styleValue}/${size}/${layout}/${state}`;
                                children.forEach(c => c.visible = false);
                                figma.currentPage.appendChild(clone);
                                nodes.push(clone);
                            });
                        }
                    });
                }
            });
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        figma.closePlugin();
    };
}))();
