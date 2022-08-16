import {
  ICON_COMPONENT_TOP_OFFSET,
  MAIN_BUTTON_AND_INSTANCE_HORIZONTAL_OFFSET,
  SIZE_GROUP_GAP,
} from './constants';
import createButtonsByLayout from './createButtonsByLayout';
import createMainComponents from './createMainComponents';

const getOffsets = (index) => {
  const sizeGroupYOffset = index * SIZE_GROUP_GAP;
  const iconComponentYOffset = sizeGroupYOffset + ICON_COMPONENT_TOP_OFFSET;

  return { sizeGroupYOffset, iconComponentYOffset };
};

const createButtonGroups = (size, styles, index) => {
  const { sizeGroupYOffset, iconComponentYOffset } = getOffsets(index);

  const [buttonComponent, iconComponent] = createMainComponents({
    styles,
    size,
    buttonYOffset: sizeGroupYOffset,
    iconComponentYOffset,
  });

  const buttons = createButtonsByLayout({
    button: buttonComponent,
    size,
    xOffset: MAIN_BUTTON_AND_INSTANCE_HORIZONTAL_OFFSET,
    yOffset: sizeGroupYOffset,
    styles: { style: styles.buttonStyle, secondaryColor: styles.secondaryColor },
  });

  return { buttonComponent, iconComponent, buttons };
};

export default createButtonGroups;
