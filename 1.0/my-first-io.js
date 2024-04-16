const fs = require('fs')
const args = process.argv;


const result = fs.readFileSync(args[2])
const str = result.toString().split('\n').length-1
console.log(str)
