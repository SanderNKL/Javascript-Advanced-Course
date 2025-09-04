import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { createUUIDButton } from './uuid.js'
import { passwordForm } from './passwordForm.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
        <form id="myForm">
            <input type="password" id="password" name="password" />
            <button type="submit">Submit</button>
        </form>
        <button id="counter" type="button"></button>
        <button id="uuid" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

passwordForm(document.querySelector('#myForm'))
setupCounter(document.querySelector('#counter'))
createUUIDButton(document.querySelector('#uuid'))
