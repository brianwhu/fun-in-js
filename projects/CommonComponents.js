import { BulletinBoard } from "./common/BulletinBoard.js";
import { FloatingTools } from "./common/FloatingTools.js";
import { D3x } from "../visual/D3x.js";
import { SettingsModal } from "../visual/SettingsModal.js";

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

let data2 = {gameScore: 200, level: 0, lines: 101, totalTime: '1 hour'};
let board2 = new BulletinBoard({
      area: { x: D3x.WIDTH/2, y: 0, width: D3x.WIDTH/2, height: D3x.HEIGHT },
      width: 0.7,
      title: "Lost & Found",
      titleHeight: 0.10,
      titleFontSize: 64,
      gapHeight: 0.05,
      displayHeight: 0.65,
      labelFontSize: 36,
      backgroundColor: "gray",
      valueFontSize: 30,
      valueFontFamily: "courier",
      buttonColor: 'yellow',
      entries: [
          { label: "Score", name: "gameScore", position: 0.3 },
          { label: "Level", name: "level", position: 0.4 },
          { label: "Lines", name: "lines", position: 0.5 },
          { label: "Time spent", name: "totalTime", position: 0.6 },
          { label: "New Game", action: () => (data2.level++, board2.update(data2)), position: 0.8 },
      ]
  });



board.update({gameScore: 200, level: 120, lines: 101, totalTime: '1 hour'});
board2.update(data2);

SettingsModal.configure({
    name: {
        label: "Name",
        prompt: "Please enter your name",
        value: "JavaScript World",
    },
    numbers: {
        label: "Numbers",
        prompt: "A comma-separated list of natural numbers",
        value: "",
        check: /^ *(:?(\d{1,})(?: *, *(\d{1,}))*)? *$/,
        parse: /[^ ,]{1,}/g
    },
    "grade": {
        label: "School Grade",
        prompt: "Your grade in school",
        value: "Fourth",
        options: [
            "Kindergarten",
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth"
        ]
    },
    size: {
        label: "Size",
        prompt: "Playground size",
        value: 50,
        check: /^ *[0-9]\d* *$/,
        parse: v => Number(v)
    }
});

let controls = new FloatingTools([
    { shapes: [ FloatingTools.ICON_PLAY, FloatingTools.ICON_PAUSE ], active: 0, action: (c, i) => { c.active = 1 - i } },
    { shapes: [ FloatingTools.ICON_ADD ], active: 0, action: () => console.log("add") },
    { shapes: [ FloatingTools.ICON_REPLAY ], active: 0, action: (c, i, p) => { console.log("reset"); p[0].active = 0; } }
]);
