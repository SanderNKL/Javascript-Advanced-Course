export const attachColorButtonCopy = (inputElement, buttonElement) => {
  buttonElement.addEventListener("click", () => {
    const color = inputElement.value;
    navigator.clipboard.writeText(color).then(() => {
      buttonElement.textContent = "Copied!";
      setTimeout(() => (buttonElement.textContent = "Copy Color"), 1500);
    });
  });
};
