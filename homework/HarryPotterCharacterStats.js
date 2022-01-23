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
        Unknown: 13
 * 
 * Gender:
 *      Female: 200
 *      Male: 200
        Unknown: 13
 * 
 * House:
        Gryffindor: 32
        ...
        Unknown: 13
 */

const characters = JSON.parse(await Deno.readTextFile('fun-in-js/data/HarryPotterCharacters.json'))

