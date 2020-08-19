import { CommandLineArguments } from "../CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let data = [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];
let itemToFind = 13;

// block === { ... }

// find first
let firstFoundIndex = -1; // -1 means the index is not a real index
for (let i = 0; i < data.length; ++i) {
    // in the middle
    if (data[i] === itemToFind) {
        firstFoundIndex = i;
        break;
    }
}

// find all
// array is an variable number of variables
let foundIndexes = []; // foundINdexes.length === 0
for (let i = 0; i < data.length; ++i) {
    // in the middle
    if (data[i] === itemToFind) {
        foundIndexes.push(i); // place i into array as the last element - provide by JavaScript Array
        // a function is a piece of code someone already has written
        // a method - a function that is also part of an object (array, string, ...)
    }
}

// make it human-friendly

// give answer(s)
console.log("The result of finding the first")
if (firstFoundIndex === -1) {
    console.log(`Given number ${itemToFind} is not found`)
} else {
    console.log(`Given number ${itemToFind} is at position ${firstFoundIndex}`);
}

// output foundIndexes
console.log("The result of finding all")
if (foundIndexes.length === 0) {
    console.log(`Given number ${itemToFind} is not found`)
} else {
    console.log(`Given number ${itemToFind} is at positions ${foundIndexes}`)
}
console.warn("done");