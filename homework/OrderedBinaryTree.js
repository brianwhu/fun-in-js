class BinaryTreeNode {
    /**
     * Constructs a BinaryTreeNode, with the given data, left child node, and the right child node.
     *
     * @param data - the data value of this node
     * @param left - optional left child
     * @param right - optional right child
     */
    constructor(data, left, right) {
        this.data = data;   // data
        this.left = left ?? null;   // BinaryTreeNode
        this.right = right ?? null; // BinaryTreeNode
    }

    // tells whether this node is a leaf or not
    // tells whether this is a subtree or just a leaf
    isLeaf() {
        return this.left === null && this.right === null;
    }

}

class OrderedBinaryTree {
    /**
     * Constructs an OrderedBinaryTree with the given node at its root
     */
    constructor(root) {
        this.root = root
    }

    /**
     * Inserts a String value into the tree such that at any node the follow is true.
     * 
     *      node.left.data < node.data < node.right.data
     * 
     * If a value is already in the tree, no change is to be made to the tree.
     * 
     * @param {*} data - a String value
     */
    insert(data) {
        let value = data.toString()
    }
}

export {
    BinaryTreeNode, OrderedBinaryTree
}

