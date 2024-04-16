const express = require('express');
const request = require('request');
const {response} = require("express");
const app = express();
const port = 3000;

function getTime() {
    return new Date().toLocaleTimeString();
}

app.get('/now', (req, res) => {
    const time = getTime();
    res.send(`aktuele Zeit: ${time}`);
});



app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch/');
});

const names = ['Hans', 'Peter', 'Klaus', 'Kurt', 'Karl', 'Karlhe', 'Meier', 'Seppli', 'Hansli', 'Hanspeter', 'Hansmeier', 'Hanspetermeier', 'Hanspetermeierli', 'Hanspetermeierlisepp', 'Hanspetermeierliseppi', 'Hanspeter']

app.get('/name', (req, res) => {
    const radnom = names[Math.floor(Math.random() * names.length)]
    res.send(`${radnom}`)
});

app.get('/html', (req, res) => {
    res.sendFile("C:/Users/nicso/WebstormProjects/untitled4/3.0/index.html");
});

app.get('/image', (req, res) => {
    res.sendFile( "C:/Users/nicso/Pictures/IMG_20221117_122941_685.jpg");
});

app.get('/teapot', (req, res) => {
    res.status(418).send('I am a teapot');
});

app.get('/user-agent', (req, res) => {
    res.send(req.headers['user-agent']);
});

app.get('/secret', (req, res) => {
    res.status(403).send('Access denied');
});


app.get('/xml', (req, res) => {
    res.type('text/xml').send(fs.readFileSync('C://Users/xavier//WebstormProjects//ZLI-M295//A3//A3.3//static//data.xml', 'utf8'));
});

app.get('/me', (req, res) => {
    //sending a json object with age, name and email
    res.json({
        Alter: 21,
        surname: 'Nic',
        name: 'Sonderegger',
        Wohnort: 'Zürich Rebenweg 30',
        Augenfarbe: 'Blau',
    });
});


app.get('/now', (req, res) => {
    res.send(new Date().toLocaleTimeString("de-CH", {timeZone: request.query.tz}));
});

app.post('/names', (req, res) => {
    //post method that adds a name to the list, der name wird per form mitgegeben
    const name = req.body.name;
    names.push(name);
    res.send(`Name ${name} added to list`);
});

app.delete('/names', (req, res) => {
    //delete method that deletes a name from the list, der name wird per form mitgegeben und gibt dann 204 zurück
    const name = req.body.name;
    const index = names.indexOf(name);
    if (index > -1) {
        names.splice(index, 1);
        res.sendStatus(204);
    }
});



app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

