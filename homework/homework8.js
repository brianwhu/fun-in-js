/**
 * Prints a paragraph so that all words fit in a column with the given width.
 * 
 * Example:
 * 
 * |=======================================|
 * Fibonacci numbers are strongly related to
 * the golden ratio: Binet's formula
 * expresses the nth Fibonacci number in
 * terms of n and the golden ratio, and
 * implies that the ratio of two consecutive
 * Fibonacci numbers tends to the golden
 * ratio as n increases.
 * |=======================================|
 * 
 * Hint: use String.split() to help you.
 *  
 * @param text - a paragraph
 * @param width - the width of the column
 */
let printColumn = function(text, width) {
    let words = text.split(` `)
    let line = "";

    for (let i = 0; i < words.length; ++i) {
        if (words[i].length + line.length <= width) {
            line = line + words[i] + " ";
        } else {
            console.log(line.trimEnd());
            line = words[i] + " ";
        }
    }

    console.log(line);

}


/////////////////////////////////////////////////////
let paragraph = `Fibonacci numbers are strongly related to the golden ratio: Binet's formula expresses the nth Fibonacci number in terms of n and the golden ratio, and implies that the ratio of two consecutive Fibonacci numbers tends to the golden ratio as n increases.`;

const width = 52;

console.log("=".repeat(width));
printColumn(paragraph, width);
console.log("=".repeat(width));

