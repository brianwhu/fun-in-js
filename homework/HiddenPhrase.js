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

let player = 'X'
let switchPlayer = function() {
    if (player === 'X') {
        player = 'O'
    } else {
        player = 'X'
    }
}

// generate a random secret phrase
let actualAdjective
let actualNoun
let phrase
let generatePhrase = function() {
    actualAdjective = `${adjectives[Math.floor(Math.random() * adjectives.length)]}`
    actualNoun = `${nouns[Math.floor(Math.random() * nouns.length)]}`
    phrase = `${actualAdjective} ${actualNoun}`
}

// display the phrase using placeholders: .... ....
let placeholder
let generatePlaceholder = function() {
    placeholder = `${'.'.repeat(actualAdjective.length)} ${'.'.repeat(actualNoun.length)}`
}

let isSolutionCorrect = function(solution) {
    // return true if solution is correct, false otherwise
    return solution.toLowerCase().replaceAll(' ', '') === phrase.toLowerCase().replaceAll(' ', '')
}

let gameOver = function() {
    console.log('')
    console.log(`Player '${player}' wins! The phrase was ${phrase}.`)
    console.log('')
    console.log('')
    console.log('')
    console.log('NEW GAME')
    switchPlayer()
    generatePhrase()
    generatePlaceholder()
    console.log(placeholder)
    console.log(`Player '${player}', please enter your guess (1 letter or SOLVE)`)
}

let gameplay = function(letter) {
    // test
    let lowerCasePhrase = phrase.toLowerCase()
    let placeholderArray = placeholder.split('')
    for (let i = 0; i < lowerCasePhrase.length; ++i) {
        if (letter === lowerCasePhrase.charAt(i)) {
            placeholderArray[i] = phrase.charAt(i)
        }
    }
    placeholder = placeholderArray.join('')
}

// prompt
generatePhrase()
generatePlaceholder()
console.log(placeholder)
console.log(`Player '${player}', please enter your guess (1 letter or SOLVE)`)

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    // if the input === 'SOLVE'
    //      prompt for solution
    //      read solution
    //      if (solution is correct)
    //          this player wins
    //      otherwise
    //          the opponent wins
    if (data.value === 'SOLVE') {
        console.log(`Player '${player}', please enter your solution`)
        data = await input.next()
        if (isSolutionCorrect(data.value)) {
            gameOver()
        } else {
            switchPlayer()
            gameOver()
            continue
        }
    // otherwise
    //      check to make sure the input is 1 letter between 'a' to 'z'
    //      test to see if this is a correct letter
    //      update phrase placeholder
    } else if (data.value.length !== 1) {
        console.log('Please enter a single letter.')
        continue
    } else if (data.value < 'a' || data.value > 'z') {
        console.log('Please enter a single letter between the letters "a" and "z".')
        continue
    } else {
        gameplay(data.value)
    }

    if (placeholder === phrase) {
        gameOver()
        continue
    }

    // display the phrase using placeholders: .... ....
    console.log(placeholder)

    // switch player
    switchPlayer()

    // prompt
    console.log(`Player '${player}', please enter your guess (1 letter or SOLVE)`)
}

