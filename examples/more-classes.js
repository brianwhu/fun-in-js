import { CommandLineArguments } from "../CommandLineArguments.js"
//let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

// Class Inheritence

class Person {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    introduce() {
        console.log(`Hi my name is ${this.name}`)
    }

    whereAreYou() {
        console.log(`I'm in ${this.location}`);
    }

}

// extended class
// Person is the super class of Student
class Student extends Person {
    constructor(name, location, grade) {
        super(name, location);
        this.grade = grade;
    }

    // Students inherit all members and methods
    introduce() { // overriding
        super.introduce();
        console.log(`I'm in ${this.grade} grade`);
    }
}

class Teacher extends Person {
    constructor(name, location, school) {
        super(name, location);
        this.school = school;
    }

    introduce() { // overriding
        super.introduce();
        console.log(`I teach at ${this.school}`);
    }
}

// customer who uses your software

let brian = new Person("Brian", "Tampa");
brian.introduce();
brian.whereAreYou();

let jessica = new Student("Jessica", "San Francisco", 6);
jessica.introduce();
jessica.whereAreYou();

let april = new Teacher("April", "San Francisco", "Seven Oaks");
april.introduce();
april.whereAreYou();
