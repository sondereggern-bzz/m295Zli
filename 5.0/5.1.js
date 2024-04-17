const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));




let books = [
    { isbn: '978-3-16-148410-0', title: 'Der Herr der Ringe', year: 1954, author: 'J.R.R. Tolkien' },
    { isbn: '978-3-446-10295-6', title: 'Harry Potter und der Stein der Weisen', year: 1997, author: 'J.K. Rowling' },
    { isbn: '978-3-499-22032-1', title: 'Die Verwandlung', year: 1915, author: 'Franz Kafka' },
    { isbn: '978-3-15-000005-0', title: '1984', year: 1949, author: 'George Orwell' },
    { isbn: '978-3-518-01547-6', title: 'Der Steppenwolf', year: 1927, author: 'Hermann Hesse' }
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
app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const index = findBookIndex(isbn);
    if (index !== -1) {
        books.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'Error' });
    }
});

// PATCH (ISBN)

app.patch('/books/:isbn', (request, response) => {
    // books = books.map((book) =>
    //   book.isbn === request.params.isbn ? {...book, ...request.body} : book
    // );
    books = books.map((book) => {
        if(book.isbn === request.params.isbn) {
            return {...book, ...request.body};
        } else {
            return book;
        }
    })
    response.send(books);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
