const helloWorldBtn = document.querySelector("#helloWorldBtn");
helloWorldBtn.addEventListener('click', () => console.log('Hello world!'))

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", () => console.log(button.textContent));
    button.addEventListener("mouseover", () => console.log(`Mouse over: ${button.textContent}`));
});

document.addEventListener("keydown", e => console.log(`Key Down: ${e.key}`));

const form = document.querySelector("#loginForm")
form.addEventListener("submit", (e) => {
    e.preventDefault();


    const formData = new FormData(form);
    const name = formData.get("name");
    const password = formData.get("password");

    console.log("Name:", name);
    console.log("Password:", password);
});