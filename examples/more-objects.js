import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'max' ]);


// programming methodology
//  object-oriented programming
//  functional programming

// String

// type: Object


// object = data + behavior
// class = object template
class Rectangle {
    constructor(width, height) {
      this.width = width;   // data
      this.height = height; // data
    }
    computeArea() {    // method, behavior
        return this.width * this.height;
    }
}

let rect1 = {
    width: 100,
    hegiht: 50,
}

let rect2 = new Rectangle(200, 400);
let rect3 = new Rectangle(10, 10);

// object class
console.log(rect1.width);
console.log(rect2.computeArea());
console.log(rect3.computeArea());

let a = [1, 2, 3];
let b = new Array(3);
b[0] = 1;
b[1] = 2;
b[2] = 3;

console.log(a);
console.log(b);