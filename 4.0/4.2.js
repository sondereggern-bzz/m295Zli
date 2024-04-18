const express = require('express');
const request = require('request');
const {response} = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch/');
});

const names = ['Hans', 'Peter', 'Klaus', 'Kurt', 'Karl', 'Karlhe', 'Meier', 'Seppli', 'Hansli', 'Hanspeter', 'Hansmeier', 'Hanspetermeier', 'Hanspetermeierli', 'Hanspetermeierlisepp', 'Hanspetermeierliseppi', 'Hanspeter']

app.get('/now', (req, res) => {
    res.send(new Date().toLocaleTimeString("de-CH", {timeZone: request.query.tz}));
});

app.post('/names', (req, res) => {
    names.push(req.body.name);
    res.send(names);
});


app.delete('/names', (req, res) => {
    //delete method that deletes a name from the list, der name wird per query mitgegeben und gibt dann 204 zurück
    const name = req.body.name;
    const index = names.indexOf(name);

    if (index > -1) {
        names.splice(index, 1);
        res.send(`i hate ${name}`);
    } else {
        res.send("Name doesn't exist!")
    }
});

app.get("/secret2", (req, res) => {
    //Einen Endpunkt GET /secret2, der den Header "Authorization" ausliest und 200 zurück gibt, wenn im Header "Basic aGFja2VyOjEyMzQ=" steht und ansonsten 401 zurück gibt
    if (req.headers.authorization === "Basic aGFja2VyOjEyMzQ=") {
        res.sendStatus(200)
    }
    res.sendStatus(401)
});

app.get("/chuck", async (req, res) => {
    const name = req.query.name;
    const jokeResponse = await fetch(`https://api.chucknorris.io/jokes/random`);
    const jokeJson = await jokeResponse.json();
    res.send(jokeJson.value.replace("Chuck Norris", name));
});

const about = {
    forname: "Nic",
    surname: "Sonderegger",
    age: 21,
    email: "",
    place: "Zürich Rebenweg 30",
    eyecolor: "Blau"
};
app.patch("/me", (req, res) => {
    res.send({...about, ...req.body});
});




app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

