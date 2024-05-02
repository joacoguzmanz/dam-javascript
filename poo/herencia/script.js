let miCoche = new Coche('Toyota', 'Corolla', 'AB129ZO');
miCoche.mostrarMarca(); // Muestra: Marca del vehículo: Toyota
miCoche.mostrarModelo(); // Muestra: Modelo del coche: Corolla

const showInfo = () => {
    document.getElementById('info').textContent = `Marca: ${miCoche.marca}, Modelo: ${miCoche.modelo}, Matricula: ${miCoche.matricula}`;
}