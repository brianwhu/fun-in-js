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

    // add to the begining of the list
    insert(data) {
        let node = new LinkedNode(data);
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
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
        // possible cases:
        //  1. the list is empty
        //  2. the list is not empty
        //      2.1.  there's only 1 node
        //      2.2.  there are 2 or more nodes
        if (this.head !== null) {
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
        }
    }

    // remove the node that holds data
    remove(data) {
        if (this.head === null) {
            return;
        } else {
            let seeker = this.head;
            let helper = null;
            while (seeker !== null) {
                if (seeker.data === data) { // FOUND IT!
                    // delete the node,
                    if (helper === null) { // first node
                        this.head = this.head.next;
                    } else {
                        helper.next = seeker.next;
                        if (helper.next === null) { // last node
                            this.tail = helper;
                        }
                    }
                    break;
                } else { // not found yet
                    helper = seeker;
                    seeker = seeker.next;
                }
            }
        }
    }

    print() {
        for (let seeker = this.head; seeker != null; seeker = seeker.next) {
            console.log(seeker.data);
        }
    }
}

export {
    LinkedList
}
