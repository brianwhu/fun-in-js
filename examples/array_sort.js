import { CommandLineArguments } from "../CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let data = Array.from({length: 18}, () => Math.floor(Math.random() * 128));
console.log(`Original array is ${data}`)
console.log(`Original array is ${data.sort((a, b) => a - b)}`)


// Sorting is the process of putting things in the right order
