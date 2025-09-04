export function updateSavedColors(savedDiv, savedColors) {
  savedDiv.replaceChildren();

  for (let i = 0; i < savedColors.length; i++) {
    const color = savedColors[i];

    const colorbox = document.createElement("button");
    colorbox.className = "colorbox button-default";

    const colorShow = document.createElement("div");
    colorShow.className = "color";
    colorShow.style = `background: ${color};`;

    const hexText = document.createElement("p");
    hexText.className = "hex";
    hexText.textContent = color;

    colorbox.append(colorShow, hexText);

    colorbox.addEventListener("click", () => {
      navigator.clipboard.writeText(color).then(() => {
        hexText.textContent = "Copied!";
        setTimeout(() => {
          hexText.textContent = color;
        }, 1000);
      });
    });

    savedDiv.append(colorbox);
  }
}
