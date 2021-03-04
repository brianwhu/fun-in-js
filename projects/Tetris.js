/*
import { D3x } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";
import { SettingsModal } from "../visual/SettingsModal.js";
import * as Backgrounds from "../visual/Backgrounds.js";
*/
import { GameSpace } from "./tetris_modules/GameSpace.js";
import { PieceForcast } from "./tetris_modules/PieceForcast.js";
import { J, L, S, T, Z, I, O } from "./tetris_modules/Pieces.js"

//Playground.SetBackground(Backgrounds.ProtrudingSquares);

const DISPLAY_MARGIN = 30;
const DISPLAY_SPACING = 2;

let gameSpace = new GameSpace(20, 10, DISPLAY_MARGIN, DISPLAY_SPACING);
let forecast = new PieceForcast(
  gameSpace.xMargin + gameSpace.width,
  gameSpace.yMargin,
  DISPLAY_SPACING,
  gameSpace.gridSize
);

// testing code
console.log(gameSpace);

// testing code
gameSpace.repaint();

forecast.update(O);
console.log(forecast);
forecast.repaint();

forecast.update(J);
forecast.repaint();


/*
Playground.UseKeyboard(event => {
  console.log(event.key);
  switch (event.key) {
  case "ArrowLeft":
    console.log('LEFT');
    break;
  case "ArrowUp":
    console.log('PAUSE');
    break;
  case "ArrowRight":
    console.log('RIGHT');
    break;
  case "ArrowDown":
    console.log('DROP');
    break;
  case "Clear":
    console.log('ROTATE');
    break;
  default:
    break;
  }
});
*/