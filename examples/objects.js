import { CommandLineArguments } from "../CommandLineArguments.js"
//let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

// Objects
/*
let today = new Date();
let another = new Date();

console.log(`today is ${today}`);
console.log(`another is ${another}`);

today.setMonth(0); // 0 = January

console.log(`today is ${today}`);
console.log(`another is ${another}`);
*/

// an object groups a set of named values (members)
let person = {
    name: "Brian",
    location: "Florida",
    isAdult: true,
};

let family = [
    {
        name: "Brian",
        location: "Florida",
        isAdult: true,
    },
    {
        name: "April",
        location: "California",
        isAdult: true,
    },
    {
        name: "Jessica",
        location: "California",
        isAdult: false,
        grade: 4,
    },
]
/*
console.log(family);
console.log(family[0].grade);
console.log(family[1].grade);
*/
// visit the array one by one
for (let i = 0; i < family.length; ++i) {
    console.log(`This person's name is ${family[i].name}`);
    if (family[i].grade === undefined) {
        console.log("This person is not in school")
    } else {
        console.log(`This person's grade is ${family[i].grade}`);
    }
}


// #49(when i===0) #49(when i===1), #49(when i==2)
