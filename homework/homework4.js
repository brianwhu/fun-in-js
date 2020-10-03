import { BinaryTree } from "../BinaryTree.js"

/**
 * This function reverses an array of random data in place
 *
 * Example:
 *
 *  [ 2, 5, 1, 7, 9, 3 ] → [ 3, 9, 7, 1, 5, 2 ]
 * 
 * @param array - an array of any objects
 */
let reverse = function(array) {

    return array;
}


/**
 * This function merges 2 sorted arraies. Do not use sort function.
 *
 * Example:
 * 
 *  [1, 4, 6], [2, 3, 5, 7] → [1, 2, 3, 4, 5, 6, 7]
 * 
 * @param sorted1 - the first sorted array
 * @param sorted2 - the second sorted array
 * @returns a new sorted array with all elements in sorted1 and sorted2
 */
let merge = function(sorted1, sorted2) {
    let result = [];

    // merge the 2 arraies into result

    return result;
}

/////////////////////////////////////////////////////

let data = Array.from({length: 8}, () => Math.floor(Math.random() * 128));
console.log(`Before reversing, data = ${data}`);
let result = reverse(data);
console.log(`After reversing, data = ${result}`);

let array1 = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 128)).sort((a, b) => a - b);
let array2 = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 128)).sort((a, b) => a - b);
console.log(`Before merging, arries are\n${array1}\nand\n${array2}`);
let merged = merge(array1, array2);
console.log(`After merging, result = ${merged}`);
