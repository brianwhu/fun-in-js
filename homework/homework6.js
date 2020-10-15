
/**
 * Returns an array with elements in the original array that are higher than a given number.
 *
 * Example:
 *
 *  given array = [ 3, 7, 1, 12, 13, 6, 59 ]
 *  given number = 9
 * 
 * Returns
 * 
 *  [ 12, 13, 59 ]
 * 
 * @param array - an array of integers
 * @param n - a given integer
 */
let elementsHigherThan = function(array, n) {
}


/**
 * Tests whether a string is a palindrome.
 *
 * Example palindrome words in English:
 * 
 *  redivider, deified, civic, radar, level, rotor, kayak, reviver, racecar, madam, refer
 * 
 * Hint:
 *  Read Javascript documents on String.charAt(), String.length()
 *
 * @param text - a given string
 * @returns whether the string is a palindrome
 */
let isPalindrome = function(text) {
    return false;
}

/////////////////////////////////////////////////////

let number = Math.floor(Math.random() * 128);
let array = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 128));
console.log(`Number is ${number}`);
console.log(`Array is ${array}`);
let result = elementsHigherThan(array, number);
console.log(`After filtering: ${result}`);

console.log("==========================");

let samples = [
    'home',
    'bus',
    'school',
    'redivider',
    'deified',
    'civic',
    'radar',
    'level',
    'rotor',
    'kayak',
    'reviver',
    'racecar',
    'madam',
    'refer',
    'is si'
];

for (let i = 0; i < samples.length; ++i) {
    console.log(`Is "${samples[i]}" a palindrome? ${isPalindrome(samples[i])}`);
}

