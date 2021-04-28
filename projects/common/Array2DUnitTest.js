import { Array2D } from "./Array2D.js";

let a2d = new Array2D(7, 14);

//let trans = e => e ? 'XX' : '..';
let trans = function(e) {
    if (e !== undefined) {
        return e;
    } else {
        return "."
    }
}

// TODO generate some random contents into the array

let colors = [ 0, 1, 2 ];



// print the array before flooding

console.log("--------------")
a2d.log(trans);

// flood from a point
a2d.flood(0, 0, 2);

// print the array again

console.log("--------------")
a2d.log(trans);
