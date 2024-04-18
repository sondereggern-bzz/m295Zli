require('dotenv').config();
const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const basicAuth = require('express-basic-auth')

const authMiddleware = basicAuth({
    users: { 'zli': 'zli1234' }, // Benutzername und Passwort konfigurieren
    unauthorizedResponse: 'Unauthorized' // Antwort senden, wenn die Authentifizierung fehlschlägt
});
app.get('/public', (req, res) => {
    res.send('Public endpoint');
});

app.get('/private', authMiddleware, (req, res) => {
    res.send('Private endpoint');
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
