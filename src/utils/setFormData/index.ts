export function setFormData(data: Record<string, unknown>) {
  const inputFields = document.getElementsByTagName('input');
  for (const inputField of inputFields) {
    const fieldName = inputField.name;
    if (!data[fieldName] || fieldName === 'avatar') {
      continue;
    }
    inputField.value = <string>data[fieldName];
  }
}
