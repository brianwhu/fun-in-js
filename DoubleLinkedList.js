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

        return node;
    }

    // add to the begining of the list
    insert(data) {
        let node = new LinkedNode(data);

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

    //  Remove/delete the first node in the linked list
    removeFirst() {
        // possible cases:
        //  1. the list is empty
        //  2. the list is not empty
        //      2.1.  there's only 1 node
        //      2.2.  there are 2 or more nodes

    }

    // remove the node that holds data
    remove(data) {

    }
}