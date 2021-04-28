import { BulletinBoard } from "./common/BulletinBoard.js";
import { D3x } from "../visual/D3x.js";

let board = new BulletinBoard({
        area: { x: 0, y: 0, width: D3x.WIDTH/2, height: D3x.HEIGHT },
        width: 0.5,
        title: "Lost & Found",
        titleHeight: 0.15,
        titleFontSize: 64,
        gapHeight: 0.1,
        displayHeight: 0.65,
        labelFontSize: 35,
        entries: [
            { label: "Score", name: "gameScore", position: 0.3 },
            { label: "Level", name: "level", position: 0.4 },
            { label: "Lines", name: "lines", position: 0.5 },
            { label: "Time spent", name: "totalTime", position: 0.6 }
        ]
    });

let board2 = new BulletinBoard({
      area: { x: D3x.WIDTH/2, y: 0, width: D3x.WIDTH/2, height: D3x.HEIGHT },
      width: 0.7,
      title: "Lost & Found",
      titleHeight: 0.10,
      titleFontSize: 64,
      gapHeight: 0.05,
      displayHeight: 0.65,
      labelFontSize: 48,
      backgroundColor: "gray",
      valueFontSize: 40,
      valueFontFamily: "courier",
      entries: [
          { label: "Score", name: "gameScore", position: 0.3 },
          { label: "Level", name: "level", position: 0.4 },
          { label: "Lines", name: "lines", position: 0.5 },
          { label: "Time spent", name: "totalTime", position: 0.6 }
      ]
  });

board.update({gameScore: 200, level: 120, lines: 101, totalTime: '1 hour'});
board2.update({gameScore: 200, level: 120, lines: 101, totalTime: '1 hour'});
