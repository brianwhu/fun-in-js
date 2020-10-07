import { BinaryTree } from "../BinaryTree.js"

/**
 * This function reverses an array of random data in place
 *
 * Example:
 *
 *  [ 2, 5, 1, 7, 9, 3 ] → [ 3, 9, 7, 1, 5, 2 ]
 * 
 *  [ 2, 5, 1, 4, 7, 9, 3 ] → [ 3, 9, 7, 4, 1, 5, 2 ]
 *
 * 
 * @param array - an array of any objects
 */
let reverse = function(array) {
    // center is
    //  * either the position at the center when length is odd
    //  * or the position past center when length is even 
    let center = Math.floor(array.length/2);

    for (let i = 0; i < center; ++i) {
        // swap array[i] with array[length - (i + 1)]
        // 0, length-1
        // 1, length-2
        // 2, length-3
        // i, length-(i + 1) = length - i - 1
        let t = array[i];
        array[i] = array[array.length - (i + 1)];
        array[array.length - (i + 1)] = t;
    }

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
    let index1 = 0;
    let index2 = 0;

    // step 1: check next element in both arrays and insert the smaller into result 
    while (index1 < sorted1.length && index2 < sorted2.length) {
        if (sorted1[index1] === sorted2[index2]) {
            result.push(sorted1[index1]);
            ++index1;
            result.push(sorted2[index2]);
            ++index2;
        } else if (sorted1[index1] < sorted2[index2]) {
            result.push(sorted1[index1]);
            ++index1;
        } else {
            result.push(sorted2[index2]);
            ++index2;
        }
    }

    // now, at least one of the arrays are used up
    if (index1 < sorted1.length) {
        for (let i = index1; i < sorted1.length; ++i) {
            result.push(array1[i]);
        }
    } else if (index2 < sorted2.length) {
        for (let i = index2; i < sorted2.length; ++i) {
            result.push(array2[i]);
        }
    }

    return result;
}

/////////////////////////////////////////////////////

let data = Array.from({length: 8}, () => Math.floor(Math.random() * 128));
console.log(`Before reversing, data = ${data}`);
let result = reverse(data);
console.log(`After reversing, data = ${result}`);

console.log("================");

let array1 = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 128)).sort((a, b) => a - b);
let array2 = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 128)).sort((a, b) => a - b);
console.log(`Before merging, arrays are\n${array1}\nand\n${array2}`);
let merged = merge(array1, array2);
console.log(`After merging, result = ${merged}`);
