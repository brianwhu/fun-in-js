/*
import { D3x } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";
import { SettingsModal } from "../visual/SettingsModal.js";
import * as Backgrounds from "../visual/Backgrounds.js";
*/
import { GameSpace } from "./tetris_modules/GameSpace.js";
import { PieceForcast } from "./tetris_modules/PieceForcast.js";
import { PieceFactory } from "./tetris_modules/PieceFactory.js"
import { J, L, S, T, Z, I, O } from "./tetris_modules/Pieces.js"

//Playground.SetBackground(Backgrounds.ProtrudingSquares);

const DISPLAY_MARGIN = 30;
const DISPLAY_SPACING = 2;

let gameSpace = new GameSpace(20, 10, DISPLAY_MARGIN, DISPLAY_SPACING);
/*let forecast = new PieceForcast(
  gameSpace.xMargin + gameSpace.width,
  gameSpace.yMargin,
  DISPLAY_SPACING,
  gameSpace.gridSize
);*/
//let factory = new PieceFactory(forecast);

// testing code
//console.log(gameSpace);

//gameSpace.drop(factory.make());

// testing code
//gameSpace.repaint();

//forecast.update(O);
//console.log(forecast);
//forecast.repaint();

//forecast.update(J);
//forecast.repaint();






Playground.UseKeyboard(event => {
  //console.log(event.key);
  switch (event.key) {
  case "ArrowLeft":
  case "ArrowUp":
  case "ArrowRight":
  case "ArrowDown":
  case "Clear":
    gameSpace.control(event.key);
    break;
  default:
    break;
  }
});


gameSpace.initialize();
