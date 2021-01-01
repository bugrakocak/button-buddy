/* eslint-disable no-param-reassign */
import Color from 'color';

const styleButton = (element) => {
  return {
    setPrimaryColor: (color) => {
      element.style.setProperty('--plugin-button-primary-color', color);
    },
    setSecondaryColor: (color) => {
      element.style.setProperty('--plugin-button-secondary-color', color);
    },
    setModernStyleBoxShadowColor: (color) => {
      element.style.setProperty('--plugin-button-modern-box-shadow-color', color);
    },
    setGlossyStyleBoxShadowColor1: (color) => {
      element.style.setProperty('--plugin-button-glossy-box-shadow-color-1', color);
    },
    setGlossyStyleBoxShadowColor2: (color) => {
      element.style.setProperty('--plugin-button-glossy-box-shadow-color-2', color);
    },
    setFancyStyleBoxShadowColor: (color) => {
      element.style.setProperty('--plugin-button-fancy-box-shadow-color', color);
    },
    setFlatShadowStyleBoxShadowColor: (color) => {
      element.style.setProperty('--plugin-button-flat-shadow-box-shadow-color', color);
    },
    setRadius: (radius) => {
      element.style.setProperty('--plugin-button-border-radius', radius);
    },
    setBackgroundColor: (color) => {
      element.style.backgroundColor = color;
    },
    removeBoxShadow: () => {
      element.style.boxShadow = 'none';
    },
    setOpacity: (opacity) => {
      element.style.opacity = opacity;
    },
    setBorder: (border) => {
      element.style.border = border;
    },
  };
};

const primaryColorChangeHandler = (styler, color) => {
  const { r, g, b } = Color(color).rgb().unitObject();
  styler.setPrimaryColor(color);
  styler.setModernStyleBoxShadowColor(`rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.3)`);
  styler.setFancyStyleBoxShadowColor(`rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.4)`);
  styler.setFlatShadowStyleBoxShadowColor(Color(color).darken(0.3).hex());
};

const showcaseButtons = document.getElementsByClassName('js-showcase-button');

const formElements = {
  form: document.getElementById('form'),
  primaryColorInput: document.getElementsByName('primaryColor')[0],
  secondaryColorInput: document.getElementsByName('secondaryColor')[0],
  radiusInput: document.getElementsByName('borderRadius')[0],
  radioButtonInputs: document.getElementsByName('buttonInput'),
  colorInputs: document.getElementsByClassName('js-color-input'),
};

const buttonModifierClassByType = {
  basicSolid: 'plugin-button--basic',
  basicOutline: 'plugin-button--basic-outline',
  modern: 'plugin-button--modern',
  glossy: 'plugin-button--glossy',
  comicLight: 'plugin-button--comic-light',
  comicBold: 'plugin-button--comic-bold',
  fancy: 'plugin-button--fancy',
  flatShadow: 'plugin-button--flat-shadow',
};

const getFormValues = () => {
  return {
    primaryColor: formElements.primaryColorInput.value,
    secondaryColor: formElements.secondaryColorInput.value,
    borderRadius: parseInt(formElements.radiusInput.value, 10) || 0,
    buttonStyle: Array.from(formElements.radioButtonInputs).find((el) => el.checked).value,
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const { primaryColor, secondaryColor, borderRadius } = getFormValues();

  const styler = styleButton(formElements.form);
  primaryColorChangeHandler(styler, primaryColor);
  styler.setSecondaryColor(secondaryColor);
  styler.setRadius(`${borderRadius}px`);
});

const showcaseButtonsStateHandler = (styler, state, style, primaryColor, secondaryColor) => {
  if (state === 'idle') {
    primaryColorChangeHandler(styler, primaryColor);
  }

  if (state === 'hover' || state === 'active') {
    const primaryColorDarken = Color(primaryColor).darken(0.4).hex();
    styler.setPrimaryColor(primaryColorDarken);
    //   if (instance.effects && instance.effects[0] && instance.effects[0].type === 'DROP_SHADOW') {
    //     const effectClone = instance.effects.slice();
    //     const newEffect = {...effectClone[0], color: {...primaryColorDarken, a: 1}};
    //     instance.effects = [newEffect]
    //   }

    if (style === 'basicOutline') {
      styler.setPrimaryColor(secondaryColor);
      styler.setBackgroundColor(primaryColor);
    }

    if (style === 'comicLight' || style === 'comicBold') {
      styler.setPrimaryColor(primaryColor);
      styler.setSecondaryColor(secondaryColor);
      styler.removeBoxShadow();
    }
  }

  if (state === 'disabled') {
    styler.setOpacity(0.4);
  }

  if (state === 'focus') {
    const border = `4px solid ${Color(primaryColor).lighten(0.4).hex()}`;
    styler.setBorder(border);
  }
};

formElements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { primaryColor, secondaryColor, borderRadius, buttonStyle } = getFormValues();

  Array.from(showcaseButtons).forEach((button) => {
    const modifierClassIndex = Array.from(button.classList).findIndex((item) =>
      item.includes('plugin-button--'),
    );
    const modifierClass = button.classList.item(modifierClassIndex);
    button.classList.replace(modifierClass, buttonModifierClassByType[buttonStyle]);

    const styler = styleButton(button);
    primaryColorChangeHandler(styler, primaryColor);
    styler.setSecondaryColor(secondaryColor);
    styler.setRadius(`${borderRadius}px`);
    const state = button.getAttribute('data-button-state');
    showcaseButtonsStateHandler(styler, state, buttonStyle, primaryColor, secondaryColor);
  });
});

const uiButtonStyler = styleButton(formElements.form);

formElements.primaryColorInput.addEventListener('change', (event) => {
  primaryColorChangeHandler(uiButtonStyler, event.target.value);
});

formElements.secondaryColorInput.addEventListener('change', (event) => {
  uiButtonStyler.setSecondaryColor(event.target.value);
});

formElements.radiusInput.addEventListener('keyup', (event) => {
  uiButtonStyler.setRadius(`${event.target.value}px`);
});

Array.from(formElements.colorInputs).forEach((input) => {
  input.addEventListener('change', (event) => {
    const hex = event.target.value;
    input.parentElement.getElementsByClassName('js-color-hex')[0].textContent = hex.substring(1);
    input.parentElement.getElementsByClassName('js-color-preview')[0].style.backgroundColor = hex;
  });
});

/* eslint-enable no-param-reassign */
