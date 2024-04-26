// Instanciar autos
const carRental = [
    new Car("Model S", "Tesla", 4),
    new Car("Mustang", "Ford", 2)
];

// Función para alquilar un auto
function rentCar(model, tagId) {
    const car = carRental.find(c => c.model === model);

    if (car) {
        const success = car.rent();

        if (success) {
            const tag = document.querySelector(tagId);
            // Actualizar la UI para reflejar el cambio en unidades disponibles
            tag.textContent = car.units;

            alert(`Has alquilado el auto "${model}"`);
        } else {
            alert(`Lo siento, no hay unidades disponibles para el auto "${model}"`);
        }
    } else {
        alert(`El auto "${model}" no se encontró.`);
    }
}
