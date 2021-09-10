import { readLines } from "https://deno.land/std/io/mod.ts";

/*
    A command line Hidden Phrase game
    =================================

1. Create a secret phrase using 1 adjective and 1 noun from the lists

2. Display the phrase using place holders, each '.' represents a letter

    ..... ....

3. Prompt a player to enter one guess or SOLVE the puzzle

    Player 'X' please enter your guess (1 letter or SOLVE):

4. Read user input, which must be a letter from 'a' through 'z', or the word SOLVE in upper case

4.1 If user enters a letter

    * Correct letters (both upper and lower cases) are revealed

    G.... ....

4.2 If user enters SOLVE, prompt the same user to enter the solution

    Player 'X' please enter your solution

    * Correct solutions (ignoring extra spaces and upper/lower case) are accepted and the player wins
    * Failed solutions causes the other play to win immediately

5. The player guesses the last letter correctly wins

6. Continue till either player wins

7. Exit the program after announcing the game result

    Player 'X' wins!
*/

let adjectives = [
  'Good',
  'New',
  'First',
  'Last',
  'Long',
  'Great',
  'Little',
  'Own',
  'Other',
  'Old',
  'Right',
  'Big',
  'High',
  'Different',
  'Small',
  'Large',
  'Next',
  'Early',
  'Young',
  'Important',
  'Few',
  'Public',
  'Bad',
  'Same',
  'Able',
];

let nouns = [
  'Time',
  'Person',
  'Year',
  'Way',
  'Day',
  'Thing',
  'Man',
  'World',
  'Life',
  'Hand',
  'Part',
  'Child',
  'Eye',
  'Woman',
  'Place',
  'Work',
  'Week',
  'Case',
  'Point',
  'Government',
  'Company',
  'Number',
  'Group',
  'Problem',
  'Fact',
];

// generate a random secret phrase

// display the phrase using placeholders: .... ....

// prompt

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    // if the input === 'SOLVE'
    //      prompt for solution
    //      read solution
    //      if (solution is correct)
    //          this player wins
    //      otherwise
    //          the opponent wins
    // otherwise
    //      check to make sure the input is 1 letter between 'a' to 'z'
    //      test to see if this is a correct letter
    //      update phrase placeholder

    // display the phrase using placeholders: .... ....

    // switch player

    // prompt
}

