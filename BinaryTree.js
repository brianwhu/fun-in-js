class BinaryTree {
    constructor(data, left, right) {
        this.data = data;   // data
        this.left = left || null;   // BinaryTree
        this.right = right || null; // BinaryTree
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
     * @param {*} visitor - an object with a method "visit(BinaryTree.data)" 
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

class ExpressionTree extends BinaryTree {
    evaluate() {
        
    }

}

export {
    BinaryTree
}

