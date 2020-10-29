import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'max' ]);


const SPACE = " ";
let LEVEL = 0;

/**
 * Returns the fibonacci number F(n).
 * 
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n-1) + F(n-2) for n > 1
 * 
 * n 0 1 2 3 4 5 6  7  8 ...
 * F 0 1 1 2 3 5 8 13 21 ...
 * 
 * @param n - the subscription of the fibonacci number
 */
let fibonacci = function(n) {
    ++LEVEL;

    console.log(`${SPACE.repeat(LEVEL)}>>>>>>>> ${n}`);

    let f = 0;
    if (n === 0) {
        f = 0;
    } else if (n === 1) {
        f = 1;
    } else {
        f = fibonacci(n - 1) + fibonacci(n - 2);
    }

    console.log(`${SPACE.repeat(LEVEL)}<<<<<<<< ${n}`);

    --LEVEL;
    return f;
}

let fibonacci2 = function(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let beforeLast = 0;
        let last = 1;
        let fibonacci = last + beforeLast;

        for (let i = 2; i < n; ++i) {
            beforeLast = last;
            last = fibonacci;
            fibonacci = last + beforeLast;
        }
        return fibonacci;
    }
}


console.log(fibonacci(params.max));
console.log(fibonacci2(params.max));