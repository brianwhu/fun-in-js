import { D3x } from "../visual/D3x.js";

let bubbles = new D3x('circle', {
    fill: d => d.color,
    stroke: 'blue',
    cx: (d, i) => d.cx,
    cy: (d, i) => d.cy,
    r: d => d.r,
    opacity: d => d.opacity
  }
);

let data1 = []

let circles = new D3x('circle', {
    fill: d => d.color,
    stroke: 'cyan',
    cx: (d, i) => d.cx,
    cy: (d, i) => d.cy,
    r: d => d.r,
    opacity: d => d.opacity
  }
);

let MAX_COLOR = 0xFFFFFF;
let MAX_TRAIL = 80;

let data = [];

//circles.refresh(data);

let svg = document.querySelector(D3x.SVG);

svg.addEventListener("mousemove", e => {
    let pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let position = pt.matrixTransform(svg.getScreenCTM().inverse());1
    let speed = Math.sqrt(e.movementX * e.movementX + e.movementY * e.movementY);
    
    data1.push({
        cx: position.x,
        cy: position.y,
        r: 35,
        color: 'lightblue',
    });
    bubbles.refresh(data1);
    
    //console.log(`speed ${speed} @ ${position.x}, ${position.y}`);
    data.push({
        cx: position.x,
        cy: position.y,
        r: 25 + speed * 2,
        color: "#" + Math.floor(speed*100000).toString(16).padStart(6, "0"),
    });
    while (data.length > MAX_TRAIL) data.shift();
    circles.refresh(data);
});

/*
svg.addEventListener("mouseover", e => {
    if (data[0].opacity === 0) {
        data[0].opacity = 1;
        circles.refresh(data);
    }
});

svg.addEventListener("mouseout", e => {
    if (data[0].opacity === 1) {
        data[0].opacity = 0;
        circles.refresh(data);
    }
});
*/