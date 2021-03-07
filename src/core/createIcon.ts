import iconsBySize from './iconsBySize';
import sizeStyles from './sizeStyles';

const createIcon = ({ color, size, name, y }) => {
  const iconNode = figma.createNodeFromSvg(iconsBySize[size](color));
  iconNode.name = name;

  const component = figma.createComponent();
  component.name = `${name} / ${size.toLowerCase()}`;

  const iconSize = sizeStyles[size].iconFrameSize;
  component.resize(iconSize, iconSize);
  component.insertChild(0, iconNode);
  component.y = y;
  return component;
};

export default createIcon;
