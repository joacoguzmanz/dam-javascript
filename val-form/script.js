const validarFormulario = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;

    let errorNombre = document.querySelector('.nombre-error-msg');
    let errorApellido = document.querySelector('.apellido-error-msg');
    let errorEmail = document.querySelector('.mail-error-msg');
    let errorPhone = document.querySelector('.phone-error-msg');

    if (nombre.length <= 2) {
        errorNombre.textContent = 'Completar nombre';
        return;
    } else {
        errorNombre.textContent = '';
    }

    if (apellido.length <= 2) {
        errorApellido.textContent = 'Completar apellido';
        return;
    } else {
        errorApellido.textContent = '';
    }

    if (!email.includes('@') || !email.includes('.')) {
        errorEmail.textContent = 'Ingrese un mail correcto';
        return;
    } else {
        errorEmail.textContent = '';
    }

    let regNumbers = /^\d+$/;
    if (!(telefono.length >= 10) || !telefono.match(regNumbers)) {
        errorPhone.textContent = 'Ingrese un numero correcto';
        return;
    } else {
        errorPhone.textContent = '';
    }

    alert('Formulario enviado con éxito!');

    // Aquí puedes agregar código para enviar los datos del formulario, como AJAX.
}