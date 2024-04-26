const HolaMundo = () => {
    alert('hey');
}

/*let year = prompt('¿En qué año fue publicada la especificación ECMAScript-2015?', '');

if (year < 2015) {
    alert( 'Muy poco...' );
} else if (year > 2015) {
    alert( 'Muy Tarde' );
} else {
    alert( '¡Exactamente!' );
}*/

const addTitle = () => {
    let title = document.createElement('h1');
    title.textContent = 'Hello World';
    document.body.appendChild(title);
}

const addP = (quote) => {
    let paragraph = document.createElement('p');
    paragraph.textContent = quote;
    document.body.appendChild(paragraph)
}

const createP = () => {
    let userInputOne = prompt('Ingrese un texto');
    let userInputTwo = prompt('Ingrese otro texto');

    let userInput = userInputOne + ' ' + userInputTwo;

    addP(userInput);
}

let fruits = ["Apple", "Orange", "Plum"];
const showFruits = () => {
    fruits.forEach(fruit => {
        addP(fruit);
    })

    fruits.map(fruit => {
        console.log(fruit);
    })
}
