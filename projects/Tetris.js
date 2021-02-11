import { D3x } from "../visual/D3x.js";
import { RegularPolygon } from "../visual/RegularPolygon.js";
import { Settings } from "../visual/Settings.js";
import { DisplayPanel } from "../visual/DisplayPanel.js";




let drawing = document.getElementById("drawing");
drawing.addEventListener('keydown', function(event) {
  console.log(event.key);
  switch (event.key) {
  case "ArrowLeft":
    console.log('LEFT');
    break;
  case "ArrowUp":
    console.log('UP');
    break;
  case "ArrowRight":
    console.log('RIGHT');
    break;
  case "ArrowDown":
    console.log('DOWN');
    break;
  default:
    break;
  }
});

