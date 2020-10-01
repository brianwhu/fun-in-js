import { LinkedList } from "../LinkedList.js"
//import { CommandLineArguments } from "../CommandLineArguments.js"
//let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

let list = new LinkedList();

list.insert(5);
list.insert(8);
list.append(10);
list.append(12);

list.print();

console.log("find 5 and 9 =====")

let found = list.find(5);
console.log(found);

found = list.find(9);
console.log(found);

console.log("removeFirst=======")
list.removeFirst();
list.print();

console.log("remove 10 and 11 =")

list.remove(10);
list.remove(11);
list.print();