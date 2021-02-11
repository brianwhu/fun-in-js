import { D3x, D3ShapeSeries } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { Settings } from "../visual/Settings.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";

// D3x is a manager of a series of similar shapes which are controlled by a data array

////////////
// CIRCLES
////////////

let circles = new D3x('circle',
  {
    fill: d => d.color,
    stroke: 'green',
    strokeWidth: d => d.s,
    cx: (d, i) => d.cx,
    cy: (d, i) => d.cy,
    r: d => d.r
  },
  {
    click: (datum, index) => {
      if (datum.color === 'gold') {
        datum.color = 'red';
        datum.r /= 2; // datum.r = darum.r / 2;
      } else {
        datum.color = 'gold';
        datum.r *= 2;
      }
      circles.refresh(data);
    },
    
    mouseover: (datum, index) => {
      datum.s = 10;
      circles.refresh(data);
    },
    mouseout: (datum, index) => {
      datum.s = 1;
      circles.refresh(data);
    },
  }
);


//let data = [ 23, 54, 17, 8, 2, 56, 98, 22 ];
//let data = Array.from({length: Math.floor(Math.random() * 10) + 4}, () => Math.floor(Math.random() * 50));

let data = [
  { cx: D3x.HEIGHT/4, cy: D3x.HEIGHT/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },
  { cx: D3x.HEIGHT/4, cy: D3x.HEIGHT*3/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },

  { cx: D3x.WIDTH - D3x.HEIGHT/4, cy: D3x.HEIGHT/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },
  { cx: D3x.WIDTH - D3x.HEIGHT/4, cy: D3x.HEIGHT*3/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },

  { cx: D3x.WIDTH/2, cy: D3x.HEIGHT/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },
  { cx: D3x.WIDTH/2, cy: D3x.HEIGHT*3/4, r: D3x.HEIGHT/4, color: 'gold', s: 1 },
];

circles.refresh(data);

///////////
// POLYGONS
///////////

// first argument = number of corners
// second argument = connect to the next "step" corners 
let polygonHelper = new RegularPolygon(10, 0);

// expecting a data array with each element having "cx", "cy", and "r"
let polygon = new D3x('polygon',
  {
    fill: 'skyblue',
    stroke: 'green',
    points: d => polygonHelper.points(d.cx, d.cy, d.r)
  }
);

let radius = D3x.HEIGHT/4;

let ploygonData = [
  { cx: 0, cy: 0, r: radius },
  { cx: 0, cy: D3x.HEIGHT/2, r: radius },

  { cx: D3x.WIDTH/2 - radius, cy: 0, r: radius },
  { cx: D3x.WIDTH/2 - radius, cy: D3x.HEIGHT/2, r: radius },

  { cx: D3x.WIDTH - D3x.HEIGHT/4 - radius, cy: D3x.HEIGHT/4 - radius, r: radius },
  { cx: D3x.WIDTH - D3x.HEIGHT/4 - radius, cy: D3x.HEIGHT*3/4 - radius, r: radius },
]

//polygon.refresh(ploygonData);

// expecing a data array with each element being the points string
let anyPolygon = new D3x('polygon', {
  fill: 'skyblue',
  stroke: 'green',
  points: d => d
}
);

let anyPolygonData = [
  "100,100 80,250 200,125"
];

//anyPolygon.refresh(anyPolygonData);

///////
// Path
///////

/*
let points = new D3x('circle', {
  fill: 'red',
  stroke: 'red',
  r: 5,
  cx: d => d.x,
  cy: d => d.y
});
*/

let guides = new D3x('polyline', {
  stroke: 'red',
  fill: 'none',
  strokeDasharray: "4,6",
  points: d => d.replaceAll(/[A-Za-z]/g, "") // changing "M400,480 Q640,750 1000,480" to "400,480 640,750 1000,480"
});

let path = new D3x('path', {
  fill: 'transparent',
  stroke: 'green',
  strokeWidth: 6,
  d: e => e
}
);
/*
let pathPoints = [
  { x: 400, y: 480 },
  { x: 640, y: 750 },
  { x: 1000, y: 480 },
];
*/
let pathData = [
  "M100,480 Q340,750 700,480 T1350,500"
]

//path.refresh(pathData);
//guides.refresh(pathData);

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

