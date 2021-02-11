import { D3x } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { Settings } from "../visual/Settings.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";

let settings = {
    name: {
        label: "Name",
        prompt: "Please enter your name",
        value: "JavaScript World",
    },
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
        check: /^ *[1-9]\d* *$/,
        parse: v => Number(v)
    }
}

Settings.configure('Display', settings, settings => {
    // refresh app
    console.log(Object.keys(settings).reduce((obj, key) => (obj[key] = settings[key].value, obj), {}));
});

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

let circles = new D3x('circle',
  {
    fill: 'gold',
    stroke: 'green',
    cx: (d, i) => 30 + i * 40,
    cy: (d, i) => 30 + i * 30,
    r: d => d
  },
  {
    click: d => console.log(d),
  }
);

let star = new RegularPolygon(7, 2);

let stars = new D3x('polygon',
  {
    fill: 'gold',
    stroke: 'green',
    fillRule: 'evenodd',
    points: (d, i) => star.points(30 + i * 40, 200 + i * 30, 2*d)
  },
  {
    click: d => console.log(d)
  }
);

//let data = [ 23, 54, 17, 8, 2, 56, 98, 22 ];
let data = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 50));

circles.refresh(data);

stars.refresh(data);

let drawing = document.getElementById("drawing");
drawing.addEventListener('focus', event => console.log("ready"));
drawing.addEventListener('blur', event => console.log("paused"));
drawing.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
  case 37:
    console.log('LEFT');
    break;
  case 38:
    console.log('UP');
    break;
  case 39:
    console.log('RIGHT');
    break;
  case 40:
    console.log('DOWN');
    break;
  default:
    break;
  }
});

