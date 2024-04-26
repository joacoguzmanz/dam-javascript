class Book {
    constructor(title, author, copies) {
        this.title = title;
        this.author = author;
        this.copies = copies; // Número de copias disponibles
    }

// Método para tomar prestado un libro
    borrow () {
        if (this.copies > 0) {
            this.copies -= 1;
            return true; // Éxito al tomar prestado
        } else {
            return false; // No hay copias disponibles
        }
    }

    // Método para devolver un libro
    returnBook() {
        this.copies += 1;
    }

    // Método para obtener información del libro
    getDetails() {
        return `Título: ${this.title}, Autor: ${this.author}, Copias Disponibles: ${this.copies}`;
    }
}
