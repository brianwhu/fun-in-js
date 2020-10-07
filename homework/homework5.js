
/**
 * Prints a multiplication table for numbers up to the given value.
 *
 * Example:
 *
 *  given number = 9
 * 
 * Prints out
 * 
 *      1 x 1 = 1
 *      1 x 2 = 2   2 x 2 = 4
 *      1 x 3 = 3   2 x 3 = 6   3 x 3 = 9
 *      ...
 *      1 x 9 = 9   2 x 9 = 18  3 x 9 = 27  ...     9 x 9 = 81
 * 
 * Use 4 spaces to separate rules on the same line
 * 
 * @param n - a given integer that is > 0
 */
let multiplicationTable = function(n) {

}


/**
 * Takes a number and returns an array of its digits.
 *
 * Example:
 * 
 *  2342  →  [ 2, 3, 4, 2]
 * 
 * @param n - a given integer
 * @returns a new array with all digits in the given number, in the order from high to low
 */
let digits = function(n) {
    let result = [];

    // compute the digits in n and store them in results

    return result;
}

/////////////////////////////////////////////////////

let max = 4 + Math.floor(Math.random() * 6);
console.log(`Multiplication Table up to ${max}:`);
multiplicationTable(max);

console.log("==========================");

let num = 10000 + Math.floor(Math.random() * 10000);
console.log(`Digits of number ${num} are:`);
let result = digits(num);
console.log(`${result}`);

