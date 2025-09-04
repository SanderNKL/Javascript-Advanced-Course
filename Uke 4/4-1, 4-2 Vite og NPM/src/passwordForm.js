import { hashPassword } from "./hashPassword"

export const passwordForm = (form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form)
        const hashedPassword = await hashPassword(formData.get('password'))
        alert(`Your secure password: ${hashedPassword}`)
    })
}