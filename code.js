// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
function hexToRgb(hex) { var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null; }
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    });
}
main().then(() => {
    figma.showUI(__html__);
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    const createIcon = (color) => {
        const icon = figma.createNodeFromSvg(`<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.6A9.6 9.6 0 1010 .4a9.6 9.6 0 000 19.2zm4.448-11.152a1.2 1.2 0 00-1.696-1.696L8.8 10.703 7.248 9.152a1.2 1.2 0 00-1.696 1.696l2.4 2.4a1.2 1.2 0 001.696 0l4.8-4.8z" fill="${color}"/></svg>`);
        icon.layoutMode = "HORIZONTAL";
        icon.name = "bugra";
        icon.counterAxisSizingMode = "AUTO";
        icon.verticalPadding = 2;
        icon.horizontalPadding = 2;
        return icon;
    };
    figma.ui.onmessage = msg => {
        if (msg.type === 'create-rectangles') {
            const nodes = [];
            for (let i = 0; i < msg.count; i++) {
                const rect = figma.createComponent();
                rect.name = `${msg.styleValue} / Master`;
                const text = figma.createText();
                const vectorRight = createIcon(msg.textColor);
                const vectorLeft = createIcon(msg.textColor);
                text.fontSize = 16;
                text.lineHeight = {
                    unit: "PIXELS",
                    value: 24
                };
                text.characters = "BUTTON";
                const rgb = hexToRgb(msg.textColor);
                text.fills = [{ type: 'SOLID', color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 } }];
                console.log(rgb);
                console.log([{ type: 'SOLID', color: { r: Number(`${rgb.r}`) / 255, g: Number(`${rgb.g}`) / 255, b: Number(`${rgb.b}`) / 255 } }]);
                rect.x = i * 150;
                rect.layoutMode = "HORIZONTAL";
                rect.counterAxisSizingMode = "AUTO";
                rect.horizontalPadding = 24;
                rect.verticalPadding = 12;
                rect.itemSpacing = 4;
                rect.cornerRadius = msg.borderRadius;
                rect.insertChild(0, vectorLeft);
                rect.insertChild(1, text);
                rect.insertChild(2, vectorRight);
                if (msg.styleValue === "basic-solid") {
                    rect.fills = [{ type: 'SOLID', color: { r: 0 / 255, g: 56 / 255, b: 255 / 255 } }];
                }
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
        figma.closePlugin();
    };
});
