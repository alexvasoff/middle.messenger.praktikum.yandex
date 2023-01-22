export function getFormData() {
  const inputFields = document.getElementsByTagName('input');
  const formData: Record<string, unknown> = {};
  for (const inputField of inputFields) {
    if (inputField.name === 'avatar') {
      continue;
    }
    const key = inputField.name;
    formData[key] = inputField.value;
  }
  return formData;
}
