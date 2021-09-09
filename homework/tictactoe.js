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
let lower2number = s => s.charCodeAt(0) - 'a'.charCodeAt(0);

//cell positions based on index
let positions = [
    {row: 0, column: 0},
    {row: 0, column: 1},
    {row: 0, column: 2},
    {row: 1, column: 0},
    {row: 1, column: 1},
    {row: 1, column: 2},
    {row: 2, column: 0},
    {row: 2, column: 1},
    {row: 2, column: 2},
]

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]

const labels = [
    ' a   b   c ',
    ' d   e   f ',
    ' g   h   i '
]

let firstPlayer = 'X'
let player = 'X'
let moves = 0

let printBoard = function() {
    for (let i = 0; i < board.length; ++i) {
        // print out one line in board[i]
        let line = ''
        for (let j = 0; j < board[i].length; ++j) {
            // print out one cell in board[i][j]
            line = line + '[' + board[i][j] + ']' + ' '
        }
        console.log(line)
        console.log(labels[i])
    }
}

let declareWinner = function(message) {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    if (firstPlayer === 'X') {
        firstPlayer = 'O'
        player = 'O'
    } else {
        firstPlayer = 'X'
        player = 'X'
    }
    
    console.log('')
    console.log(message)
    console.log('')
    console.log('NEW GAME')
    printBoard()
    console.log(`Player '${player}', please enter your move:`)
}

printBoard()

const input = readLines(Deno.stdin);
console.log(`Player '${player}', please enter your move:`)
for (let data = await input.next(); !data.done; data = await input.next()) {
    //change board
    //1. validate input.value
    //2. if invalid, report error, then continue
    //3. if valid, check that the cell is open, then change the board
    //4. otherwise, report error

    if (data.value.length !== 1) {
        console.log('Please enter a single letter.')
        continue
    }
    if (data.value < 'a' || data.value > 'i') {
        console.log('Please enter a single letter between the letters "a" and "i".')
        continue
    }

    let cellPosition = positions[lower2number(data.value)]
    if (board[cellPosition.row][cellPosition.column] === ' ') {
        board[cellPosition.row][cellPosition.column] = `${player}`
    } else {
        console.log ('This cell is taken. Please try another cell.')
        continue
    }
    ++moves

    //print board
    printBoard()
    
    //decide if someone won
    let count = 0
    let gameOver = false
    for (let i = 0; i < 3; ++i) {
        if (board[i][cellPosition.column] === player) {
            ++count
            gameOver = count === 3
        } else {
            count = 0
            break
        }
    }
    if (!gameOver) {
        for (let i = 0; i < 3; ++i) {
            if (board[cellPosition.row][i] === player) {
                ++count
                gameOver = count === 3
            } else {
                count = 0
                break
            }
        }
    }
    if (!gameOver) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][i] === player) {
                ++count
                gameOver = count === 3
            } else {
                count = 0
                break
            }
        }
    }
    if (!gameOver) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][2 - i] === player) {
                ++count
                gameOver = count === 3
            } else {
                count = 0
                break
            }
        }
    }
    
    if (gameOver) {
        declareWinner(`Player '${player}' wins!`)
    } else if (moves === 9) {
        declareWinner('It is a tie!')
    } else {
        //switch player
        if (player === 'X') {
            player = 'O'
        } else {
            player = 'X'
        }
        //prompt player
        console.log(`Player '${player}', please enter your move:`)
    }
}
