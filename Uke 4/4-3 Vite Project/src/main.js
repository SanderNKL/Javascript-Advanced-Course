import "./style.css";

import {
  attachColorButtonCopy,
  attachColorInputHandler,
  attachSaveButtonHandler,
  updateSavedColors,
} from "./modules";

document.querySelector("#app").innerHTML = `
  <h1>Color Picker App</h1>
  <input type="color" id="colorInput" value="#ffffff" />
  <div id="colorDisplay">#ffffff</div>
  <button class="interactionButton button-default" id="copyBtn">Copy Color</button>
  <button class="interactionButton button-default" id="saveBtn">Save Color</button>

  <h2>Saved Colors</h2>
  <div id="saved"></div>
`;

//querySelector
const inputElement = document.getElementById("colorInput");
const savedDiv = document.getElementById("saved");
const saveBtn = document.getElementById("saveBtn");

attachColorInputHandler(inputElement, document.getElementById("colorDisplay"));

attachColorButtonCopy(inputElement, document.getElementById("copyBtn"));

let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];

attachSaveButtonHandler(
  saveBtn,
  inputElement,
  savedColors,
  savedDiv,
  updateSavedColors
);

updateSavedColors(savedDiv, savedColors);
