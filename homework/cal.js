// Month Names
const monthNames = [
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

// Output Format Settings
const WeekDayCaption = "Su Mo Tu We Th Fr Sa";
const DateDisplayWidth = 3;
const BeforeDateSpace = '';
const AfterDataSpace = ' ';


// Start with the first of the month
let aDay = new Date();
aDay.setDate(1);

let month = aDay.getMonth();
let year = aDay.getFullYear();
let weekday = aDay.getDay();

let caption = `${monthNames[month]} ${year}`
let spaces = ' '.repeat((7 * DateDisplayWidth - 1 - caption.length) / 2)

console.log(spaces + caption);
console.log(WeekDayCaption);

let week = ' '.repeat(weekday * DateDisplayWidth)
let count = weekday

let date = 1
while (true) {
    let previousDay = aDay.getDate()
    aDay.setDate(date)

    if (previousDay > aDay.getDate()) {
        break
    }

    if (count < 7) {
        ++count
    } else {
        console.log(`${week}`)
        week = ''
        count = 1
    }
    if (aDay.getDate() < 10) {
        week = week + BeforeDateSpace + ' ' + aDay.getDate() + AfterDataSpace
    } else {
        week = week + BeforeDateSpace + aDay.getDate() + AfterDataSpace
    }

    ++date;
}

console.log(week);
