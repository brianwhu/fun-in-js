/*
 * Analyze Harry Potter characters to get the statistics on the following categories.
 *  
 *  - species (species ..., unknown)
 *  - gender (female, male, unknown)
 *  - house (four hourse, unknown)
 *  - occupation (student, staff, unknown)
 *  - wizard (yes, no, unknwon)
 *  - ancestry
 *  - patronus
 * 
 * (Feel free to add any categories that you think interesting)
 * 
 * Produce a report like this
 * 
 * Total Characters:
 *      400
 * 
 * Species:
 *      Human: 300
 *      House Elf: 28
 *      Unknown: 13
 * 
 * Gender:
 *      Female: 200
 *      Male: 200
 *      Unknown: 13
 * 
 * House:
 *     Gryffindor: 32
 *     ...
 *     Unknown: 13
 */

// Species: Human, House-Elf, Giant, Half-Giant, Dragon, Centaur, Goblin, Ghost, Poltergeist, Acromantula, Hippogriff, Three-Headed Dog, Owl, Cat, Unknown
// Gender: Female, Male, Unknown
// House: Gryffindor, Ravenclaw, Hufflepuff, Slytherin, Unknown
// Occupation: Student, Staff, Unknown
// Wizard: Yes, No, Unknown
// Ancestry: Pure-blood, Half-blood, Muggleborn, Muggle, Squib, Unknown

const characters = JSON.parse(await Deno.readTextFile('fun-in-js/data/HarryPotterCharacters.json'))

// Total Characters
let count = 0
for (let i = 0; i < characters.length; ++i) {
    ++count
}
console.log(`Total Characters: ${count}`)

//////////////

let property = ['species', 'ancestry', 'house', 'wizard', 'patronus', 'eyeColour', 'hairColour' ]

let allStats = {}

for (let i = 0; i < characters.length; ++i) {
    for (let p = 0; p < property.length; ++p) {
        let stats = allStats[property[p]]
        if (stats === undefined) {
            stats = {}
            allStats[property[p]] = stats
        }
        let count = allStats[property[p]][characters[i][property[p]]];   // count = speciesStats.human
        if (count === undefined) count = 1; else ++count;
        allStats[property[p]][characters[i][property[p]]] = count; // speciesStats.human = 1
    }
}

for (let p = 0; p < property.length; ++p) {
    let keys = Object.keys(allStats[property[p]])
    console.log('')
    console.log(property[p].toUpperCase())

    let unknown = 0;
    for (let i = 0; i < keys.length; ++i) {
        if (keys[i] !== '') {
            console.log(`\t${keys[i]}: ${allStats[property[p]][keys[i]]}`);   // `human: ${stats.human}`
        } else {
            unknown = allStats[property[p]][keys[i]];
        }
    }
    if (unknown > 0) {
        console.log(`\t*unknown: ${unknown}`);
    }
}

