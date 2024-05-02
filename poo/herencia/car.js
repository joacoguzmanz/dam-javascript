class Coche extends Vehiculo {
    constructor(marca, modelo, matricula) {
        super(marca); // Llama al constructor de la clase padre
        this.modelo = modelo;
        this.matricula = matricula;
    }

    mostrarModelo() {
        console.log('Modelo del coche:', this.modelo);
    }

    mostrarMatricula() {
        console.log('Mostrar matrícula:', this.matricula);
    }
}
