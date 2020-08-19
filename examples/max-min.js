import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'a', 'b' ]);

// array - data structure
//  array index/subscription/position/address - sequential
let numbers = [ 1, 3, 34, 56, 30, 102, -10, 3, 34, 23, 12, 45, 200 ];
// numbers[0], numbers[1], numbers[2], ...

console.log(`There are ${numbers.length} numbers`);
console.log("BEGIN");
for (let i = 0; i < numbers.length/*8*/; ++i) {
    console.log(`The number at position ${i} is ${numbers[i]}`); // ith element
}
console.log("END")

let max = numbers[0];
for (let i = 1; i < numbers.length; ++i) {
    // give:
    //      at position i
    //      max = largest number I have seen before this one
    if (numbers[i] > max) {
        max = numbers[i];
    }
    // result
    //      max = largest number I have seen including this one
}

console.log(`The largest number in the array is ${max}`);
