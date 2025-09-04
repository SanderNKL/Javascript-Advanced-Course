export function attachColorInputHandler(inputElement, displayElement) {
  inputElement.addEventListener("input", () => {
    const color = inputElement.value;
    displayElement.textContent = color;
    displayElement.style.backgroundColor = color;
  });
}
