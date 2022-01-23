import { readLines } from "https://deno.land/std/io/mod.ts";

/*
    Harry Potter Character Knowledge
    ==================================

0. Read the list of Harry Potter characters from 'data/HarryPotterCharacters.json'.

1. Pick a Harry Potter character by random.

2. Ask the player one of the 2 questions by random.

    - To which house does this person belong?
        a) Gryffindor
        b) Slytherin
        c) Hufflepuff
        d) Ravenclaw

    - This person is...
        a) a student
        b) a staff member
        c) neither/unknown

    2.1. Make sure never to repeat the same question on the same character.

3. If the answer is correct, the player scores 1 point.

4. Continue till the player ends the game, at which time print

    Number of Questions: 12
    Total Points Scored: 10

*/

let characters = JSON.parse(await Deno.readTextFile('fun-in-js/data/HarryPotterCharacters.json'))
let questions = ['To which house does this person belong?', 'This person is...']

let answersA = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
let answersB = ['a student', 'a staff member', 'neither/unknown']
let labels = ['a)', 'b)', 'c)', 'd)']

let number = 0
let theQuestion = ''
let choices = ''
let correctAnswer = ''
let done = []

let lower2number = s => s.charCodeAt(0) - 'a'.charCodeAt(0);

let assignPerson = function () {
    number = Math.floor(Math.random() * characters.length)

    for (let i = 0; i < done.length; ++i) {
        if (done[i] === number) {
            number = Math.floor(Math.random() * characters.length)
            continue
        }
    }
    done.push(number)
}

let pickQuestion = function () {
    if (characters[number].house === '') {
        theQuestion = questions[1]
    } else {
        theQuestion = questions[Math.floor(Math.random() * 2)]
    }
}

let isHogwartsStudent = function () {
    return characters[number].hogwartsStudent
}
let isHogwartsStaff = function () {
    return characters[number].hogwartsStaff
}

let assignChoices = function () {
    if (theQuestion === questions[0]) {
        choices = answersA
        for (let i = 0; i < choices.length; ++i) {
            if (choices[i] === characters[number].house) {
                correctAnswer = choices[i]
            }
        }
    } else {
        choices = answersB
        if (isHogwartsStudent()) {
            correctAnswer = answersB[0]
        } else if (isHogwartsStaff()) {
            correctAnswer = answersB[1]
        } else {
            correctAnswer = answersB[2]
        }
    }
}

// check input data correct
let check = function (data) {
    return choices[lower2number(data.charAt(0))] === correctAnswer
}

let prompt = function () {
    console.log('')
    console.log('Enter "end" to end the questions and see your final score.')
    console.log(characters[number].name)
    console.log(theQuestion)
    for (let i = 0; i < choices.length; ++i) {
        console.log(labels[i] + choices[i])
    }
}

let nextQuestion = function () {
    assignPerson()
    pickQuestion()
    assignChoices()
    prompt()
}

let count = 0
let points = 0
nextQuestion()
const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
    if (data.value === 'end') {
        console.log(`Number of Questions: ${count}`)
        console.log(`Total Points Scored: ${points}`)
        break
    } else if (data.value.length !== 1) {
        console.log('Please enter a single letter.')
        continue
    } else if (data.value < 'a' || data.value > 'd') {
        console.log('Please enter a single letter between the letters "a" and "d".')
        continue
    } else if (!check(data.value)) {
        ++count
        console.log('Incorrect answer.')
        console.log(`The correct answer was ${correctAnswer}.`)
        nextQuestion()
    } else {
        ++count
        ++points
        console.log('Correct answer. +1 points.')
        console.log(`You now have ${points} points.`)
        nextQuestion()
    }
}
