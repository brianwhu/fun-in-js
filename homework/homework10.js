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

    let width = 0
    for (let i = 0; i < numbers.length; ++i) {
        width = width + numbers[i] * 2
    }

    let height = numbers[0]
    for (let i = 1; i < numbers.length; ++i) {
        if (numbers[i] > height) {
            height = numbers[i]
        }
    }
    height = height * 2

    console.log(`<svg version="1.1" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`);
    console.log(`  <rect width="100%" height="100%" fill="black" />`);

    for (let i = 0; i < 300; ++i) {
        console.log(`  <circle cx="${Math.floor(Math.random() * width)}" cy="${Math.floor(Math.random() * height)}" r="${Math.floor(Math.random() * 5)}" fill="white"/>`)
    }

    let lastNumber = 0
    for (let i = 0; i < numbers.length; ++i) {
        console.log(`  <circle cx="${numbers[i] + lastNumber}" cy="${height / 2}" r="${numbers[i]}" fill="tan" /><text x="${numbers[i] + lastNumber}" y="${height / 2}" font-size="${numbers[i]}" text-anchor="middle" dominant-baseline="middle" fill="white">${numbers[i]}</text>`);
        lastNumber = lastNumber + numbers[i] * 2
    }

    console.log("</svg>");

}


/////////////////////////////////////////////////////

printCircles([ 15, 38, 40, 21, 434, 362, 158, 153]);

