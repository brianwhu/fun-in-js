import { Array2D } from "./Helpers.js";

let a2d = new Array2D(6, 6);

let trans = e => e ? '.X.' : '...';
let coords = [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4} ];

console.log("--------------")
a2d.log(trans);

//a2d.set(coords, true);
for (let i = 0; i < coords.length; ++i) {
  a2d.get()[a2d.getIndex(coords[i].x, coords[i].y)] = true;
}
console.log("--------------")
a2d.log(trans);