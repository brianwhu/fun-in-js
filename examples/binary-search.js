//import { CommandLineArguments } from "../fun-in-js/CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let data = Array.from({length: 32}, () => Math.floor(Math.random() * 99)).sort();

console.log(data);

