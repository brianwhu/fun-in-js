import { D3x } from "../visual/D3x.js";
import { Array2D } from "./common/Array2D.js";
import { FloatingTools } from "./common/FloatingTools.js";

class GameOfLife {
    constructor() {
        this.columns = Math.floor(D3x.WIDTH/GameOfLife.GRID_SIZE);
        this.xMargin = (D3x.WIDTH - this.columns * GameOfLife.GRID_SIZE) / 2;
        this.rows = Math.floor(D3x.HEIGHT/GameOfLife.GRID_SIZE);
        this.yMargin = (D3x.HEIGHT - this.rows * GameOfLife.GRID_SIZE) / 2

        this.data = new Array2D(this.rows, this.columns);

        // data represents the "age" of life
        this.data.get().fill(0);

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
                        c.active = 1 - i
                    }
                },
                {   shapes: [ FloatingTools.ICON_ADD ],
                    labels: [ "Add" ],
                    active: 0,
                    action: () => console.log("add")
                },
                {   shapes: [ FloatingTools.ICON_REPLAY ],
                    labels: [ "Reset" ],
                    active: 0,
                    action: (c, i, p) => {
                        console.log("reset");
                        p[0].active = 0;
                    }
                },
            ], {
                enter: () => console.log("enter"),
                leave: () => console.log("leave"),
            }
        );

        this.timer = null;
    }

    randomize() {
        let array = this.data.get();
        for (let i = 0; i < array.length; ++i) {
            array[i] = Math.random() < GameOfLife.RANDOM_LIFE_PERCENT ? 1 : 0;
        }
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
        // go over the world and update each cell
        //console.log("tick");

        let life = new Array(this.data.get().length).fill(0);

        let neighborFinders = [
            { dx: -1, dy: -1 },
            { dx: -1, dy:  0 },
            { dx:  0, dy: -1 },
            { dx: -1, dy: +1 },
            { dx:  0, dy: +1 },
            { dx: +1, dy:  0 },
            { dx: +1, dy: +1 },
            { dx: +1, dy: -1 },
        ];
                   
        for (let i = 0; i < this.data.get().length; ++i) {

            let count = 0

            let x = this.data.getX(i)
            let y = this.data.getY(i)

            for (let j = 0; j < neighborFinders.length; ++j) {
                let neighborX = x + neighborFinders[j].dx;
                let neighborY = y + neighborFinders[j].dy;

                if (neighborX < 0) continue;
                if (neighborX > this.columns - 1) continue;
                if (neighborY < 0) continue;
                if (neighborY > this.rows - 1) continue;

                if (this.data.get()[this.data.getIndex(neighborX, neighborY)] > 0) {
                    ++count
                }
            }
            
            if (this.data.get()[i] > 0) {
                if (count === 2 || count === 3) {
                    life[i] = this.data.get()[i] + 1
                }
            } else {
                if (count === 3) {
                    life[i] = 1
                }
            }
        }

        this.data.setArray(life)

        this.update();
    }

    start() {
        if (this.timer === null) {
            this.timer = setInterval(() => this.evolve(), GameOfLife.TICK_INTERVAL);
        }
    }

    update() {
        this.space.refresh(this.data.get());
    }
}

GameOfLife.GRID_SIZE = 15;
GameOfLife.COLOR = '#3C3B6E';
GameOfLife.TICK_INTERVAL = 700;
GameOfLife.RANDOM_LIFE_PERCENT = 0.20;

///////////////////////

let game = new GameOfLife();

game.randomize();
game.start();
