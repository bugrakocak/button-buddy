import Color from 'color';

const fillColorInput = (document.getElementsByName('fillColor')[0] as HTMLInputElement)
const textColorInput = (document.getElementsByName('textColor')[0] as HTMLInputElement);
document.getElementById('form').addEventListener('submit', () => {
  const radioButtonInputs = document.querySelectorAll<HTMLInputElement>('input[name="buttonInput"]');
  const textColor = textColorInput.value;
  const buttonColor = fillColorInput.value;
  const styleValue = Array.from(radioButtonInputs).find(radio => radio.checked).value;
  const borderRadius = parseInt((document.getElementsByName('borderRadius')[0] as HTMLInputElement).value, 10) || 0;
  parent.postMessage({ pluginMessage: { type: 'button-maker', borderRadius, styleValue, textColor, buttonColor, strokeWeight: 1 } }, '*')
})

const colorInputs = document.getElementsByClassName('js-color-input');

const radiusElement = document.getElementById('radiusInput');

const buttonBasicMask = document.getElementById('button-basic-mask');
const buttonBasicOutlineMask = document.getElementById('button-basic-outline-mask');
const buttonModernMask = document.getElementById('button-modern-mask');
const buttonGlossyMask = document.getElementById('button-glossy-mask');
const buttonComicLightMask = document.getElementById('button-comic-light-mask');
const buttonComicBoldMask = document.getElementById('button-comic-bold-mask');
const buttonFancyMask = document.getElementById('button-fancy-mask');
const buttonFlatShadowMask = document.getElementById('button-flat-shadow-mask');

const setStyles = (type, value) => {
  if (type === 'radius') {
    if (!value) {
      value = 0
    }
    buttonBasicMask.style.borderRadius = `${value}px`;
    buttonBasicOutlineMask.style.borderRadius = `${value}px`;
    buttonModernMask.style.borderRadius = `${value}px`;
    buttonGlossyMask.style.borderRadius = `${value}px`;
    buttonComicLightMask.style.borderRadius = `${value}px`;
    buttonComicBoldMask.style.borderRadius = `${value}px`;
    buttonFancyMask.style.borderRadius = `${value}px`;
    buttonFlatShadowMask.style.borderRadius = `${value}px`;
  }

  if (type === 'fillColor') {
    const rgb = Color(value).rgb().unitObject();
    buttonBasicMask.style.backgroundColor = value;
    buttonBasicOutlineMask.style.borderColor = value;
    buttonModernMask.style.backgroundColor = value;
    buttonModernMask.style.boxShadow = `0 5px 10px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}, 0.3)`;
    buttonGlossyMask.style.backgroundColor = value;
    buttonComicLightMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttonComicLightMask.style.borderColor = value;
    buttonComicBoldMask.style.backgroundColor = value;
    buttonComicBoldMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttonFancyMask.style.backgroundColor = value;
    buttonFancyMask.style.boxShadow = `0 4px 16px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}, 0.4)`;
    const darken = Color(value).darken(0.3).hex();
    buttonFlatShadowMask.style.boxShadow = `0 4px 0 ${darken}`;
    buttonFlatShadowMask.style.backgroundColor = value;
  }

  if (type === 'textColor') {
    buttonBasicMask.style.color = value;
    buttonBasicOutlineMask.style.color = value;
    buttonModernMask.style.color = value;
    buttonGlossyMask.style.color = value;
    buttonComicLightMask.style.color = value;
    buttonComicBoldMask.style.color = value;
    buttonFancyMask.style.color = value;
    buttonFlatShadowMask.style.color = value;
  }
}

fillColorInput.addEventListener('change', (event) => {
  const hex = (event.target as any).value;
  setStyles('fillColor', hex);
})

textColorInput.addEventListener('change', (event) => {
  const hex = (event.target as any).value;
  setStyles('textColor', hex);
})

radiusElement.addEventListener('keyup', (event) => {
  const value = (event.target as HTMLInputElement).value;
  setStyles('radius', value);
})

Array.from(colorInputs).forEach(input => {
  input.addEventListener('change', (event) => {
    const hex = (event.target as any).value;
    input.parentElement.querySelector('.js-color-hex').textContent = hex.substring(1);
    input.parentElement.querySelector<HTMLSpanElement>('.js-color-preview').style.backgroundColor = hex;
  })
})
