import { readLines } from "https://deno.land/std/io/mod.ts";

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

const NUM_OF_DISKS = 5;

class Pin {
}

let pins = [
    new Pin(),
    new Pin(),
    new Pin(),
]

let moveDisk = function(...) {
    let from = ...
    let to = ...

    let disk = pins[from].remove();
    pins[to].add(disk);
}

let steps = 0;

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    console.log(input.value);
    // process data.value here
    if (isValidInput(data.value)) {
        if (isValidMove(data.value)) {
            move(data.value);
            ++steps;

            displayDisks();
            promptForNextMove();
        } else {
            reportInvalidMode();
        }
    } else {
        reportInvalidInput();
    }
}
