function validarFormulario() {
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');
    let telefono = document.getElementById('telefono');
    let valid = true;

    if(nombre.textContent.length<2){
        document.getElementById('errorNombre').textContent = "Este campo no es correcto.";
        nombre.classList.add('invalid');
        valid = false;
    }

    if(apellido.textContent.length<2){
        document.getElementById('errorApellido').textContent = "Este campo no es correcto.";
        apellido.classList.add('invalid');
        valid = false;
    }

    if(email.textContent.length<2){
        document.getElementById('errorEmail').textContent = "Este campo no es correcto.";
        email.classList.add('invalid');
        valid = false;
    }

    if(telefono.textContent.length<2){
        document.getElementById('errorTelefono').textContent = "Este campo no es correcto.";
        telefono.classList.add('invalid');
        valid = false;
    }

    // Limpiar errores previos
    document.getElementById('errorNombre').textContent = '';
    document.getElementById('errorApellido').textContent = '';
    document.getElementById('errorEmail').textContent = '';
    document.getElementById('errorTelefono').textContent = '';
    nombre.classList.remove('invalid');
    apellido.classList.remove('invalid');
    email.classList.remove('invalid');
    telefono.classList.remove('invalid');
    
    if(valid) {
        alert("Formulario enviado con éxito!");
        // Aquí podrías agregar código para enviar los datos del formulario, como AJAX.
    }
}
