import { LAYOUTS } from "./constants";
import createButtonsByState from "./createButtonsByState";

const createButtonsByLayout = ({ button, size, yOffset, xOffset, styles }) => {
  const { style, secondaryColor } =  styles;
  const nodes: ComponentNode[] = [];

  LAYOUTS.forEach(layout => {
    if (layout === 'WITHOUT_ICON') {
      const nameBuilder = (state) => `Size=${size.toLowerCase()}, State=${state}, Icon=false`;
      const buttons = createButtonsByState(button, style, layout, secondaryColor, yOffset, xOffset, nameBuilder);
      nodes.push(...buttons);
    }

    if (layout === 'WITH_ICON') {
      const nameBuilder = (state) => `Size=${size.toLowerCase()}, State=${state}, Icon=true`;
      const buttons = createButtonsByState(button, style, layout, secondaryColor, yOffset + 200, xOffset, nameBuilder);
      nodes.push(...buttons);
    }
  })

  return nodes;
}

export default createButtonsByLayout;
