import createBaseButton from './createBaseButton';
import createButtonFrame from './createButtonFrame';
import createIcon from './createIcon';
import createText from './createText';
import sizeStyles from './sizeStyles';
import styleByButtonType from './styleByButtonType';

const createMainComponents = ({ styles, size, buttonYOffset, iconComponentYOffset }) => {
  const { buttonStyle, primaryColor, secondaryColor } = styles;

  const button = createBaseButton({ styles, size, y: buttonYOffset });

  const icon = createIcon({ color: secondaryColor, size, name: 'Icon', y: iconComponentYOffset });
  const iconInstance = icon.createInstance();

  const { fontSize, lineHeight } = sizeStyles[size];
  const text = createText({ fontSize, lineHeight, color: secondaryColor });

  const buttonFrame = createButtonFrame();
  buttonFrame.insertChild(0, text);
  buttonFrame.insertChild(1, iconInstance);

  button.insertChild(0, buttonFrame);

  const styledButton = styleByButtonType({ button, buttonStyle, primaryColor, secondaryColor });

  return [styledButton, icon];
};

export default createMainComponents;
