let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
];

let aDay = new Date();
//get the weekday of the first of the month
aDay.setDate(1);
let month = aDay.getMonth();
let year = aDay.getFullYear();
let weekday = aDay.getDay();

let caption = `${monthNames[month]} ${year}`
let spaces = ' '.repeat((20 - caption.length) / 2)

console.log(spaces + caption);
console.log("Su Mo Tu We Th Fr Sa");

let week = ' '.repeat(weekday * 3)
let count = weekday

let i = 1
while (true) {
    let previousDay = aDay.getDate()
    aDay.setDate(i)

    if (previousDay > aDay.getDate()) {
        break
    }

    if (count < 7) {
        ++count
        if (aDay.getDate() < 10) {
            week = week + ' ' + aDay.getDate() + ' '
        } else {
            week = week + aDay.getDate() + ' '
        }
    } else {
        console.log(`${week}`)
        week = ''
        if (aDay.getDate() < 10) {
            week = week + ' ' + aDay.getDate() + ' '
        } else {
            week = week + aDay.getDate() + ' '
        }
        count = 1
    }

    ++i;
}

console.log(week);