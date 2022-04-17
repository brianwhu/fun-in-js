import { BinaryTreeNode, OrderedBinaryTree } from "./OrderedBinaryTree.js"

let tree = new OrderedBinaryTree()

tree.print()

for (let i = 0; i < 25; ++i) {
    tree.insert(Math.floor(26 * Math.random()))
}
tree.insert('x')
tree.insert('z')
tree.insert('a')

tree.print()