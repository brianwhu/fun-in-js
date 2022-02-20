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

let property = ['species', 'ancestry', 'house', 'wizard', 'patronus']

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
       for (let i = 0; i < keys.length; ++i) {
              if (keys[i] !== '') {
                     console.log(`${keys[i]}: ${allStats[property[p]][keys[i]]}`);   // `human: ${stats.human}`
              } else {
                     console.log(`unknown: ${allStats[property[p]][keys[i]]}`);   // `human: ${stats.human}`
              }
       }
}

/*
let property = [ "wand", "magic", "ancestry", "species", "age" ]

for (let p = 0; p < property.length; ++p) {
    for (...) {
        .... chararcters[i][property[p]] ..
        ...
    }
}
stats = []
speciesStats
stats["species"]


//-//-//-//-//


let persons = [
       { spices: 'human', name: 'brian' },
       { spices: 'human', name: 'april' },
       { spices: 'dog', name: 'steve' }
]

//////////////

let speciesStats = {}
let nameStats = {}

for (let i = 0; i < persons.length; ++i) {
       let count = speciesStats[persons[i].spices];   // count = speciesStats.human
       if (count === undefined) count = 1; else ++count;
       speciesStats[persons[i].spices] = count; // speciesStats.human = 1

       count = nameStats[persons[i].name];   // count = nameStats.human
       if (count === undefined) count = 1; else ++count;
       nameStats[persons[i].name] = count; // nameStats.human = 1
}

let keys = Object.keys(speciesStats)
for (let i = 0; i < keys.length; ++i) {
       console.log(`${keys[i]}: ${speciesStats[keys[i]]}`);   // `human: ${stats.human}`
}

keys = Object.keys(nameStats)
for (let i = 0; i < keys.length; ++i) {
       console.log(`${keys[i]}: ${nameStats[keys[i]]}`);   // `human: ${stats.human}`
}
*/
