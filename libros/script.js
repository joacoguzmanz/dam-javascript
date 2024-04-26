// Instanciar libros
const library = [
    new Book("El Principito", "Antoine de Saint-Exupéry", 5),
    new Book("Cien Años de Soledad", "Gabriel García Marquez", 3),
    new Book('1984', 'George Orwell', 2),
    new Book('Meditations', 'Marcus Aurelius', 0)
];

// Función para tomar prestado un libro
function borrowBook(title) {
    const book = library.find(b => b.title === title);

    if (book) {
        const success = book.borrow();

        if (success) {
            alert(`Has tomado prestado el libro "${title}"`);
        } else {
            alert(`Lo siento, no hay copias disponibles para el libro "${title}"`);
        }
    } else {
        alert(`El libro "${title}" no se encontró.`);
    }
}

const getDetailsBook = (title) => {
    const book = library.find(b => b.title === title);

    if (book) {
        const success = book.getDetails();

        success ? alert(success) : alert(`Lo siento, no puedo dar detalles del libro "${title}"`);
    }
}

const stock = document.querySelector('#inventario');

const showStock = () => {
    stock.textContent = '';
    library.forEach(book => {
        let p = document.createElement('p');
        p.textContent = book.title + ' - Disponibles: ' + book.copies;
        stock.append(p);
    })
}
