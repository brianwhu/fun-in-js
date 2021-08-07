import { readLines } from "https://deno.land/std/io/mod.ts";

/*
    A command line Tic-Tac-Toe game
    ===============================

1. Print the game board like the following

    [ ] [X] [O]
     a   b   c
    [ ] [O] [ ]
     d   e   f
    [ ] [ ] [X]
     g   h   i

2. The 2 players are 'X' and 'O'. Player 'X' goes first.

3. Prompt a player to enter her move like the following

    Player 'X' please enter your move:

4. Read user input, which must be a letter from 'a' through 'i'

    * Incorrect input is not accepted
    * Incorrect move is not accepted

5. Continue till either player wins, or the board is filled up

6. Exit the program after announcing the game result

    Player 'X' wins!

   or

    It is a tie!

*/

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    console.log(data.value);
}
