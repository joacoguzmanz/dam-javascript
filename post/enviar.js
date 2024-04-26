// enviar.js
document.getElementById('miFormulario').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío tradicional del formulario

    // Capturar los datos del formulario
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    // Almacenar los datos en localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Redirigir a la página de mostrar datos
    window.location.href = 'mostrar_datos.html';
});
