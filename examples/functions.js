//import { CommandLineArguments } from "../fun-in-js/CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let data = [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];
let data2 = [ 0, 84, 105, 2, 68, 88, 87, 103, 82, 55, 21, 22, 19, 123, 6, 17, 119, 102 ];

let itemToFind = 13;


// try to use a function

// define a function with "formal parameters" - to be "reused"
// documents: find a number in an array
// parameter "array" - the array of numbers
// parameter "numberToFind" - the number to find
// returns - the index found, or -1 if not found
function findMyNumber(array, numberToFind) { // sub-program
    let firstFoundIndex = -1; // -1 means the index is not a real index
    for (let i = 0; i < array.length; ++i) {
        // in the middle
        if (array[i] === numberToFind) {
            firstFoundIndex = i; // fixes, fixes, fixes
            break;
        }
    }
    return firstFoundIndex;
}

// function to report search result
// parameter "numberToFind" - the number to find
// parameter "foundIndex" - the index returned by findMyNumber() (this could be -1)
// returns - undefined
function reportResult(numberToFind, foundIndex) {
    console.log(`The result of finding ${numberToFind} in array:`) // need to use backtick for string with variables!!!
    if (foundIndex === -1) {
        console.log(`  Given number ${numberToFind} is not found`)
    } else {
        console.log(`  Given number ${numberToFind} is at position ${foundIndex}`);
    }
}

function doTheWholeThing(array, item) {
    let index = findMyNumber(array, item);
    reportResult(item, index);
}

// block === { ... }

// call a function with "arguments"
let firstFoundIndex = findMyNumber(data, itemToFind);
reportResult(itemToFind, firstFoundIndex);

let firstFoundIndex2 = findMyNumber(data2, itemToFind);
reportResult(itemToFind, firstFoundIndex2);

console.log("============================");

let big = [
    [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ],
    [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ],
    [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ],
];

for (let i = 0; i < big.length; ++i) {
    // big[i] is an array

    // version 1
//    let theIndex = findMyNumber(big[i], itemToFind);
//    reportResult(itemToFind, theIndex);
    doTheWholeThing(big[i], itemToFind);
}

