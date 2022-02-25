class LinkedQueue {
    /**
     * Creates a new empty linked queue.
     * Refer to https://www.cs.usfca.edu/~galles/visualization/QueueLL.html
     */
    initialize() {
    }

    /**
     * Adds data to the end of the queue.
     */
    enqueue(data) {
    }

    /**
     * Removes and returns the first element of the queue.
     */
    dequeue() {
        return undefined
    }
}

/* TESTING */

let queue = new LinkedQueue()

queue.enqueue(10)
queue.enqueue(20)

let ten = queue.dequeue();
if (ten === 10) {
    console.log("success");
} else {
    console.log("failure");
}
