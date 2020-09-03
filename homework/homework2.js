import { CommandLineArguments } from "../CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

/**
 * This function prints the 3 largest values in this array.
 * 
 * Example:
 *
 *  array = [ 91, 31, 18, 14, 35, 91, 78, 64, 24, 82, 53, 25, 0, 10, 47, 10, 43, 12, 4 ];
 *
 * The 3 largest values are 91, 82, 78, even though 91 appears twice in the array.
 */
let reportBig3 = function(array) {
    let largest = array[0]
    let second = array[0]
    let third = array[0]
    for (let i = 1; i < array.length; ++i) {
        if (array[i] > largest) {
            third = second
            second = largest
            largest = array[i];
        } else if (array[i] < largest && array[i] > second) {
            third = second
            second = array[i]
        } else if (array[i] < second && array[i] > third) {
            third = array[i]
        }
    }

    console.log(`The 3 biggest numbers are ${largest}, ${second}, ${third}`);
}

let data = Array.from({length: 18}, () => Math.floor(Math.random() * 128));
console.log(`Original array is ${data}`);

reportBig3(data);

