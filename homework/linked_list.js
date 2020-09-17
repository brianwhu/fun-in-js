import { CommandLineArguments } from "../CommandLineArguments.js"
let params = CommandLineArguments.get(Deno.args, [ 'max' ]);

// supporting class
class LinkedNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}


class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // add to the end of the list
    // 2 cases:
    //      1. head === tail === null
    //      2. head !== null && tail !== null
    append(data) {
        let node = new LinkedNode(data);
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        return node;
    }

    // find the node that contains itemToFind
    find(itemToFind) {
        // walk through the nodes in the list
        // start from "head", continue till next === null
        let child = this.head;
        // now child points to the first node in the list

        // now child points to the current node in the list
        while (child !== null) {
            if (child.data === itemToFind) {
                return child;
            } else {
                child = child.next;
            }

        }
        return null;
    }

    // HOMEWORK
    //  Remove/delete the first node in the linked list
    removeFirst() {

    }

}