const http = require('http');

// Get the URL from the command-line arguments
const url = process.argv[2];

http.get(url, (response) => {
    response.setEncoding('utf8');
    response.on('data', (data) => {
        console.log(data);
    });
    response.on('error', (error) => {console.error('Error', error)
    });
});