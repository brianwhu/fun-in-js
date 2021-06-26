import { D3x } from "../visual/D3x.js";
import { SettingsModal } from "../visual/SettingsModal.js";
import { Array2D } from "./common/Array2D.js";
import { FloatingTools } from "./common/FloatingTools.js";

class GameOfLife {
    constructor() {
        this.resize();



        // data represents the "age" of life
        this.bmask = GameOfLife.BIRTH.reduce((mask, lives) => mask |= 1 << (lives - 1), 0);
        this.smask = GameOfLife.SURVIVAL.reduce((mask, lives) => mask |= 1 << (lives - 1), 0);
        this.neighborFinders = [
            { dx: -1, dy: -1 },
            { dx: -1, dy:  0 },
            { dx:  0, dy: -1 },
            { dx: -1, dy: +1 },
            { dx:  0, dy: +1 },
            { dx: +1, dy:  0 },
            { dx: +1, dy: +1 },
            { dx: +1, dy: -1 },
        ];

        SettingsModal.configure({
            gridSize: {
                label: "Cell Size",
                value: 15,
                options: [
                    10,
                    15,
                    20
                ]
            },
        }, values => {
            this.pause();
            GameOfLife.GRID_SIZE = values.gridSize.value
            this.resize();
        });

        //console.log(`bmake = ${this.bmask.toString(16)}, smask = ${this.smask.toString(16)}`);

        this.space = new D3x("rect", {
            x: (d, i) => this.xMargin + this.data.getX(i) * GameOfLife.GRID_SIZE,
            y: (d, i) => this.yMargin + this.data.getY(i) * GameOfLife.GRID_SIZE,
            width: GameOfLife.GRID_SIZE,
            height: GameOfLife.GRID_SIZE,
            fill: d => GameOfLife.COLOR,
            opacity: d => d/5,
            stroke: "none",
            pointerEvents: "none"
        })

        this.space.refresh(this.data.get());
        this.tools = new FloatingTools([
                {   shapes: [ FloatingTools.ICON_PLAY, FloatingTools.ICON_PAUSE ],
                    labels: [ "Play", "Pause" ],
                    active: 0,
                    action: (c, i) => {
                        if (i === 0) {
                            this.start();
                        } else {
                            this.pause();
                        }
                        c.active = 1 - i
                    }
                },
                {   shapes: [ FloatingTools.ICON_ADD ],
                    labels: [ "Add" ],
                    active: 0,
                    action: () => console.log("add")
                },
                {   shapes: [ FloatingTools.ICON_TRASH ],
                    labels: [ "Clear" ],
                    active: 0,
                    action: (c, i, p) => {
                        this.pause();
                        p[0].active = 0;
                        p[0].status = FloatingTools.STATUS_DISABLED;
                        this.clear();
                    }
                },
                {   shapes: [ FloatingTools.ICON_REPLAY ],
                    labels: [ "Reset" ],
                    active: 0,
                    action: (c, i, p) => {
                        this.pause();
                        p[0].active = 0;
                        delete p[0].status;
                        this.randomize();
                    }
                },
            ], {
                enter: () => console.log("enter"),
                leave: () => console.log("leave"),
            }
        );

        this.timer = null;
    }


    /**
     * The world evolves into the next generation, following Conway's rule.
     * <ol>
     * <li>Any live cell with two or three live neighbours survives. (++age) </li>
     * <li>Any dead cell with three live neighbours becomes a live cell. (age = 1) </li>
     * <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead. (age = 0) </li>
     * </ol>
     */
    evolve() {
        for (let i = 0; i < this.data.get().length; ++i) {

            let count = 0

            let x = this.data.getX(i)
            let y = this.data.getY(i)

            for (let j = 0; j < this.neighborFinders.length; ++j) {
                let neighborX = x + this.neighborFinders[j].dx;
                let neighborY = y + this.neighborFinders[j].dy;

                if (neighborX < 0) {
                    if (GameOfLife.WRAPAROUND) {
                        neighborX = this.columns - 1;
                    } else {
                        continue;
                    }
                }
                if (neighborX > this.columns - 1) {
                    if (GameOfLife.WRAPAROUND) {
                        neighborX = 0;
                    } else {
                        continue;
                    }
                }
                if (neighborY < 0) {
                    if (GameOfLife.WRAPAROUND) {
                        neighborY = this.rows - 1;
                    } else {
                        continue;
                    }
                }
                if (neighborY > this.rows - 1) {
                    if (GameOfLife.WRAPAROUND) {
                        neighborY = 0;
                    } else {
                        continue;
                    }
                }

                if (this.data.get()[this.data.getIndex(neighborX, neighborY)] > 0) {
                    ++count
                }
            }
            
            if (this.data.get()[i] > 0) {
                if (this.smask & (1 << (count-1))) {
                    this.life[i] = this.data.get()[i] + 1
                } else {
                    this.life[i] = 0;
                }
            } else {
                if (this.bmask & (1 << (count-1))) {
                    this.life[i] = 1
                } else {
                    this.life[i] = 0;
                }
            }
        }

        this.life = this.data.setArray(this.life)
        this.update();
    }

    randomize() {
        let array = this.data.get();
        for (let i = 0; i < array.length; ++i) {
            array[i] = Math.random() < GameOfLife.RANDOM_LIFE_PERCENT ? 1 : 0;
        }
        this.update();
    }

    clear() {
        this.data.get().fill(0);
        this.update();
    }

    start() {
        if (this.timer === null) {
            this.timer = setInterval(() => this.evolve(), GameOfLife.TICK_INTERVAL);
        }
    }

    pause() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }        
    }

    resize() {
        this.columns = Math.floor(D3x.WIDTH/GameOfLife.GRID_SIZE);
        this.xMargin = (D3x.WIDTH - this.columns * GameOfLife.GRID_SIZE) / 2;
        this.rows = Math.floor(D3x.HEIGHT/GameOfLife.GRID_SIZE);
        this.yMargin = (D3x.HEIGHT - this.rows * GameOfLife.GRID_SIZE) / 2

        this.data = new Array2D(this.rows, this.columns);
        this.data.get().fill(0);
        this.life = new Array(this.data.get().length).fill(0);
    }

    update() {
        this.space.refresh(this.data.get());
    }
}

GameOfLife.GRID_SIZE = 25;
GameOfLife.COLOR = '#3C3B6E';
GameOfLife.TICK_INTERVAL = 400;
GameOfLife.RANDOM_LIFE_PERCENT = 0.15;
GameOfLife.WRAPAROUND = true;

GameOfLife.BIRTH = [ 3 ];
GameOfLife.SURVIVAL = [ 2, 3 ];

///////////////////////

let game = new GameOfLife();

game.randomize();
