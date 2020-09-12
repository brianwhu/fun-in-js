import { BinaryTree } from "./BinaryTree.js"
import { Tokenizer } from "./Tokenizer.js"

class Expression {
    constructor(text) {
        let tokenizer = new Tokenizer("(+-*/)", text);
        this.tree = Expression.recognizeExpression(tokenizer);
    }

    evaluate() {
        return Expression.evaluate(this.tree);
    }

    /**
     * Recognizes an arithmetic expression, and returns a BinaryTree.
     * 
     * @param {tokenizer} tokenizer 
     */
    static recognizeExpression(tokenizer) {
        // recognize operand 1
        let operand1 = Expression.recognizeOperand(tokenizer);

        // recognize operator: +, -, *, /
        let next = tokenizer.next();
        if (next.type !== "SYMBOL" || next.value === "(" || next.value === ")") {
            throw `Unexpected operator ${token.value}`;
        }
        let operator = next.value;

        // recognize operand 2
        let operand2 = Expression.recognizeOperand(tokenizer);

        return new BinaryTree(operator, operand1, operand2);
    }

    /**
     * Recognized an operand in an arithmatic expression, and returns a BinaryTree.
     * 
     * @param {tokenizer} tokenizer 
     */
    static recognizeOperand(tokenizer) {
        let expr = null; // BinaryTree

        let next = tokenizer.next();
        if (next.type === "SYMBOL" && next.value === "(") {
            expr = Expression.recognizeExpression(tokenizer);
            tokenizer.expect("SYMBOL", ")", `Expecting ")"`);
        } else if (next.type = "NUMBER") {
            expr = new BinaryTree(next.value, null, null);
        } else {
            throw `Invalid operand`;
        }

        return expr;
    }

    static evaluate(expression) {
        if (expression.isLeaf()) { // terminal case
            return expression.data;
        } else {
            let leftResult = Expression.evaluate(expression.left); // recursion, adj. recursive
            let rightResult = Expression.evaluate(expression.right); // recursion
    
            switch(expression.data) {
            case "+":
                return leftResult + rightResult;
            case "-":
                return leftResult - rightResult;
            case "*":
                return leftResult * rightResult;
            case "/":
                return leftResult / rightResult;
            default: // never happens
                return 0;
            }
        }
    }
}

export {
    Expression
}

