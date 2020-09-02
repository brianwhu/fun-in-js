import { CommandLineArguments } from "../CommandLineArguments.js"
import { BinaryTree } from "../BinaryTree.js" // path to a module (lego piece)
//let params = CommandLineArguments.get(Deno.args, [ 'max' ]);


// Advanced data structure:
//  Tree
//      node - a piece of data
// recursive structure
// recursion

let a = new BinaryTree("A", null, null);
let c = new BinaryTree("C", null, null);
let e = new BinaryTree("E", null, null);
let h = new BinaryTree("H", null, null);
let g = new BinaryTree("G", null, h);


let b = new BinaryTree("B", a, c);
let f = new BinaryTree("F", e, g);

let d = new BinaryTree("D", b, f);

console.log(a);
console.log("================");
console.log(d);
console.log(`the depth of this tree is ${d.depth()}`)
console.log(`left tree from top is ...`);
console.log(d.left)
console.log("=================");

class ListVisitor {
    constructor() {
        this.list = [];
    }
    visit(name) {
        this.list.push(name);
    }
    print() {
        console.log(`Visited listing of this tree is ${this.list}`)
    }
}

class CountVisitor {
    constructor() {
        this.total = 0;
    }
    visit(name) {
        ++this.total;
    }
    print() {
        console.log(`There are ${this.total} nodes in this tree`);
    }
}

class SearchVisitor {
    constructor(nameToSearch) {
        this.name = nameToSearch;
        this.found = false;
    }
    visit(name) {
        if (name === this.name) {
            this.found = true;
        }
    }
    print() {
        console.log(`Name-search for "${this.name}": ${this.found}`);
    }
}

let listVisitor = new ListVisitor();

d.preorderVisit(listVisitor);
listVisitor.print();

let countVisitor = new CountVisitor();
d.preorderVisit(countVisitor);
countVisitor.print();

let searchVisitor = new SearchVisitor("F");
d.preorderVisit(searchVisitor);
searchVisitor.print();
