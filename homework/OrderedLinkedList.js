import { LinkedQueue } from "./LinkedQueue.js"

/*
 * An OrderedLinkedList is a linked list that places inserted string in alphabetic order.
 * A non-string data is converted into a string before it is placed in the list.
 */
class OrderedLinkedList extends LinkedQueue {
    insert(data) {
        let value = data.toString();
        // insert this value to the right position
    }
}

/* TESTING */

let queue = new OrderedLinkedList()

if (queue.dequeue() !== undefined) {
    console.log('failure')
}

queue.enqueue(10)
queue.enqueue(20)

if (queue.dequeue() !== 10) {
    console.log('failure')
}

if (queue.dequeue() !== 20) {
    console.log('failure')
}

if (queue.dequeue() !== undefined) {
    console.log('failure')
}

queue.print()
