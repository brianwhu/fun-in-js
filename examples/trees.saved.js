import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

import { BinaryTree } from "../BinaryTree.js"

// Advanced data structure:
//  Tree
//      node - a piece of data
// recursive structure
// recursion

// n-ary tree

let example = {
    data: "A",
    left: null,
    right: null
}

// 2 roles:
//      1. just a node in a tree
//      2. represents a (sub)tree
class TreeNode {
    constructor(data, left, right) {
        this.data = data;   // data
        this.left = left;   // TreeNode
        this.right = right; // TreeNode
    }

    // tells whether this node is a leaf or not
    // tells whether this is a subtree or just a leaf
    isLeaf() {
        return this.left === null && this.right === null;
    }

    /**
     * Returns the depth of this tree
     */
    depth() {
        let leftDepth = this.left === null ? -1 : this.left.depth();
        let rightDepth = this.right === null ? -1 : this.right.depth();
        return Math.max(leftDepth, rightDepth) + 1; // static method
    }

    /**
     * Preorder visiting
     * 
     * @param {*} visitor - an object with a method "visit(TreeNode.data)" 
     */
    preorderVisit(visitor) {
        visitor.visit(this.data);
        if (this.left !== null) {
            this.left.preorderVisit(visitor);
        }
        if (this.right !== null) {
            this.right.preorderVisit(visitor);
        }
    }
}

//let d = new TreeNode("D", ?, ?);

let a = new TreeNode("A", null, null);
let c = new TreeNode("C", null, null);
let e = new TreeNode("E", null, null);
let h = new TreeNode("H", null, null);
let g = new TreeNode("G", null, h);


let b = new TreeNode("B", a, c);
let f = new TreeNode("F", e, g);

let d = new TreeNode("D", b, f);

console.log(example);
console.log(a);
console.log("================");
console.log(d);
console.log(`the depth of this tree is ${d.depth()}`)
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
