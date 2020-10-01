import { BinaryTree } from "../BinaryTree.js"

/**
 * This function takes an array of numbers and returns an ordered BinaryTree (binary search tree) such that
 *
 *      max(left) <= data <= min(right)
 * 
 * is true in every sub-tree.
 * 
 * Example 1:
 *
 *  array = [ 1, 12, 4, 31, 10, 27, 13 ]
 *
 * This function builds an ordered tree
 *
 *              12
 *            /     \
 *          4         27
 *        /   \      /   \
 *      1      10  13     31
 * 
 * 
 * Example 2:
 * 
 *  array = [ 25, 1, 12, 4, 31, 10, 27, 13 ]
 *
 * This function builds an ordered tree
 *
 *              13
 *            /     \
 *          10        27
 *        /   \      /   \
 *      4      12  25     31
 *    /
 *   1
 * 
 * or
 * 
 *               12
 *            /       \
 *          4           27
 *        /   \        /   \
 *      1      10    25     31
 *                  /
 *                13
 * 
 * Hint: use recursion!
 */
let buildOrderedTree = function(array) {

    //return ...;
}


/// TESTING /////////////////////

let data = Array.from({length: 7}, () => Math.floor(Math.random() * 128));
console.log(`Original array is ${data}`);

let tree = buildOrderedTree(data);

class Printer {
    visit(data) {
        console.log(data);
    }
}

tree.preorderVisit(new Printer());
