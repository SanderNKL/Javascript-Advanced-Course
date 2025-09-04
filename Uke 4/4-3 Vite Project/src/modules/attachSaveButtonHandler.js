export const attachSaveButtonHandler = (
  saveBtn,
  inputElement,
  savedColors,
  savedDiv,
  updateSavedColors
) => {
  saveBtn.addEventListener("click", () => {
    const currentColor = inputElement.value;
    if (!savedColors.includes(currentColor)) {
      savedColors.push(currentColor);
      localStorage.setItem("savedColors", JSON.stringify(savedColors));
      updateSavedColors(savedDiv, savedColors);
    }
  });
};
