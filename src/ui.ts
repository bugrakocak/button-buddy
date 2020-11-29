document.getElementById('create').onclick = () => {
  const styleValue = (document.getElementById('style') as HTMLInputElement).value;
  const textColor = (document.getElementById('textColor') as HTMLInputElement).value;
  const buttonColor = (document.getElementById('buttonColor') as HTMLInputElement).value;
  const radius = (document.getElementById('borderRadius') as HTMLInputElement);
  const stroke = (document.getElementById('strokeWeight') as HTMLInputElement);
  const borderRadius = parseInt(radius.value, 10);
  const strokeWeight = parseInt(stroke.value, 10);
  parent.postMessage({ pluginMessage: { type: 'button-maker', borderRadius, styleValue, textColor, buttonColor, strokeWeight } }, '*')
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}