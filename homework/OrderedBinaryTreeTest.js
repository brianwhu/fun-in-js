import { BinaryTreeNode, OrderedBinaryTree } from "./OrderedBinaryTree.js"

let tree = new OrderedBinaryTree()

tree.print()

for (let i = 0; i < 25; ++i) {
    tree.insertData(Math.floor(26 * Math.random()))
}
tree.insertData('x')
tree.insertData('z')
tree.insertData('a')

tree.print()