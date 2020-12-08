document.getElementById('form').addEventListener('submit', () => {
  const radioButtonInputs = document.querySelectorAll<HTMLInputElement>('input[name="buttonInput"]');
  const textColor = (document.getElementsByName('textColor')[0] as HTMLInputElement).value;
  const buttonColor = (document.getElementsByName('fillColor')[0] as HTMLInputElement).value;
  const styleValue = Array.from(radioButtonInputs).find(radio => radio.checked).value;
  const borderRadius = parseInt((document.getElementsByName('borderRadius')[0] as HTMLInputElement).value, 10);
  parent.postMessage({ pluginMessage: { type: 'button-maker', borderRadius, styleValue, textColor, buttonColor, strokeWeight: 1 } }, '*')
})

const colorInputs = document.getElementsByClassName('js-color-input');

Array.from(colorInputs).forEach(input => {
  input.addEventListener('change', (event) => {
    const hex = (event.target as any).value;
    input.parentElement.querySelector('.js-color-hex').textContent = hex.substring(1);
    input.parentElement.querySelector<HTMLSpanElement>('.js-color-preview').style.backgroundColor = hex;
  })
})