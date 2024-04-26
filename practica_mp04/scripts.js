const email = document.getElementById('email');
const pwd = document.querySelector('#password');
const name = document.querySelector('#nombre');
const surname = document.querySelector('#apellidos');
const birthDate = document.querySelector('#fechaNacimiento');

const emailError = document.querySelector('#errorEmail');
const pwdError = document.querySelector('#errorPwd');
const nameError = document.querySelector('#errorName');
const surnameError = document.querySelector('#errorSurname');
const birthdateError = document.querySelector('#errorBirthdate');

document.getElementById('formulario').addEventListener('submit', event => {
    let formIsValid = true;

    // Validación de email
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        document.getElementById('errorEmail').textContent = "El email es inválido.";
        emailError.classList.add('error');
        formIsValid = false;
    } else {
        document.getElementById('errorEmail').textContent = "";
    }

    // Validación de contraseña
    if (pwd.value.length <= 8) {
        pwdError.textContent = 'La contraseña debe tener más de 8 carácteres.';
        pwdError.classList.add('error');
        formIsValid = false;
    } else {
        pwdError.textContent = '';
    }

    // Validación de nombre
    if (name.value.length <= 2) {
        nameError.textContent = 'El nombre no puede estar vacío.';
        nameError.classList.add('error');
        formIsValid = false;
    } else {
        nameError.textContent = '';
    }

    // Validación de apellidos
    if (surname.value.length <= 2) {
        surnameError.textContent = 'El apellido no puede estar vacío.';
        surnameError.classList.add('error');
        formIsValid = false;
    } else {
        surnameError.textContent = '';
    }

    // Validación de fecha de nacimiento
    if (!birthDate.value) {
        birthdateError.textContent = 'Ingresar una fecha.';
        birthdateError.classList.add('error');
        formIsValid = false;
    } else {
        const inputDate = new Date(birthDate.value);
        const currDate = new Date();
        if (inputDate > currDate) {
            birthdateError.textContent = 'La fecha no puede ser en el futuro.';
            birthdateError.classList.add('error');
            formIsValid = false;
        } else {
            birthdateError.textContent = '';
        }
    }

    if (!formIsValid) event.preventDefault();
});
