const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;
app.use(express.json());


app.use(session({
    secret: 'geheimnisvollesGeheimnis', // Geheimnis zur Signierung der Sitzung
    resave: false,
    saveUninitialized: true
}));

app.post('/name', (req, res) => {
    const {name} = req.body;
    req.session.name = name;
    res.send(`Name '${name}' wurde in der Sitzung gespeichert.`);
});

// Endpunkt zum Abrufen des Namens aus der Sitzung
app.get('/name', (req, res) => {
    const name = req.session.name || 'Nicht gesetzt';
    res.send(`Aktuell gespeicherter Name: ${name}`);
});

// Endpunkt zum Löschen des Namens aus der Sitzung
app.delete('/name', (req, res) => {
    delete req.session.name;
    res.send('Name wurde aus der Sitzung gelöscht.');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
