function displayNumberName() {
    const numberInput = document.getElementById('numberInput').value.toString();
    const resultContainer = document.getElementById('resultContainer');

    const numberNames = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    let sum = ''

    numberInput.split('').forEach(number => {
        let numberPos = parseInt(number);
        sum += numberNames[numberPos] + ' ';
    })

    resultContainer.textContent = sum
}
