import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

// beginning
let N = params.max;
let sum = 0;

// for-loop control - loop variable
// 1. initialization
// 2. condition
// 3. adjustment/incremental
// execution
//      initialization (once)
//      condition - Boolean
//      body
//      adjustment
//    * condition
//    * body
for (let i = 1; i <= N; ++i) {
    // body
    // 1st time, i === 1
    // 2nd time, i === 2
    // ...
    // 50th time, i === 50
    sum = sum + i;
}
// sum = 0 + 1 + 2 + 3 + ... + 50

let alternative = (N+1)*(N/2); // assuming N is even

console.log(`The sum of integers from 1 to ${N} is ${sum}, whose true value should be ${alternative}`);
