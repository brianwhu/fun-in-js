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
        if (this.left === null && this.right === null) {
            return this.left === null && this.right === null;
        }
    }

    insert(data) {
        let value = data.toString()
        if (value === this.data) {
            return
        } else if (value < this.data) {
            if (this.left !== null) {
                this.left.insert(value)
            } else {
                this.left = new BinaryTreeNode(value)
            }
        } else {
            if (this.right !== null) {
                this.right.insert(value)
            } else {
                this.right = new BinaryTreeNode(value)
            }
        }
    }

    print() {
        if (this.left !== null) {
            this.left.print()
        }
        console.log(this.data)
        if (this.right !== null) {
            this.right.print()
        }
    }
}

class OrderedBinaryTree {
    /**
     * Constructs an OrderedBinaryTree with the given node at its root
     */
    constructor(root) {
        this.root = root ?? null
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
        if (this.root === null) {
            this.root = new BinaryTreeNode(value)
        } else {
            let probe = this.root
            while (!probe.isLeaf()) {
                if (value === probe.data) {
                    return
                } else if (value < probe.data) {
                    if (probe.left === null) {
                        probe.left = new BinaryTreeNode(value)
                        break
                    } else {
                        probe = probe.left
                    }
                } else {
                    if (probe.right === null) {
                        probe.right = new BinaryTreeNode(value)
                        break
                    } else {
                        probe = probe.right
                    }
                }
            }
            if (probe.isLeaf()) {
                if (value === probe.data) {
                    return
                } else if (value < probe.data) {
                    probe.left = new BinaryTreeNode(value)
                } else {
                    probe.right = new BinaryTreeNode(value)
                }
            }
        }
    }

    insertData(data) {
        if (this.root !== null) {
            this.root.insert(data)
        } else {
            this.root = new BinaryTreeNode(data.toString())
        }
    }

    print() {
        if (this.root !== null) {
            this.root.print()
        }
    }
}

export {
    BinaryTreeNode, OrderedBinaryTree
}

