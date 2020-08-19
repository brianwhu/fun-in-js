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
