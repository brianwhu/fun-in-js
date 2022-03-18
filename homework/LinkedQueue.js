class LinkedQueue {
    /**
     * Creates a new empty linked queue.
     * Refer to https://www.cs.usfca.edu/~galles/visualization/QueueLL.html
     */
    constructor() {
        this.head = null
        this.tail = null
    }

    /**
     * Adds data to the end of the queue.
     */
    enqueue(x) {
        let node = new Node(x)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
    }

    /**
     * Removes and returns the first element of the queue.
     */
    dequeue() {
        let node = this.head
        if (node === null) {
            return undefined
        } else {
            this.head = this.head.next
            if (this.head === null) {
                this.tail = null
            }
            return node.data
        }
    }

    print() {
        console.log(this.head)
        console.log(this.tail)
    }
}

class Node {
    constructor(payload) {
        this.data = payload
        this.next = null
    }
}

/* TESTING */

let queue = new LinkedQueue()

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
