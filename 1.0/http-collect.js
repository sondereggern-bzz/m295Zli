const http = require('http');
const bl = require('bl');

// Get the URL from the command-line arguments
const url = process.argv[2];

// Perform an HTTP GET request
http.get(url, (response) => {
    // Pipe the response stream into a Buffer List
    response.pipe(bl((err, data) => {
        if (err) {
            console.error('Error:', err);
            return;
        }

        // Calculate the total number of characters received
        const numCharacters = data.length;

        // Convert the buffer data to a string
        const responseData = data.toString();

        // Write the number of characters received to the console
        console.log(numCharacters);

        // Write the complete string of characters sent by the server to the console
        console.log(responseData);
    }));
});
