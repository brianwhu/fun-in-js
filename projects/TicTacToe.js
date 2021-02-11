import { D3x } from "../fun-in-js/visual/D3x.js";

const SIZE = 250;
const EDGE = 10;

let S = 3 * SIZE + 2 * EDGE;
let X = (D3x.WIDTH - S)/2;
let Y = (D3x.HEIGHT - S)/2;

let data = [ { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 }, { owner: 0 } ];
let turn = 0;
let newGame = function() {
    data.forEach(e => e.owner = 0);
    turn = 0;
}

let grids = new D3x('rect',
  {
    fill: 'gold',
    stroke: 'green',
    x: (d, i) => X + (i % 3) * (SIZE + EDGE),
    y: (d, i) => Y + Math.trunc(i/3) * (SIZE + EDGE),
    width: (d, i) => SIZE,
    height: (d, i) => SIZE
  },
  {
    click: d => {
        if (d.owner === 0) {
            if (turn === 0) {
                d.owner = 1;
                Xs.refresh(data);
            } else {
                d.owner = 2;
                Os.refresh(data);
            }
        }
        turn = 1 - turn;
    }
  }
);

let Xs = new D3x('path',
  {
    fill: 'gold',
    stroke: 'blue',
    strokeWidth: 10,
    visibility: (d, i) => d.owner === 1 ? "visible" : "hidden",
    d: (d, i) => `M ${X + (i % 3) * (SIZE + EDGE) + 1*SIZE/4},${Y + Math.trunc(i/3) * (SIZE + EDGE) + 1*SIZE/4}
                  L ${X + (i % 3) * (SIZE + EDGE) + 3*SIZE/4},${Y + Math.trunc(i/3) * (SIZE + EDGE) + 3*SIZE/4}
                  M ${X + (i % 3) * (SIZE + EDGE) + 1*SIZE/4},${Y + Math.trunc(i/3) * (SIZE + EDGE) + 3*SIZE/4}
                  L ${X + (i % 3) * (SIZE + EDGE) + 3*SIZE/4},${Y + Math.trunc(i/3) * (SIZE + EDGE) + 1*SIZE/4}`,
  }
);

let Os = new D3x('circle',
  {
    fill: 'gold',
    stroke: 'red',
    strokeWidth: 10,
    visibility: (d, i) => d.owner === 2 ? "visible" : "hidden",
    cx: (d, i) => X + (i % 3) * (SIZE + EDGE) + SIZE/2,
    cy: (d, i) => Y + Math.trunc(i/3) * (SIZE + EDGE) + SIZE/2,
    r: (d, i) => SIZE/3,
  }
);

grids.refresh(data);
Playground.UseButton(Playground.BLUE_BUTTON, "New Game", event => {
    newGame();
    Xs.refresh([]);
    Os.refresh([]);
});

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

