export function getFormData() {
  const inputFields = document.getElementsByTagName('input');
  const formData = {};
  for (const inputField of inputFields) {
    if (inputField.name === 'avatar') {
      continue;
    }
    formData[inputField.name] = inputField.value;
  }
  return formData;
}
