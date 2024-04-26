// Variables para almacenar los operandos y la operación actual
let currentNum = '';
let previousNum = '';
let operation = null;

/**
 * Agrega un número a la entrada actual.
 * @param {string} num El número a agregar
 */
function addNumber(num) {
    if (operation === undefined) currentNum = ''
    // Concatena el número a la cadena del operando actual
    currentNum += num;
    updateDisplay();
}

/**
 * Establece la operación a realizar y prepara los operandos.
 * @param {string} op El operador para la operación matemática
 */
function chooseOp(op) {
    // No hace nada si currentNum está vacío
    if (currentNum === '') return;
    // Si ya hay un operando previo, realiza la operación
    if (previousNum !== '') calculate();
    // Guarda el operador y actualiza los operandos
    operation = op;
    previousNum = currentNum;
    currentNum = '';
}

/**
 * Calcula el resultado de la operación seleccionada.
 */
function calculate() {
    let result;
    const previous = parseFloat(previousNum); // Convierte el operando previo a número
    const actual = parseFloat(currentNum); // Convierte el operando actual a número
    // Si alguno de los operandos no es un número, no hace nada
    if (isNaN(previous) || isNaN(actual)) return;

    switch (operation) { // Realiza la operación basada en el tipo de operador
        case '+':
            result = previous + actual;
            break;
        case '-':
            result = previous - actual;
            break;
        case '*':
            result = previous * actual;
            break;
        case '/':
            actual !== 0 ? result = previous / actual : result = 'err';
            break;
        default:
            return; // No realiza ninguna operación si no se reconoce el operador
    }
    // Almacena el resultado como operando actual para nuevas operationes
    currentNum = result;
    operation = undefined;
    previousNum = '';
    updateDisplay();
}

/**
 * Actualiza la pantalla de la calculadora.
 */
function updateDisplay() {
    document.getElementById('display').value = currentNum;
}

/**
 * Reinicia la calculadora a su estado inicial.
 */
function reset() {
    currentNum = '';
    previousNum = '';
    operation = null;
    updateDisplay();
}