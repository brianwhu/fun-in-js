import { D3x } from "../fun-in-js/visual/D3x.js";
import { RegularPolygon } from "../fun-in-js/visual/RegularPolygon.js";
import { Settings } from "../fun-in-js/visual/Settings.js";
import { DisplayPanel } from "../fun-in-js/visual/DisplayPanel.js";

let settings = {
    margin: {
        label: "Margin",
        prompt: "",
        value: 15
    },
    fill: {
        label: "Fill Color",
        prompt: "",
        value: "gold"
    },
    stroke: {
        label: "Stroke Color",
        prompt: "",
        value: "green"
    },
/*
    numbers: {
        label: "Numbers",
        prompt: "A comma-separated list of natural numbers",
        value: "",
        check: /^ *(:?(\d{1,})(?: *, *(\d{1,}))*)? *$/,
        parse: /[^ ,]{1,}/g
    },
    "grade": {
        label: "School Grade",
        prompt: "Your grade in school",
        value: "Fourth",
        options: [
            "Kindergarten",
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth"
        ]
    },
    size: {
        label: "Size",
        prompt: "Playground size",
        value: 50,
        check: /^ *[0-9]\d* *$/,
        parse: v => Number(v)
    }
*/
}

/*
let display = new DisplayPanel();

let question2 = {
  "science": "Your choice of science",
  "grade": "Your grade in school"
}

options.build("Questionaire 1", question1, data => display.build("Here is your input", data, {
  name: "Name",
  numbers: "Numbers",
  grade: "Grade"
}, () => console.log("dismissed")));
*/

let data = [ 1, 2, 3, 4, 5 ];

let star = new RegularPolygon(7, 2);
let graphics = {
    circles: new D3x('circle', {
        fill: settings.fill.value,
        stroke: settings.stroke.value,
        cx: (d, i) => settings.margin.value + i * 20*d + d * 20,
        cy: (d, i) => settings.margin.value + d * 20,
        r: d => d * 20
    }),
    rectangles: new D3x('rect', {
        fill: settings.fill.value,
        stroke: settings.stroke.value,
        x: (d, i) => D3x.WIDTH/2 + settings.margin.value + i * 20*d + d * 20,
        y: (d, i) => settings.margin.value + d * 20,
        width: d => d * 30,
        height: d => d * 25,
        rx: (d, i) => d * 5,
        ry: (d, i) => d * 5,
    }),
    stars: new D3x('polygon', {
        fill: settings.fill.value,
        stroke: settings.stroke.value,
        fillRule: 'evenodd',
        points: (d, i) => star.points(settings.margin.value + i * 80, settings.margin.value + 200 + i * 30, 20*d)
    }),
}

Settings.configure('Settings', settings, settings => {
    Object.keys(graphics).forEach(k => graphics[k].refresh(data));
});

Object.keys(graphics).forEach(k => graphics[k].refresh(data));

let paths = new D3x('path', {
    stroke: settings.stroke.value,
    fill: settings.fill.value,
    d: (d, i) => d.join(' ')
});
paths.refresh([
    [ "M100,660", "Q328,690", "156,860" ]
]);

/*
let data = [ 23, 54, 17, 8, 2, 56, 98, 22 ];
circles.refresh(data);

stars.refresh(data);
*/
