const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const basicAuth = require('express-basic-auth');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const session = require("express-session"); // Pfad zur automatisch generierten Swagger-Spezifikationsdatei
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

// Dummy-Benutzerdaten für den Login
const secretAdminCredentials = { email: "desk@library.example", password: "m295" };

// Middleware für die Authentifizierung
const authMiddleware = (req, res, next) => {
    if (req.session.email) {
        next(); // Weiter zur nächsten Middleware oder Route, wenn authentifiziert
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Login-Endpunkt
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Überprüfung der Anmeldeinformationen
    if (email?.toLowerCase() === secretAdminCredentials.email && password === secretAdminCredentials.password) {
        // Verknüpfen der E-Mail mit der Sitzung
        req.session.email = email;
        return res.status(200).json({ email: req.session.email });
    }

    return res.status(401).json({ error: "Invalid credentials" });
});

// Logout-Endpunkt
app.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.status(204).end();
    });
});

// Überprüfung der Session-Endpunkt
app.get('/verify', (req, res) => {
    if (req.session.email) {
        res.status(200).json({ email: req.session.email });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

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
app.get('/lends', authMiddleware, (req, res) => {
    // Hier würde der Code stehen, um alle Ausleihen abzurufen
    res.status(200).json({ message: "List of lends" });
});

// POST Ausleihen eines Buchs (geschützt durch Authentifizierung)
app.post('/lends', authMiddleware, (req, res) => {
    // Hier würde der Code stehen, um eine Ausleihe hinzuzufügen
    res.status(201).json({ message: "Lend added" });
});

// DELETE Zurückgeben einer Ausleihe (geschützt durch Authentifizierung)
app.delete('/lends/:id', authMiddleware, (req, res) => {
    // Hier würde der Code stehen, um eine Ausleihe zurückzugeben
    res.status(204).end();
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
