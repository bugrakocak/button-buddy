import { STATES } from "./constants";
import createInstanceComponent from "./createInstanceComponent";

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

export default createButtonsByState;
