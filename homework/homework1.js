// Write a function to print out
//      Father
//      Mother
//      Child and school grade
//
// Example output:
// Mother is "April"
// Father is "Brian"
// Child is "Jessica" in grade 4

function tellAboutFamily(aFamily) {
    for (let i = 0; i < aFamily.length; ++i) {
        if (aFamily[i].isAdult) {
            // mom or dad
            if (aFamily[i].gender === "male") {
                console.log(`Father is ${aFamily[i].name}.`)
            } else {
                console.log(`Mother is ${aFamily[i].name}.`)
            }
        } else {
            // child
            console.log(`Child is ${aFamily[i].name} and is in grade ${aFamily[i].grade}.`)
        }
    }
    
    console.log("end of report");
}

let family = [
    {
        name: "April",
        location: "California",
        isAdult: true,
        gender: "female",
    },
    {
        name: "Brian",
        location: "Florida",
        isAdult: true,
        gender: "male",
    },
    {
        name: "Jessica",
        location: "California",
        isAdult: false,
        grade: 4,
        gender: "female",
    },
];

tellAboutFamily(family);

