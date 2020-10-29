
/**
 * Prints a solution to the tower of hanoi problem, i.e. moving all disks from the first pole to the third pole.
 * 
 * Hint: use recursion!
 *
 * Example 1:
 *
 *  hanoi('A', 'B', 'C', 1)
 * 
 * Prints
 *  A -> C
 *
 * Example 2:
 * 
 *  hanoi('A', 'B', 'C', 2)
 * 
 * Prints
 *  A -> B
 *  A -> C
 *  B -> C
 * 
 * @param a - the name of the first (starting) pole
 * @param b - the name of the second (empty) pole
 * @param c - the name of the third (ending) pole
 * @param disks - the number of disks, which is at least 1
 */
let hanoi = function(a, b, c, disks) {
    // disks >= 1
    if (disks === 1) {
        console.log(`${a} -> ${c}`);
        return 1;
    } else {
        // disks > 1
        let step1 = hanoi(a, c, b, disks - 1);
        console.log(`${a} -> ${c}`);
        let step2 = hanoi(b, a, c, disks - 1);
        return step1 + 1 + step2;
    }
}


/////////////////////////////////////////////////////

let disks = 6;
console.log(`Hanoi tower solution for ${disks} disks`);
let steps = hanoi('A', 'B', 'C', disks);
console.log(`There are a total of ${steps} steps`)

