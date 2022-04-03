import { LinkedQueue, Node } from "./LinkedQueue.js"

/**
 * An OrderedLinkedList is a linked list that places inserted string in alphabetic order.
 * A non-string data is converted into a string before it is placed in the list.
 */
class OrderedLinkedList extends LinkedQueue {
    /**
     * Insert data after node, which is never null.
     */
    insertAfter(node, data) {
        let newNode = new Node(data)
        newNode.next = node.next
        node.next = newNode
        if (this.tail === node) {
            this.tail = newNode
        }
    }

    insertAtHead(data) {
        let newNode = new Node(data)
        newNode.next = this.head
        this.head = newNode
    }

    insert(data) {
        let value = data.toString();
        if (this.head === null) {
            this.enqueue(value)
        } else if (value < this.head.data) {
            this.insertAtHead(value)
        } else {
            // look for suitible place to insert
            let probe = this.head
            while (probe.next !== null && probe.next.data < value) {
                probe = probe.next
            }
            this.insertAfter(probe, value)
        }
    }

    delete(data) {
        if (this.head === null) {
            return
        } else if (this.head === this.tail) {
            if (this.head.data === data) {
                // delete
                this.head = this.tail = null
            }
        } else {
            // there are at least 2 nodes
            let pre = this.head
            let probe = pre.next
            if (pre.data === data) {
                this.head = pre.next
            } else {
                while (probe.next !== null) {
                    if (probe.data === data) {
                        pre.next = probe.next
                        break
                    } else {
                        pre = pre.next
                        probe = probe.next
                    }
                }
                // stop condition: probe.next === null || probe.data === data
                if (probe.next === null) {
                    if (probe.data === data) {
                        pre.next = probe.next
                        this.tail = pre
                    }
                }
            }
        }
    }
}

/* TESTING */

let queue = new OrderedLinkedList()

queue.insert('some letters')
queue.insert('more words')
queue.insert('a')
queue.insert('32' + 3)
queue.insert('我50了，喜欢肖战这个孩子两年了，天天睡觉前睁开眼就是看他，他顺利开心我们就满足')
queue.insert('我50了，喜欢肖战这个孩子两年了，天天睡觉前睁开眼就是看他，他顺利开心我们就满足rfeij o3')

queue.print()

queue.delete('我50了，喜欢肖战这个孩子两年了，天天睡觉前睁开眼就是看他，他顺利开心我们就满足')
queue.print()
queue.delete('323')
queue.print()
queue.delete('我50了，喜欢肖战这个孩子两年了，天天睡觉前睁开眼就是看他，他顺利开心我们就满足rfeij o3')
queue.print()
queue.delete('b')
queue.print()
