import sizeStyles from './sizeStyles';

const createBaseButton = ({ styles, size, y }) => {
  const { buttonStyle, strokeWeight, borderRadius } = styles;

  const sizeStyle = sizeStyles[size];

  const button = figma.createComponent();
  button.layoutMode = 'VERTICAL';
  button.counterAxisSizingMode = 'AUTO';
  button.cornerRadius = borderRadius;
  button.strokeWeight = strokeWeight;
  button.paddingTop = sizeStyle.paddingTop;
  button.paddingBottom = sizeStyle.paddingBottom;
  button.paddingLeft = sizeStyle.paddingLeft;
  button.paddingRight = sizeStyle.paddingRight;
  button.y = y;
  button.name = `_${buttonStyle} ${size.toLowerCase()} Base`;

  return button;
};

export default createBaseButton;
