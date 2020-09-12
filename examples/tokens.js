import { CommandLineArguments } from "../CommandLineArguments.js"
import { Tokenizer } from "../Tokenizer.js"
import { Expression } from "../Expression.js"

//let params = CommandLineArguments.get(Deno.args, [ 'text' ]);

let params = {
    text: "(12+ (3 - 2 1 / 6)"
}

console.log(params.text);
let t = new Tokenizer("(+-*/)", params.text);
while (t.peek()) {
    console.log(t.next());
}

const text = "(2 * (3 + (6 / 2))) / 4";
let expr = new Expression(text);

console.log(`After parsing the text, the expression is:`);
console.log(expr);

let result = expr.evaluate();


console.log(`The value of ${text} is ${result}`);

