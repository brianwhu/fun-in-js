import { BinaryTree } from "../BinaryTree.js"

/**
 * This function evaluates an expression, in the form of a binary tree, and returns the result.
 * Example:
 *
 *                   "/"
 *                 /     \
 *               "*"      4
 *             /     \
 *           2       "+"
 *                 /     \
 *               3       "/"
 *                     /    \
 *                    6      2
 *
 *  Represents
 *
 *      (2 * (3 + (6 / 2))) / 4
 * 
 *  Not allowed: 1 + 2 + 3, 4 * 6 / 3
 *  Allowed: (1 + 2) + 3, 4 * (6 / 3)
 * 
 * @param expression - a BinaryTree that represents a mathematical expression
 */
let evaluate = function(expression) {
    let result = 0;

    // evaluation the expression tree
    // place result in variable 'result'

    return result;
}

let two1 = new BinaryTree(2, null, null);
let two2 = new BinaryTree(2, null, null);
let three = new BinaryTree(3, null, null);
let four = new BinaryTree(4, null, null);
let six = new BinaryTree(6, null, null);

let div  = new BinaryTree("/", six, two1);
let plus = new BinaryTree("+", three, div);
let mult = new BinaryTree("*", two2, plus);
let expr = new BinaryTree("/", mult, four);
console.log("The expression is")
console.log(expr);

let result = evaluate(expr);
console.log(`The value of the expression is ${result}`);
