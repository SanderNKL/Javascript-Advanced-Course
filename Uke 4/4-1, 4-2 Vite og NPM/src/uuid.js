import { v4 as uuid4 } from "uuid";

export const createUUIDButton = (buttonElement) => {
    buttonElement.textContent = "Create UUID";
    buttonElement.addEventListener('click', () => {
        const uuid = uuid4();
        alert(`Your new UUID: ${uuid}`)
    })
};