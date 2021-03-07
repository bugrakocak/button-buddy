import hideIconByLayout from './hideIconByLayout';
import setStateStyles from './setStateStyles';

const createInstanceComponent = ({
  mainButton,
  x,
  y,
  name,
  layout,
  state,
  buttonStyle,
  secondaryColor,
}) => {
  const instance = (mainButton as ComponentNode).createInstance();
  instance.layoutAlign = 'STRETCH';
  const instanceComponent = figma.createComponent();
  instanceComponent.layoutMode = 'VERTICAL';
  instanceComponent.counterAxisSizingMode = 'AUTO';
  instanceComponent.fills = [];
  instanceComponent.insertChild(0, instance);
  const color = instance.fills[0]
    ? instance.fills[0].color
    : (instance.findAll((node) => node.type === 'TEXT')[0] as any).fills[0].color;
  setStateStyles(instance, state, buttonStyle, secondaryColor, color);
  instanceComponent.x = x;
  instanceComponent.y = y;
  instanceComponent.name = name;
  return hideIconByLayout(layout, instanceComponent);
};

export default createInstanceComponent;
