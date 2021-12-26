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

    - Is this person
        a) a student
        b) a staff
        c) neither/unknown

    2.1. Make sure never to repeat the same question on the same character.

3. If the answer is correct, the player scores 1 point.

4. Continue till the player ends the game, at which time print

    Number of Questions: 12
    Total Points Scored: 10

*/

const input = readLines(Deno.stdin);
for (let data = await input.next(); !data.done; data = await input.next()) {
}
