import { CommandLineArguments } from "../CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let text =
    "The String object's charAt() method returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string";

// let character = '-';
// string = "this is a string"

let words = [];

// words.push(variable1);

console.log(text.length); // property = a member/data
//console.log(text.charAt(5));
//console.log(text.charAt(11));
// substring = a part of a string
//console.log(`[${text.substring(5, 11)}]`);

// put words in a sentence into an array

let beginOfWord = 0;

//  beginOfWord = 0, probe = 0
// "this is"
//      ^
//  probe = 4
// substring(0, 4) = "this"

while (beginOfWord < text.length) {
    // for every step through the loop: i may be anything between 0 and length-1
    // what do we know? we already have the beginOfWord, because
    //      1. this is true for the first step
    //      2. this will be true, if we can make this true in every following step

    // find the end of the word, which is the character before the next space
    // now we are working on a single word, which begins at beginOfWord
    let probe = beginOfWord;
    // look for space
    while (text.charAt(probe) !== ' ' && text.charAt(probe) !== '.' && probe < text.length) {
        ++probe;
        //console.log(`the next probe is ${probe}`)
    }
    //console.log(`found a word between ${beginOfWord} and ${probe}`);

    // at this point of the code, text.charAt(probe) === ' '
    words.push(text.substring(beginOfWord, probe));

    // make sure we do this
    // beginOfWord = the begining of the next word
    beginOfWord = probe + 1;
}

console.log(words);


console.log("H" + "e" + "l" + "l" + "o Jessica");