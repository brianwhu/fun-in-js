import { D3x, D3ShapeSeries } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { Settings } from "../visual/Settings.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";

// D3x is a manager of a series of similar shapes which are controlled by a data array

////////////////////
// ConnectFour Frame
////////////////////

/*
  In the Game Frame, we use the following values
    'white': the position is empty
    'yellow': the position is taken by a yellow piece
    'red': the position is taken by a red piece
*/

class GameFrame {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.positions = new Array(rows * columns);
    this.isActive = true;
    this.turn = "red";
    this.winningStrokeWidth = 12;
    this.restart();
  }

  setColor(x, y, color) {
    this.positions[this.getIndex(x, y)] = color;
  }

  /**
   * Drop a piece in a colume
   * 
   * @param {*} x 
   * @param {*} color 
   * @returns a result object with 2 properties:
   *    successful: true if successful, false otherwise
   *    position: the position of the new piece if successful, undefined otherwise
   */
  dropPieceInThisColume(x) {
    // the highest position is (x, 0)
    // the lowest postion is (x, FRAME_ROWS - 1)
    let y = 0; // variable scope
    for (y = 0; y < FRAME_ROWS; ++y) {
      // check the color at (x, y)
      if (this.getColor(x, y) === 'white') {
        // continue to the next
      } else {
        // report y position
        break;
      }
    }

    console.log(`dropPieceInThisColume: y = ${y}`);
    // change color here
    // if every position is white, then y === FRAME_ROWS
    // if another color is found, then position at y has a color
    if (y === 0) {
      // the column is full, so we cannot place a piece here
      return { successful: false }; // -1
    } else {
      this.setColor(x, y - 1, this.turn);
      console.log(`dropPieceInThisColume: setColor(${x}, ${y-1}, ${this.turn})`);
      return { successful: true, position: y - 1 }; // y - 1
    }
  }

  getColor(x, y) {
    return this.positions[this.getIndex(x, y)];
  }

  getPositions() {
    return this.positions;
  }

  // mathematics below for address conversion

  getIndex(x, y) {
    return y * this.columns + x;
  }

  getX(index) {
    return index % this.columns;
  }

  getY(index) {
    return Math.floor(index / this.columns);
  }

  // count how many steps one can take from (x, y) using instruction(dx, dy) and observing the same color
  countMaxSteps(x, y, dx, dy) {
    let color = this.getColor(x, y);
    //console.log(`countMaxSteps, color = ${color}`);
    let steps = 0;

    while (x >= 0 && x < this.columns && y >= 0 && y < this.rows && this.getColor(x, y) === color) {
      x += dx;
      y += dy;
      ++steps;
    }

    return steps - 1;
  }

  // check array this.positions to find any 4 pieces together in a line
  detectGameOver(x, y) {
    console.log(`isGameOver(${x}, ${y})`);
    // check H
    let steps1 = this.countMaxSteps(x, y, -1, 0);
    let steps2 = this.countMaxSteps(x, y, +1, 0);
    //console.log(`Along horizontal direction, steps1=${steps1}, steps2=${steps2}`);
    if (steps1 + steps2 + 1 >= 4) {
      // remember the winning pieces!
      // (x - steps1, y), (x - steps1 + 1, y), ..., (x, y), ..., (x + steps2 - 1, y), (x + steps2, y)
      // this.winningPieces = ...
      for (let delta = -steps1; delta <= steps2; ++delta) {
        this.winningPieces.push(this.getIndex(x + delta, y + 0));
      }
      return true;
    }

    // check V
    steps1 = this.countMaxSteps(x, y, 0, -1);
    steps2 = this.countMaxSteps(x, y, 0, +1);
    if (steps1 + steps2 + 1 >= 4) {
      // remember the winning pieces!
      // (x, y - steps1), (x, y - steps1 + 1), ..., (x, y), ..., (x, y + steps2 - 1), (x, y + steps2)
      for (let delta = -steps1; delta <= steps2; ++delta) {
        this.winningPieces.push(this.getIndex(x + 0, y + delta));
      }
      return true;
    }

    // check DL
    steps1 = this.countMaxSteps(x, y, -1, -1);
    steps2 = this.countMaxSteps(x, y, +1, +1);
    if (steps1 + steps2 + 1 >= 4) {
      // remember the winning pieces!
      // (x - steps1, y - steps1), ..., (x, y), ..., (x + steps2, y + steps2)
      for (let delta = -steps1; delta <= steps2; ++delta) {
        this.winningPieces.push(this.getIndex(x + delta, y + delta));
      }
      return true;
    }

    // check DR
    steps1 = this.countMaxSteps(x, y, +1, -1);
    steps2 = this.countMaxSteps(x, y, -1, +1);
    if (steps1 + steps2 + 1 >= 4) {
      // remember the winning pieces!
      for (let delta = -steps1; delta <= steps2; ++delta) {
        this.winningPieces.push(this.getIndex(x - delta, y + delta));
      }
      return true;
    }

    return false;
  }

  isWinningPiece(index) {
    return this.winningPieces.find(element => element === index) !== undefined;
  }

  // if the game is active, always returns 1
  // if the game is over,
  //    if the piece is the winning piece, return {this.winningStrokeWidth}
  //    otherwise return 1
  getStrokeWidth(index) {
    if (this.isActive) {
      return 1;
    } else if (this.isWinningPiece(index)) {
      return this.winningStrokeWidth;
    } else {
      return 1;
    }
  }

  restart() {
    for (let i = 0; i < this.positions.length; ++i) {
      this.positions[i] = 'white';
    }
    this.winningPieces = [];
  }

  switchTurn() {
    this.turn = this.turn === 'red' ? 'yellow' : 'red';
  }

  setGameOver() {
    this.isActive = false;
  }

  isGameOver() {
    return !this.isActive;
  }
}

let gameFrame = new GameFrame(7, 6);

/////////////////
// GRAPHIC DESIGN
/////////////////

const FRAME_ROWS = 6;
const FRAME_COLUMNS = 7;
const SPACING = 10;

let max_radius_along_x = ((D3x.WIDTH - (FRAME_COLUMNS + 1) * SPACING) / FRAME_COLUMNS) / 2;
let max_radius_along_y = ((D3x.HEIGHT - (FRAME_ROWS + 1) * SPACING) / FRAME_ROWS) / 2;

const RADIUS = Math.min(max_radius_along_x, max_radius_along_y);

const X_MARGIN = (D3x.WIDTH - (RADIUS * 2 * FRAME_COLUMNS + SPACING * (FRAME_COLUMNS - 1))) / 2;
const Y_MARGIN = (D3x.HEIGHT - (RADIUS * 2 * FRAME_ROWS + SPACING * (FRAME_ROWS - 1))) / 2;

/////////////////
// THE GAME FRAME
/////////////////

// x = gameFrame.getX(index)
// y = gameFrame.getY(index)
const ROYAL_BLUE = '#4169e1'

let background = new D3x('rect', {
  x: 0,
  y: 0,
  width: D3x.WIDTH,
  height: D3x.HEIGHT,
  fill: ROYAL_BLUE
});
background.refresh([0]);

let frame = new D3x('circle', {
    fill: d => d,
    stroke: 'orange',
    strokeWidth: (d, i) => gameFrame.getStrokeWidth(i),
    cx: (d, i) => X_MARGIN + (RADIUS * 2 + SPACING) * gameFrame.getX(i) + RADIUS,
    cy: (d, i) => Y_MARGIN + (RADIUS * 2 + SPACING) * gameFrame.getY(i) + RADIUS,
    r: d => RADIUS
  }, {
    click: (d, i) => {
      if (gameFrame.isGameOver()) return;

      //gameFrame.setColorByIndex(i, turn); // fixme
      let result = gameFrame.dropPieceInThisColume(gameFrame.getX(i));
      if (result.successful) {
        if (gameFrame.detectGameOver(gameFrame.getX(i), result.position)) {
          //alert(`The player with color ${turn} won! Game Over!`)
          //console.log(`The player with color ${gameFrame.turn} won! Game Over!`);
          // reset the game frame
/*
          gameFrame.reset();
          // start a new game
          turn = 'red';
*/
          gameFrame.setGameOver();
          message.refresh([ gameFrame.turn.toUpperCase() ]);
        } else {
          gameFrame.switchTurn();
        }
        frame.refresh(gameFrame.getPositions());
        indicators.refresh(indicatorData); 
      } else {
        // invalid drop
      }
    }
  }
);
frame.refresh(gameFrame.getPositions());

let message = new D3x('text', {
  fill: 'black',
  stroke: 'yellow',
  strokeWidth: 2,
  fontSize: 100,
  textAnchor: 'middle', 
  x: D3x.WIDTH/2,
  y: D3x.HEIGHT/2,
  opacity: () => gameFrame.isGameOver() ? 1 : 0
}).text(d => `Player with Color ${d} Won!`);
//message.refresh(['red'.toUpperCase()]);

// TURN INDICATORS: yellow || red

let indicators = new D3x('rect', {
  x: (d, i) => d.x,
  y: (d, i) => d.y,
  width: (d, i) => d.width,
  height: (d, i) => d.height,
  fill: d => d.fill === gameFrame.turn ? d.fill : 'grey'
});

let indicatorData = [
  { width: RADIUS, height: RADIUS, x: 0,                  y: D3x.HEIGHT - RADIUS, fill: 'red' },
  { width: RADIUS, height: RADIUS, x: D3x.WIDTH - RADIUS, y: D3x.HEIGHT - RADIUS, fill: 'yellow' },
];
indicators.refresh(indicatorData);

/*
Settings.configure('Configurations', {
    spacing: {
        label: "Inner Spacing",
        prompt: "spacing between holes",
        value: 10,
        check: /^ *[1-9]\d* *$/,
        parse: v => Number(v)
    }
  },
  settings => {
    console.log(Object.keys(settings).reduce((obj, key) => (obj[key] = settings[key].value, obj), {}));
  }
);
*/
