
/**
 * Prints an SVG (scalable vector graph) showing the numbers in an array as circles with the numbers as radius.
 *
 * The width and height of the image must be calculated so that all circles fit in the image.
 * 
 * Example:
 * 
 *  [ 50, 100, 80, 70 ]
 * 
 * Produces (also in file "homework10.svg")
 *
 * <svg version="1.1" width="600" height="200" xmlns="http://www.w3.org/2000/svg">
 * <rect width="100%" height="100%" fill="pink" />
 * <circle cx="50" cy="100" r="50" fill="skyblue" /><text x="50" y="100" font-size="30" text-anchor="middle" fill="white">50</text>
 * <circle cx="200" cy="100" r="100" fill="skyblue" /><text x="200" y="100" font-size="30" text-anchor="middle" fill="white">100</text>
 * <circle cx="380" cy="100" r="80" fill="skyblue" /><text x="380" y="100" font-size="30" text-anchor="middle" fill="white">80</text>
 * <circle cx="530" cy="100" r="70" fill="skyblue" /><text x="530" y="100" font-size="30" text-anchor="middle" fill="white">70</text>
 * </svg>
 *
 * References:
 *  https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started
 *  https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
 *  
 * @param numbers - the array of numbers
 */
let printCircles = function(numbers) {

}


/////////////////////////////////////////////////////

console.log(".".repeat(4 + 3*width));
printCircles([ 12, 6, 32, 16, 5 ]);

