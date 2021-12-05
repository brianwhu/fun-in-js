import { readLines } from "https://deno.land/std/io/mod.ts";

/*
    Update
    ======

1. Allow the play to save the game, and load it later.

    1.1 User command to save game progress

    If user enters "save", save the game progress into "TowerOfHanoi.json".

    1.2 User commnad to load game progress

    If user enters "load", load the game progress from "TowerOfHanoi.json", replacing current progress.

2. After saving or loading, the game continues as usual.

    2.1 Print the towers

    2.2 Ask for next move

*/

/*
    A command line Tower of Hanoi game
    ==================================

1. Print the towers like the following

     |         |         |
    -+-        |         |
   --+--       |         |
  ---+---      |         |
 ========= ========= =========
     a         b         c

 You have made 0 moves.

   Details:

    1) The number of disks is given by constant NUM_OF_DISKS
    2) The smallest disk should be displayed as "-+-"
    3) The relative sizes of the disks are show above
    4) The ground is shown using "="

2. This is a single player game. The goal is to move all disks from pin A to pin C in fewest steps

3. Prompt the player to enter her move like the following

    Please enter your move as 2 letters (e.g. 'ac' moves a disk from pin A to C):

4. Read user input, which must be 2 different letters from 'a' to 'c'. 

    * Incorrect input is not accepted
    * Incorrect move is not accepted

5. Also check to make sure the move is valid (pin not empty and smaller disk on larger disk)

6. If the move is valid, take the move, increment the "move count", and re-draw the pins and disks

7. When all disks are in the final place, print the result

    Congratulations! You moved the disks in 34 steps.

*/

const NUM_OF_DISKS = 3

let lower2number = s => s.charCodeAt(0) - 'a'.charCodeAt(0);

let promptForNextMove = function () {
    console.log("Please enter your move as 2 letters (e.g. 'ac' moves a disk from pin A to C):")
}

let isValidInput = function (input) {
    let valid = /^[a-c]{2}$/
    if (valid.test(input)) {
        // good
        return true
    }
}

let disks = []
for (let i = 0; i < NUM_OF_DISKS; ++i) {
    disks.push([i + 1, 0, 0])
}

let steps = 0;

/*
disks = [
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
    [4, 0, 0]
]
*/

let top = `${' '.repeat(disks.length + 1)}|${' '.repeat(disks.length + 4 + disks.length - 1)}|${' '.repeat(disks.length + 4 + disks.length - 1)}|`
let base = `${'='.repeat(disks.length * 2 + 3)} ${'='.repeat(disks.length * 2 + 3)} ${'='.repeat(disks.length * 2 + 3)}`
let labels = `${' '.repeat(disks.length + 1)}a${' '.repeat(disks.length + 1)}${' '.repeat(disks.length + 2)}b${' '.repeat(disks.length + 1)}${' '.repeat(disks.length + 2)}c`

/*
     |         |         |
    -+-        |         |
   --+--       |         |
  ---+---      |         |
 ========= ========= =========
     a         b         c
*/

let displayDisks = function () {
    console.log(top)
    for (let i = 0; i < disks.length; ++i) {
        let line = ''
        for (let j = 0; j < disks[i].length; ++j) {
            if (disks[i][j] === 0) {
                line = line + ' '.repeat(disks.length + 1) + '|' + ' '.repeat(disks.length + 2)
            } else {
                line = line + ' '.repeat(disks.length + 1 - disks[i][j]) + '-'.repeat(disks[i][j]) + '+' + '-'.repeat(disks[i][j]) + ' '.repeat(disks.length + 2 - disks[i][j])
            }
        }
        console.log(line)
    }
    console.log(base)
    console.log(labels)
    console.log('')
    console.log(`You have made ${steps} moves.`)
}

let peak = function (pin) {
    for (let i = 0; i < NUM_OF_DISKS; ++i) {
        if (disks[i][pin] !== 0) {
            return disks[i][pin]
        }
    }
    return undefined
}

let remove = function (pin) {
    for (let i = 0; i < NUM_OF_DISKS; ++i) {
        if (disks[i][pin] !== 0) {
            let disk = disks[i][pin]
            disks[i][pin] = 0
            return disk
        }
    }
    return undefined
}

let add = function (pin, disk) {
    for (let i = 0; i < NUM_OF_DISKS; ++i) {
        if (disks[i][pin] !== 0) {
            disks[i - 1][pin] = disk
            return disk
        }
    }
    disks[NUM_OF_DISKS - 1][pin] = disk
    return disk
}

let move = function (fromPin, toPin) {
    if (peak(fromPin) === undefined) {
        return false;
    } else if (peak(toPin) === undefined) {
        let disk = remove(fromPin);
        add(toPin, disk);
        return true
    } else {
        let disk1 = peak(fromPin);
        let disk2 = peak(toPin);
        if (disk1 < disk2) {
            let disk = remove(fromPin);
            add(toPin, disk);
            return true
        } else {
            return false;
        }
    }
}

displayDisks()
promptForNextMove()

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    // process data.value here
    if (isValidInput(data.value)) {
        let fromPin = lower2number(data.value.charAt(0))
        let toPin = lower2number(data.value.charAt(1))
        if (move(fromPin, toPin)) {
            ++steps;
            displayDisks();

            if (disks[0][2] === 1) {
                console.log(`Congratulations! You moved the disks in ${steps} steps.`)
                disks = []
                for (let i = 0; i < NUM_OF_DISKS; ++i) {
                    disks.push([i + 1, 0, 0])
                }

                console.log('')
                console.log('NEW GAME')
                displayDisks()
                promptForNextMove()
            } else {
                promptForNextMove();
            }
        } else {
            console.log('Invalid input or move')
        }
    } else {
        console.log('Invalid input or move')
    }
}
