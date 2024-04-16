const fs = require('fs')
const args = process.argv;

fs.readFile(args[2], 'utf8', (err, data) => {
    if (err) {console.error('Error reading file:', err); return;}

    const newlineCount = data.split('\n').length - 1;

    console.log(newlineCount);
});