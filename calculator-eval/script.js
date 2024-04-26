// Variable para almacenar la expresión aritmética completa
let expresion = '';

/**
 * Agrega un número o un operador a la expresión actual.
 * @param {string} valor El número o operador a agregar
 */
function agregarValor(valor) {
    // Concatena el valor a la cadena de la expresión actual
    expresion += valor;
    // Actualiza el valor mostrado en la pantalla de la calculadora
    actualizarPantalla();
}

/**
 * Evalúa la expresión matemática.
 */
function calcular() {
    try {
        // Evalúa la expresión y actualiza la misma con el resultado
        expresion = eval(expresion).toString();
    } catch (error) {
        // En caso de error (por ejemplo, expresión mal formada), muestra error
        expresion = "Error";
    }
    // Actualiza la pantalla con el resultado o mensaje de error
    actualizarPantalla();
}

/**
 * Actualiza la pantalla de la calculadora.
 */
function actualizarPantalla() {
    // Establece el valor del elemento 'pantalla' a la expresión actual
    document.getElementById('pantalla').value = expresion;
}

/**
 * Reinicia la calculadora a su estado inicial.
 */
function reiniciar() {
    // Limpia la expresión
    expresion = '';
    // Restablece la pantalla
    actualizarPantalla();
}