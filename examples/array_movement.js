// PLAN:
// define some functions on array that we can use later
//  swap(index1, index2)
//  move(from, to)

// design
// coding

////////////////////////////////////////////////////////////////////////
//
// exchange the values in [index1] and [index2] in array
// 
// data - the data array
// index1 - one of the 2 indexes
// index2 - the other of the 2 indexes
//
// 0 <= index1 < array.length
// 0 <= index2 < array.length
let swap = function(array, index1, index2) {
    // copy the element at [index1] and put it in another variable
    if (index1 < 0 || index1 >= array.length) {
        throw `index ${index1} is invalid!`;
    }
    if (index2 < 0 || index2 >= array.length) {
        throw `index ${index2} is invalid!`;
    }
    if (index1 === index2) return; // very good if swaping is a long operation

    let a = array[index1];
    let b = array[index2];
    // a ==> [index2]
    array[index2] = a;
    array[index1] = b;
    // done!
}

///////////////////////////////////////////////////////////////////////////
//
// take 1 element out of array at "from", insert it at "to"
//
// Example: move (14, 5)
//      [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ]
//                           t:5                                 f:14
//                           -----------------------------------
//
//      [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, ?, 2, 89, 114 ]
//  a = array[14]
//  move from 5 - (14-1)
//      [ 125, 68, 4, 44, 74,   6, 28, 75, 22, 13, 62, 69, 13, ?, 42, 2, 89, 114 ]
//      [ 125, 68, 4, 44, 74,   6, 28, 75, 22, 13, 62, 69, ?, 13, 42, 2, 89, 114 ]
//      [ 125, 68, 4, 44, 74,   6, 28, 75, 22, 13, 62, ?, 69, 13, 42, 2, 89, 114 ]
//      ...
//      [ 125, 68, 4, 44, 74,   ?, 6, 28, 75, 22, 13, 62, 69, 13, 42, 2, 89, 114 ]
//  array[5] = a
//      [ 125, 68, 4, 44, 74, 121, 6, 28, 75, 22, 13, 62, 69, 13, 42, 2, 89, 114 ]
//                                 ----------------------------------
//
// Example: move (5, 14)
//      [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ]
//                           f:5                                 t:14
//                               ------------------------------------
//
let move = function(array, from, to) {
    if (to < from) {
        let a = array[from];
        // move everybody in between backwards
        for (let i = from - 1; i >= to; --i) {
            // move/copy [i] -> [i + 1]
            array[i + 1] = array[i]; // assignment
        }
        array[to] = a;   
    } else if (from < to) {
        let a = array[from];
        // move everybody in between forward
        for (let i = from + 1; i <= to; ++i) {
            // move/copy [i] -> [i - 1]
            array[i - 1] = array[i]; // assignment
        }
        array[to] = a;   
    }
}

let insertionSort = function(array) {
    let firstBadIndex = 1;
    while (firstBadIndex < array.length) {
        let a = array[firstBadIndex];
        // compare array[firstBadIndex] with all numbers in [0 .. firstBadIndex-1] and find the correct location, then insert
        for (let i = 0; i < firstBadIndex; ++i) {
            if (a <= array[i]) {
                // <i> is the position!
                // move the a to position <i>
                move(array, firstBadIndex, i);
                break;
            }
        }
        ++firstBadIndex;
    }
}

// return the index of item found, or -1 if not found
// search for item in array from index first (inclusive) to last (exclusive)
// * * * * * * * * * * * *
// 0                    length
// (length + 1)/2
//             6       10
//                 8
// first + (last - first)/2
// first + last/2 - first/2
// first/2 + last/2
// (first + last)/2
// (0 + length)/2
//             first = 5, last = 8:   <5><6>
//      middle = Math.floor((5 + 7)/2) = 6


let bindarySearch = function(array, item) {
    return bindarySearch2(array, 0, array.length, item);
}

// advanced
let bindarySearch2 = function(array, first, last, item) {
    // make sure [first, middle] is a good rangeL first < last
    if (first >= last) {
        // this range is not valid
        return -1;
    }
    // first .. last-1
    let middle = Math.floor((first + last)/2);
    //console.log(middle);
    if (item === array[middle]) {
        return middle;
    } else if (item < array[middle]) {
        return bindarySearch2(array, first, middle, number);
    } else {
        return bindarySearch2(array, middle + 1, last, number);
    }
}

// 0, 1
// middle = 1
// >
// middle + 1, last: 2, 1

// bubble sort

////////////////////////////////////////////////////////////////////////
// testing/usage

const data = [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];
//              0    1  2  3   4  [5] 6   7   8   9   10  11 [12] 13  14   15 16  17 
//const data2 = new Array(10);

// index1 = 5, index2 = 8
// [ 125, 68, 4, 44, 74,  {6}, 28, 75, {22}, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];
// swap(data, 5, 8)
// [ 125, 68, 4, 44, 74, {22}, 28, 75,  {6}, 13, 62, 69, 13, 42, 121, 2, 89, 114 ];

console.log(`data =\n${data}`);
//swap(data, 5, 12); // "invoke" the function, "call" the function, passing arguments "data", 5, 12
//console.log(`after swapping, ${data}`);
move(data, 14, 5);
console.log(`after moving\n${data}`);

move(data, 5, 10);
console.log(`after moving\n${data}`);

move(data, 3, 3);
console.log(`after moving\n${data}`);


// sorting: from lowest to highest
// [ 125, 68, 4, 44, 74, 6, 28, 75, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114 ]
// insertion sort
// [ 4, 6, 28, 44, 68, 74, 75, 125, 22, 13, 62, 69, 13, 42, 121, 2, 89, 114  ]
//  <0>                           <first>                            <length-1> <length>
// a = 22
//         <i>
insertionSort(data);
console.log(`After sorting\n${data}`);

/////////////////////////////////////////////////////////////////////////////

// Binary search

let number = 62;

let indexFound = bindarySearch(data, number);
if (indexFound === -1) {
    console.log(`Number ${number} is not found`);
} else {
    console.log(`Number ${number} is found at position ${indexFound}`);
}

