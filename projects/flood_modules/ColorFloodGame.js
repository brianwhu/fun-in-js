import { D3x } from "../../visual/D3x.js";
import { Array2D } from "../common/Array2D.js"
import { BulletinBoard } from "../common/BulletinBoard.js";
import { Geometry } from "../common/Geometry.js"

class ColorFloodGame {
    /**
     * Constructs a GameSpace with a given display margin and inter-cell spacing.
     * 
     * @param {*} size - number of rows and columns in the game space
     * @param {*} margin - the vertical margin above and below the game space
     * @param {*} padding - the padding between cells
     */
    constructor(size, margin, spacing) {
        this.colors = [
            'red',
            'yellow',
            'orange',
            'green',
            'purple',
            'magenta',
            'blue',
            'cyan'
        ];

        this.rows = size;
        this.columns = size;
        this.array2d = new Array2D(size, size);
        this.spacing = spacing;

        let geometry = new Geometry().computeSizeAndMargin(this.rows, this.columns, margin, spacing);
        this.xMargin = geometry.xMargin;
        this.yMargin = geometry.yMargin;
        this.gridSize = geometry.size;
        this.width = this.gridSize * this.columns + this.spacing * (this.columns - 1);

        this.d3x = new D3x("rect", {
            fill: d => d,
            stroke: "grey",
            width: this.gridSize,
            height: this.gridSize,
            x: (d, i) => this.xMargin + (this.gridSize + this.spacing) * this.array2d.getX(i),
            y: (d, i) => this.yMargin + (this.gridSize + this.spacing) * this.array2d.getY(i),
        }, {
            click: (d, i) => {
                this.flood(d);
                ++this.steps;
                this.repaint();
            }
        });

        this.backgroundColor = "purple";
        this.textColor = "white";

        this.status = new BulletinBoard({
            area: { x: 0, y: 0, width: geometry.xMargin, height: D3x.HEIGHT },
            width: 0.8,
            backgroundColor: this.backgroundColor,
            title: "Color Flood",
            titleHeight: 0.12,
            titleFontSize: 40,
            titleFontColor: this.textColor,
            gapHeight: 0.05,
            displayHeight: 0.68,
            labelFontSize: 32,
            labelFontColor: this.textColor,
            valueFontSize: 32,
            valueFontColor: this.textColor,
            entries: [
                { label: "Steps", name: "steps", position: 0.4 },
            ]
        });

        this.newGameButtonHeight = 110;

        this.newGame = new D3x("rect", {
            fill: this.backgroundColor,
            stroke: "none",
            width: this.status.width,
            height: this.newGameButtonHeight,
            x: this.xMargin + this.width + this.status.xMargin,
            y: this.status.yMargin,
        }, {
            click: d => this.restart()
        });
        this.newGameText = new D3x("text", {
            fill: this.textColor,
            stroke: 'none',
            fontFamily: this.status.defaults.TitleFontFamily,
            fontSize: 40,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            x: this.xMargin + this.width + this.status.xMargin + this.status.width/2,
            y: this.status.yMargin + this.newGameButtonHeight/2,
        }).text("New Game");

        this.steps = 0;
    }

    /**
     * Flood the upper-left corner with the given color.
     * 
     * @param {String} color 
     */
    flood(color) {
        this.array2d.flood(0, 0, color);
        console.log(`Flooding with color ${color}`);
    }
    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
        this.d3x.refresh(this.array2d.get());
        this.status.update(this);
        this.newGame.refresh([ 0 ]);
        this.newGameText.refresh([ 0 ]);
    }

    restart() {
        // initialize this.array2d with random colors
        for (let i = 0; i < this.array2d.get().length; ++i) {
            this.array2d.get()[i] = this.colors[Math.floor(Math.random() * this.colors.length)];
        }

        this.steps = 0;
        this.repaint();
    }
}

export {
    ColorFloodGame
}
