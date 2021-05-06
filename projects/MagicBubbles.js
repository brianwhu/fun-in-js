import { D3x } from "../visual/D3x.js";

let circles = new D3x('circle', {
    fill: d => d.color,
    stroke: 'green',
    cx: (d, i) => d.cx,
    cy: (d, i) => d.cy,
    r: d => d.r,
    opacity: d => d.opacity
  }
);

let MAX_COLOR = 0xFFFFFF;
let MAX_TRAIL = 20;

let data = [];

//circles.refresh(data);


let svg = document.querySelector(D3x.SVG);

svg.addEventListener("mousemove", e => {
    let pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let position = pt.matrixTransform(svg.getScreenCTM().inverse());
    let speed = Math.sqrt(e.movementX * e.movementX + e.movementY * e.movementY);
    
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