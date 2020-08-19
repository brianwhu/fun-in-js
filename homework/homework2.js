import { CommandLineArguments } from "../CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

/**
 * This function prints the 3 largest values in this array.
 * 
 * Example:
 *
 *  array = [ 91, 31, 18, 14, 35, 91, 78, 64, 24, 82, 53, 25, 0, 10, 47, 10, 43, 12, 4 ];
 *
 * The 3 largest values are 91, 82, 78, even though 91 appears twice in the array.
 */
let reportBig3 = function(array) {


    console.log(`The 3 biggest numbers are ${largest}, ${second}, ${third}`);
}

let data = Array.from({length: 18}, () => Math.floor(Math.random() * 128));
console.log(`Original array is ${data}`);

reportBig3(data);

