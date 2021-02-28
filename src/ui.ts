import Color from 'color';

const formElements = {
  form: document.getElementById('form'),
  primaryColorInput: document.getElementsByName('primaryColorCustom')[0] as HTMLInputElement,
  secondaryColorInput: document.getElementsByName('secondaryColorCustom')[0] as HTMLInputElement,
  radiusInput: document.getElementsByName('borderRadius')[0] as HTMLInputElement,
  radioButtonInputs: document.getElementsByName('buttonInput') as NodeListOf<HTMLInputElement>,
  colorInputs: document.getElementsByClassName('js-color-input'),
  primaryLocalColorInput: document.getElementById('local-color-primary') as HTMLSelectElement,
  secondaryLocalColorInput: document.getElementById('local-color-secondary') as HTMLSelectElement,
  localStyleToggle: document.getElementById('local-style-toggle') as HTMLInputElement,
  colorInputsWrapper: document.getElementsByClassName('js-color-input-wrapper'),
  localInputsWrapper: document.getElementsByClassName('js-local-input-wrapper'),
  localColorInputs: document.getElementsByClassName('js-local-color-input'),
};

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

formElements.form.addEventListener('submit', () => {
  const buttonStyle = Array.from(formElements.radioButtonInputs).find((radio) => radio.checked)
    .value;
  const localStylesChecked = formElements.localStyleToggle.checked;
  const localColorPrimaryValue =
    formElements.primaryLocalColorInput.options[formElements.primaryLocalColorInput.selectedIndex]
      .value;
  const localColorSecondaryValue =
    formElements.secondaryLocalColorInput.options[
      formElements.secondaryLocalColorInput.selectedIndex
    ].value;
  const primaryColor = localStylesChecked
    ? localColorPrimaryValue
    : formElements.primaryColorInput.value;
  const secondaryColor = localStylesChecked
    ? localColorSecondaryValue
    : formElements.secondaryColorInput.value;
  const borderRadius = parseInt(formElements.radiusInput.value, 10) || 0;
  parent.postMessage(
    {
      pluginMessage: {
        type: 'button-buddy',
        borderRadius,
        buttonStyle,
        secondaryColor,
        primaryColor,
        strokeWeight: 1,
      },
    },
    '*'
  );
});

const rgbUnitObjectToHex = ({ r, g, b }) => Color({ r: r * 255, g: g * 255, b: b * 255 }).hex();

const renderLocalColorsOptions = (localColors) => {
  Array.from(formElements.localColorInputs).forEach((input) => {
    localColors.forEach((color) => {
      if (!color.color) {
        return;
      }
      const option = document.createElement('option');
      const value = rgbUnitObjectToHex(color.color);
      option.innerText = color.name;
      option.value = value;
      input.appendChild(option);
    });
  });
};

onmessage = ({ data }) => {
  const message = data.pluginMessage.codeMessage;
  const messageType = message.type;
  if (messageType === 'render') {
    renderLocalColorsOptions(message.localColors);
  }
};

const controlColorInputs = (localColorsChecked) => {
  if (localColorsChecked) {
    Array.from(formElements.colorInputsWrapper).forEach(
      (el) => ((el as HTMLElement).hidden = true)
    );
    Array.from(formElements.localInputsWrapper).forEach(
      (el) => ((el as HTMLElement).hidden = false)
    );
    return;
  }

  Array.from(formElements.colorInputsWrapper).forEach((el) => ((el as HTMLElement).hidden = false));
  Array.from(formElements.localInputsWrapper).forEach((el) => ((el as HTMLElement).hidden = true));
};

formElements.localStyleToggle.addEventListener('change', (e) => {
  controlColorInputs((e.currentTarget as HTMLInputElement).checked);
});

type UIButtonStyleTypes = 'radius' | 'primaryColor' | 'secondaryColor';

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

formElements.radiusInput.addEventListener('keyup', (event) => {
  const value = (event.target as HTMLInputElement).value;
  updateUIButtonStyles('radius', value);
});

Array.from(formElements.localColorInputs).forEach((input) => {
  input.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const value = target.options[target.options.selectedIndex].value;
    updateUIButtonStyles((event.target as any).getAttribute('data-color-type'), value);
  });
});

Array.from(formElements.colorInputs).forEach((input) => {
  input.addEventListener('change', (event) => {
    const hex = (event.target as any).value;
    updateUIButtonStyles((event.target as any).getAttribute('data-color-type'), hex);
    input.parentElement.getElementsByClassName('js-color-hex')[0].textContent = hex.substring(1);
    (input.parentElement.getElementsByClassName(
      'js-color-preview'
    )[0] as HTMLElement).style.backgroundColor = hex;
  });
});
