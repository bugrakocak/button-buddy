/* eslint-disable no-param-reassign */
import Color from 'color';

const showcaseButtons = document.getElementsByClassName('js-showcase-button');

const formElements = {
  form: document.getElementById('form'),
  primaryColorInput: document.getElementsByName('primaryColor')[0],
  secondaryColorInput: document.getElementsByName('secondaryColor')[0],
  radiusInput: document.getElementsByName('borderRadius')[0],
  radioButtonInputs: document.getElementsByName('buttonInput'),
  colorInputs: document.getElementsByClassName('js-color-input'),
};

formElements.form.addEventListener('submit', (e) => {
  const secondaryColor = formElements.secondaryColorInput.value;
  const primaryColor = formElements.primaryColorInput.value;
  const borderRadius = parseInt(formElements.radiusInput.value, 10) || 0;

  e.preventDefault();
  document.documentElement.style.setProperty('--showcase-button-background-color', primaryColor);
  document.documentElement.style.setProperty('--showcase-button-color', secondaryColor);
  document.documentElement.style.setProperty(
    '--showcase-button-border-radius',
    `${borderRadius}px`,
  );

  // Array.from(showcaseButtons).forEach(button => {
  //   button.setP
  // })
});

const buttons = {
  basicMask: document.getElementById('button-basic-mask'),
  basicOutlineMask: document.getElementById('button-basic-outline-mask'),
  modernMask: document.getElementById('button-modern-mask'),
  glossyMask: document.getElementById('button-glossy-mask'),
  comicLightMask: document.getElementById('button-comic-light-mask'),
  comicBoldMask: document.getElementById('button-comic-bold-mask'),
  fancyMask: document.getElementById('button-fancy-mask'),
  flatShadowMask: document.getElementById('button-flat-shadow-mask'),
};

const updateUIButtonStyles = (type, value) => {
  if (type === 'radius') {
    buttons.basicMask.style.borderRadius = `${value}px`;
    buttons.basicOutlineMask.style.borderRadius = `${value}px`;
    buttons.modernMask.style.borderRadius = `${value}px`;
    buttons.glossyMask.style.borderRadius = `${value}px`;
    buttons.comicLightMask.style.borderRadius = `${value}px`;
    buttons.comicBoldMask.style.borderRadius = `${value}px`;
    buttons.fancyMask.style.borderRadius = `${value}px`;
    buttons.flatShadowMask.style.borderRadius = `${value}px`;
  }

  if (type === 'primaryColor') {
    const rgb = Color(value).rgb().unitObject();
    buttons.basicMask.style.backgroundColor = value;
    buttons.basicOutlineMask.style.borderColor = value;
    buttons.basicOutlineMask.style.color = value;
    buttons.modernMask.style.backgroundColor = value;
    buttons.modernMask.style.boxShadow = `0 5px 10px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${
      rgb.b * 255
    }, 0.3)`;
    buttons.glossyMask.style.backgroundColor = value;
    buttons.comicLightMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttons.comicLightMask.style.borderColor = value;
    buttons.comicLightMask.style.color = value;
    buttons.comicBoldMask.style.backgroundColor = value;
    buttons.comicBoldMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttons.fancyMask.style.backgroundColor = value;
    buttons.fancyMask.style.boxShadow = `0 4px 16px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${
      rgb.b * 255
    }, 0.4)`;
    const darken = Color(value).darken(0.3).hex();
    buttons.flatShadowMask.style.boxShadow = `0 4px 0 ${darken}`;
    buttons.flatShadowMask.style.backgroundColor = value;
  }

  if (type === 'secondaryColor') {
    buttons.basicMask.style.color = value;
    buttons.modernMask.style.color = value;
    buttons.glossyMask.style.color = value;
    buttons.comicLightMask.style.backgroundColor = value;
    buttons.comicBoldMask.style.color = value;
    buttons.fancyMask.style.color = value;
    buttons.flatShadowMask.style.color = value;
  }
};

formElements.primaryColorInput.addEventListener('change', (event) => {
  const hexValue = event.target.value;
  updateUIButtonStyles('primaryColor', hexValue);
});

formElements.secondaryColorInput.addEventListener('change', (event) => {
  const hex = event.target.value;
  updateUIButtonStyles('secondaryColor', hex);
});

formElements.radiusInput.addEventListener('keyup', (event) => {
  const { value } = event.target;
  updateUIButtonStyles('radius', value);
});

Array.from(formElements.colorInputs).forEach((input) => {
  input.addEventListener('change', (event) => {
    const hex = event.target.value;
    input.parentElement.getElementsByClassName('js-color-hex')[0].textContent = hex.substring(1);
    input.parentElement.getElementsByClassName('js-color-preview')[0].style.backgroundColor = hex;
  });
});

/* eslint-enable no-param-reassign */
