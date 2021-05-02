/*
import { D3x } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";
import { SettingsModal } from "../visual/SettingsModal.js";
import * as Backgrounds from "../visual/Backgrounds.js";
*/
import { ColorFloodGame } from "./flood_modules/ColorFloodGame.js";

const DISPLAY_MARGIN = 30;
const DISPLAY_SPACING = 2;

let game = new ColorFloodGame(22, DISPLAY_MARGIN, DISPLAY_SPACING);

game.restart();
