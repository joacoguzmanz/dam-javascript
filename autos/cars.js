// Clase para representar un coche
class Car {
    constructor(model, manufacturer, units) {
        this.model = model;
        this.manufacturer = manufacturer;
        this.units = units; // Número de unidades disponibles
    }

    // Método para alquilar un auto
    rent() {
        if (this.units <= 0) {
            return false;
        } else {
            this.units -= 1;
            return true;
        }
    }

    // Método para devolver un auto
    returnCar() {

    }

    // Método para obtener información del auto
    getDetails() {
        return `Modelo: ${this.model}, Fabricante: ${this.manufacturer}, Unidades Disponibles: ${this.units}`;
    }
}
