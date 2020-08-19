import { CommandLineArguments } from "../CommandLineArguments.js"
//let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

// Objects have members and methods(functions)
// Array has elements
// Computes the area of a single shape
// if a shape is not recognized, this function returns -1
function reportArea(shape) {
    let area = 0;

/*
    if (shape.type === "rectangle") {
        area = shape.width * shape.height;
    } else if (shape.type === "square") {
        area = shape.side * shape.side;
    } else if (shape.type === "circle") {
        area = shape.radius * shape.radius * Math.PI;
    } else if (shape.type === "triangle") {
        area = shape.base * shape.height / 2;
    } else {
        throw "I don't know this shape";
    }
*/
/* right triangle

    a, b, c

    then c*c === a*a + b*b

proof => always true
    */

    // programming style

    switch (shape.type) {
    case "rectangle":
        area = shape.width * shape.height;
        break;
    case "square":
        area = shape.side * shape.side;
        break;
    case "circle":
        area = shape.radius * shape.radius * Math.PI;
        break;
    case "triangle":
        area = shape.base * shape.height / 2;
        break;
    default:
        throw `I don't know shape "${shape.type}"`;
    }
    return area;
 }

let shapes = [
    {
        type: "rectangle", width: 20, height: 30
    },
    {
        type: "square", side: 40
    },
    {
        type: "circle", radius: 25
    },
    {
        type: "triangle", base: 50, height: 30
    },
    {
        type: "hexegon", side: 40, document: { name: "Hexegon Shape", short_desc: "...", website: "http://hexegon.com/"}, related: ["polygon", "polyline" 
    
    ]
    }
];

for (let i = 0; i < shapes.length; ++i) {
    try {
        let area = reportArea(shapes[i]);
        console.log(`For shape type ${shapes[i].type}, the area is ${area}`) 
    } catch (error) {
        console.log(`Something is wrong, since I caught an error, which says "${error}", and you can see more info on its website at ${shapes[i].document.website}`)
    }
 }
