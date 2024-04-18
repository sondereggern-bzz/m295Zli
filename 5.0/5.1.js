const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Pfad zur automatisch generierten Swagger-Spezifikationsdatei
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
    { isbn: '978-3-16-148410-0', title: 'Der Herr der Ringe', year: 1954, author: 'J.R.R. Tolkien' },
    { isbn: '978-3-446-10295-6', title: 'Harry Potter und der Stein der Weisen', year: 1997, author: 'J.K. Rowling' },
    { isbn: '978-3-499-22032-1', title: 'Die Verwandlung', year: 1915, author: 'Franz Kafka' },
    { isbn: '978-3-15-000005-0', title: '1984', year: 1949, author: 'George Orwell' },
    { isbn: '978-3-518-01547-6', title: 'Der Steppenwolf', year: 1927, author: 'Hermann Hesse' }
];

let lends = [
    { id: 1, customer_id: 123, isbn: '978-3-16-148410-0', borrowed_at: new Date(), returned_at: null },
    { id: 2, customer_id: 456, isbn: '978-3-446-10295-6', borrowed_at: new Date(), returned_at: null }
];

// GET Endpoint für alle Bücher
app.get('/books', (req, res) => {
    res.json(books);
});

// GET Buch anhand seiner ISBN
app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    res.send(books.find((book) => book.isbn === isbn));
});

// POST neues Buch
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Function to find index of book by ISBN
function findBookIndex(isbn) {
    return books.findIndex((book) => book.isbn === isbn);
}

// PUT Aktualisieren ISBN
app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const index = findBookIndex(isbn);
    if (index !== -1) {
        books[index] = req.body;
        res.json(books[index]);
    } else {
        res.status(404).json({ error: 'Error' });
    }
});

// DELETE (ISBN)
app.delete("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const Index = books.findIndex(book => book.isbn === isbn);

    if (Index >= 0) {
        books.splice(Index, 1);
        res.send({ message: "Book deleted" });
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

// PATCH (ISBN)
app.patch('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.map((book) =>
        book.isbn === isbn ? { ...book, ...req.body } : book
    );
    res.json(books);
});


// GET alle Ausleihen
app.get('/lends', (req, res) => {
    res.json(lends);
});

// GET einzelne Ausleihe anhand ihrer id
app.get('/lends/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const lend = lends.find((lend) => lend.id === id);
    if (lend) {
        res.json(lend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
});

// POST Ausleihen eines Buchs
app.post('/lends', (req, res) => {
    const { customer_id, isbn } = req.body;
    const borrowed_at = new Date();
    const returned_at = null;
    const id = lends.length > 0 ? Math.max(...lends.map(lend => lend.id)) + 1 : 1;
    // ? : ist wie if else, code um die ID zu generieren ^
    const newLend = { id, customer_id, isbn, borrowed_at, returned_at };
    lends.push(newLend);
    res.json(newLend);
});



// DELETE Zurückgeben id
app.delete('/lends/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = lends.findIndex(lend => lend.id === id);
    if (index !== -1) {
        lends.splice(index, 1);
        res.status(204).json({});
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
