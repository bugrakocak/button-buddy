import Color from 'color';

const formElements = {
  form: document.getElementById('form'),
  fillColorInput: (document.getElementsByName('fillColor')[0] as HTMLInputElement),
  textColorInput: (document.getElementsByName('textColor')[0] as HTMLInputElement),
  radiusInput: (document.getElementsByName('borderRadius')[0] as HTMLInputElement),
  radioButtonInputs: (document.getElementsByName('buttonInput') as NodeListOf<HTMLInputElement>),
  colorInputs: document.getElementsByClassName('js-color-input')
}

const buttons = {
  basicMask: document.getElementById('button-basic-mask'),
  basicOutlineMask: document.getElementById('button-basic-outline-mask'),
  modernMask: document.getElementById('button-modern-mask'),
  glossyMask: document.getElementById('button-glossy-mask'),
  comicLightMask: document.getElementById('button-comic-light-mask'),
  comicBoldMask: document.getElementById('button-comic-bold-mask'),
  fancyMask: document.getElementById('button-fancy-mask'),
  flatShadowMask: document.getElementById('button-flat-shadow-mask'),
}

formElements.form.addEventListener('submit', () => {
  const buttonStyle = Array.from(formElements.radioButtonInputs).find(radio => radio.checked).value;
  const textColor = formElements.textColorInput.value;
  const buttonColor = formElements.fillColorInput.value;
  const borderRadius = parseInt(formElements.radiusInput.value, 10) || 0;
  parent.postMessage({ pluginMessage: { type: 'button-maker', borderRadius, buttonStyle, textColor, buttonColor, strokeWeight: 1 } }, '*')
})


type UIButtonStyleTypes = 'radius' | 'fillColor' | 'textColor';

const updateUIButtonStyles = (type: UIButtonStyleTypes, value: string) => {
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

  if (type === 'fillColor') {
    const rgb = Color(value).rgb().unitObject();
    buttons.basicMask.style.backgroundColor = value;
    buttons.basicOutlineMask.style.borderColor = value;
    buttons.modernMask.style.backgroundColor = value;
    buttons.modernMask.style.boxShadow = `0 5px 10px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}, 0.3)`;
    buttons.glossyMask.style.backgroundColor = value;
    buttons.comicLightMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttons.comicLightMask.style.borderColor = value;
    buttons.comicBoldMask.style.backgroundColor = value;
    buttons.comicBoldMask.style.boxShadow = `-4px 4px 0 ${value}`;
    buttons.fancyMask.style.backgroundColor = value;
    buttons.fancyMask.style.boxShadow = `0 4px 16px rgba(${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}, 0.4)`;
    const darken = Color(value).darken(0.3).hex();
    buttons.flatShadowMask.style.boxShadow = `0 4px 0 ${darken}`;
    buttons.flatShadowMask.style.backgroundColor = value;
  }

  if (type === 'textColor') {
    buttons.basicMask.style.color = value;
    buttons.basicOutlineMask.style.color = value;
    buttons.modernMask.style.color = value;
    buttons.glossyMask.style.color = value;
    buttons.comicLightMask.style.color = value;
    buttons.comicBoldMask.style.color = value;
    buttons.fancyMask.style.color = value;
    buttons.flatShadowMask.style.color = value;
  }
}

formElements.fillColorInput.addEventListener('change', (event) => {
  const hexValue = (event.target as any).value;
  updateUIButtonStyles('fillColor', hexValue);
})

formElements.textColorInput.addEventListener('change', (event) => {
  const hex = (event.target as any).value;
  updateUIButtonStyles('textColor', hex);
})

formElements.radiusInput.addEventListener('keyup', (event) => {
  const value = (event.target as HTMLInputElement).value;
  updateUIButtonStyles('radius', value);
})

Array.from(formElements.colorInputs).forEach(input => {
  input.addEventListener('change', (event) => {
    const hex = (event.target as any).value;
    input.parentElement.getElementsByClassName('js-color-hex')[0].textContent = hex.substring(1);
    (input.parentElement.getElementsByClassName('js-color-preview')[0] as HTMLElement).style.backgroundColor = hex;
  })
})
