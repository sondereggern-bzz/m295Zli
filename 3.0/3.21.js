const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

async function getTemperature(zip) {
    const response = await fetch(`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`)
    const json = await response.json()
    return json.currentWeather.temperature
}

app.get('/', async (req, res) => {
    const zip = req.query.plz;
    const temperature = await getTemperature(request.query.plz);
    response.send(`aktuele Temperatur: ${zip}: ${temperature}`);
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

let url =" https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000";

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, data) => {
    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        // data is already parsed as JSON:
        console.log(data);
    }
});