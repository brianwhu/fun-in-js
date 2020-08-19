//import { CommandLineArguments } from "../fun-in-js/CommandLineArguments.js"
// let params = CommandLineArguments.get(Deno.args, [ 'max' ]);


// try to use a function

// define a function with "formal parameters" - to be "reused"
// documents: find a number in an array
// parameter "array" - the array of numbers
// parameter "numberToFind" - the number to find
// parameter "isEqual" - an optional function that performs comparison
// returns - the index found, or -1 if not found
function findItem(array, itemToFind, isEqual) { // sub-program
    let firstFoundIndex = -1; // -1 means the index is not a real index
    for (let i = 0; i < array.length; ++i) {
        // in the middle - need to compare array[i] and itemToFind
        if (isEqual) { // isEqual is a function
            if (isEqual(array[i], itemToFind)) {
                firstFoundIndex = i; // fixes, fixes, fixes
                break;
            }
        } else { // no isEqual is passed in
            if (array[i] === itemToFind) {
                firstFoundIndex = i; // fixes, fixes, fixes
                break;
            }
        }
    }
    return firstFoundIndex;
}

// if (x) { ... }
//  -> false: x is 0, null, undefined, false
//  -> true: everything else


// function to report search result
// parameter "numberToFind" - the number to find
// parameter "foundIndex" - the index returned by findItem() (this could be -1)
// parameter "display" - an optional function that displays the item
// returns - undefined
function reportResult(itemToFind, foundIndex, display) {
    let itemDisplayed;
    
    if (display) {
        itemDisplayed = display(itemToFind);
    } else {
        itemDisplayed = itemToFind; // simple display
    }

    console.log(`The result of finding ${itemDisplayed} in array:`) // need to use backtick for string with variables!!!
    if (foundIndex === -1) {
        console.log(`  Given item ${itemDisplayed} is not found`)
    } else {
        console.log(`  Given item ${itemDisplayed} is at position ${foundIndex}`);
    }
}


// block === { ... }

let data = [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];
let data2 = [ "Hello", "World", "Home", "School", "Bus", "Ship", "Tree", "Airplain" ];
let data3 = [
    { city: "San Francisco", state: "California" },
    { city: "Tampa", state: "Florida" },
    { city: "New York", state: "New York" },
    { city: "Los Angeles", state: "California" },
    { city: "Miami", state: "Florida" },
    { city: "Dallas", state: "Texas" },
];


// find numbers

let numberToFind = 13;
let firstFoundIndex = findItem(data, numberToFind);
reportResult(numberToFind, firstFoundIndex);

// find text
const textToFind = "School";
let firstFoundIndex2 = findItem(data2, textToFind); // passing 2 arguments to the function
reportResult(textToFind, firstFoundIndex2);

// find location
// return true if location1 and location2 are the same
// return false otherwise
let compareLocation = function(location1, location2) {
    return location1.city === location2.city && location1.state === location2.state;
}

// "Tampa, Florida"
let displayLocation = function(location) {
    return "\"" + location.city + ", " + location.state + "\""; // escape sequence: \"
}


const locationToFind = { city: "Tampa", state: "Florida"};
const sanFrancisco = { city: "San Francisco", state: "Florida"};

let firstFoundIndex3 = findItem(data3, locationToFind, compareLocation);
reportResult(locationToFind, firstFoundIndex3, displayLocation);

let a = displayLocation;

let firstFoundIndex4 = findItem(data3, sanFrancisco, compareLocation);
reportResult(sanFrancisco, firstFoundIndex4, a);

console.log("------------------");

console.log(typeof(compareLocation));
console.log(typeof(locationToFind));



