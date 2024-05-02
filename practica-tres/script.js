class Car {
    constructor(model, manufacturer, price, status = "en venta") {
        this.model = model;
        this.manufacturer = manufacturer;
        this.price = price;
        this.status = status; // Puede ser 'en venta' o 'en reparación' o 'vendido'
    }

    buy() {
        if (this.status === 'en venta') {
            this.status = 'vendido';
            return true;
        } else {
            return false;
        }
    }

    sendForRepair() {
        if (this.status === 'vendido') {
            this.status = 'en reparacion';
            return true;
        } else {
            return false;
        }
    }

    getDetails() {
        return `Modelo: ${this.model}, Fabricante: ${this.manufacturer}, Precio: ${this.price}, Estado: ${this.status}`;
    }
}

const carsForSale = [
    new Car("Model X", "Tesla", 80000, 'en venta'),
    new Car("Civic", "Honda", 25000, 'en venta')
];

const carsInRepair = [];

const soldCars = [];


function buyCar(model) {
    const car = carsForSale.find(c => c.model === model);

    if (car) {
        const success = car.buy();

        if (success) {
            const carDiv = document.querySelector(`.car[data-model="${model}"]`);
            carDiv.querySelector('.status').textContent = "vendido";
            carDiv.querySelector('button').setAttribute("disabled", 'true');

            soldCars.push(car);
            carsForSale.splice(carsForSale.indexOf(car), 1);
            alert(`Has comprado el auto "${model}".`);
        } else {
            alert(`No puedes comprar el auto "${model}".`);
        }
    } else {
        alert(`El auto "${model}" no se encontró.`);
    }
}


const repairDiv = document.querySelector('#repair-shop');
function sendCarForRepair(model) {
    const car = soldCars.find(c => c.model === model);

    if (car) {
        const success = car.sendForRepair();

        if (success) {
            repairDiv.textContent = '';
            const carDiv = document.querySelector(`.car[data-model="${model}"]`);
            carDiv.querySelector('.status').textContent = "en reparación";

            carsInRepair.push(car);
            carsInRepair.forEach((c) => {
                repairDiv.insertAdjacentHTML('beforeend',
                    `<div class="car" data-model="${c.model}" style="display: flex; flex-direction: column">
                    <span class="model">${c.model}</span>
                    <span class="brand">${c.manufacturer}</span>
                </div>`);
            })
        }
    } else {
        alert('No se puede reparar un auto que no está comprado.');
    }
}
