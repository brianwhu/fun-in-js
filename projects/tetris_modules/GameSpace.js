import { D3x } from "../../visual/D3x.js";
import { Array2D, Geometry, Global } from "./Helpers.js"
import { PieceFactory } from "./PieceFactory.js"
import { PieceForcast } from "./PieceForcast.js"
import { ScoreDisplay } from "./ScoreDisplay.js"

class GameSpace {
    /**
     * Constructs a GameSpace with a given display margin and inter-cell spacing.
     * 
     * @param {*} rows - number of rows in the game space
     * @param {*} columns - number of columns in the game space
     * @param {*} margin - the vertical margin above and below the game space
     * @param {*} padding - the padding between cells
     */
    constructor(rows, columns, margin, spacing) {
        this.rows = rows;
        this.columns = columns;
        this.array2d = new Array2D(rows, columns);
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
        });

        this.dialogBox = new D3x("rect", {
            fill: Global.DialogBackground,
            stroke: Global.DialogBorder,
            width: D3x.WIDTH/2,
            height: D3x.HEIGHT/2,
            x: D3x.WIDTH/4,
            y: D3x.HEIGHT/4,
            opacity: d => d ? 1 : 0
        });
        this.dialogText = new D3x("text", {
            fill: Global.DialogMessageTextColor,
            stroke: "none",
            fontFamily: 'Centaur',
            fontSize: d => d.fontSize,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            pointerEvents: 'none',
            x: D3x.WIDTH/2,
            y: d => D3x.HEIGHT*d.y,
            opacity: d => d.gameIsOver ? 1 : 0
        }).text(
            d => d.text
        );
        this.dialogButton = new D3x("circle", {
            fill: Global.DialogButtonColor,
            stroke: "none",
            cursor: "pointer",
            cx: D3x.WIDTH/2,
            cy: D3x.HEIGHT*Global.DialogButtonPosition,
            r: Global.DialogButtonSize,
            opacity: d => d ? 1 : 0
        }, {
            click: () => {
                this.start();
                console.log("restart");
            }
        }
        ).text(
            "Play Again"
        );

        this.forecast = new PieceForcast(
            this.xMargin + this.width,
            this.yMargin,
            this.spacing,
            this.gridSize
        );
        this.factory = new PieceFactory(this.forecast);
        this.scores = new ScoreDisplay(this.forecast.forecastXMargin, this.forecast.forecastYMargin, this.forecast.displayWidth);

        this.pieceX = 0;
        this.pieceY = 0;
        this.piece = null;

        this.score = 0;
        this.completed = 0;

        this.MAX_TICK_TIME = 1000;
        this.level = 1;
        this.ticks = 0;
        this.state = "READY";
    }

    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
        this.d3x.refresh(this.array2d.get());
        this.dialogBox.refresh([ this.state === "READY" || this.state === "OVER" ])
        this.dialogButton.refresh([ this.state === "READY" || this.state === "OVER" ]);
        this.dialogText.refresh([
            {
                gameIsOver: this.state === "READY" || this.state === "OVER",
                text: this.state === "READY" ? "Welcome to Tetris" : "Game Over",
                fontSize: Global.DialogMessageFontSize,
                y: Global.DialogMessagePosition
            },
            {
                gameIsOver: this.state === "READY" || this.state === "OVER",
                text: this.state === "READY" ? "Start" : "Play Again",
                fontSize: Global.DialogButtonFontSize,
                y: Global.DialogButtonPosition
            },
        ]);
    }

    /**
     * Drops a new piece into this GameSpace so that it starts to fall.
     * 
     * Horizontally, the piece starts at the center; Vertically, the piece is first placed at
     * the top.
     * 
     * @param {Piece} piece
     * @return true if succesful, false otherwise
     */
    drop(piece) {
        this.pieceY = 0;
        this.pieceX = Math.ceil((this.columns - piece.size) / 2);
        this.piece = piece;
        if (this._isAllowed(this.piece.getShape(), this.pieceX, this.pieceY)) {
            this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, this.piece.color);
            return true;
        } else {
            this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, this.piece.color);
            return false;
        }
    }

    tick() {
        if (this.state === 'ACTIVE') {
            ++this.ticks;
            if (this.ticks > Global.TicksPerGameLevel) {
                this.ticks = 0;
                ++this.level;
                this.scores.update(this.level, this.score, this.completed);
            }

            this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, undefined);
            if (this._isAllowed(this.piece.getShape(), this.pieceX, this.pieceY + 1)) {
                this.pieceY += 1;
            } else {
                this.updateScoreForPieceDropped();
                // paint the piece back
                this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, this.piece.color);
                // clear filled lines
                this.clearFilledLines();

                // display new score
                this.scores.update(this.level, this.score, this.completed);

                // get a new piece and drop into the game space
                // if this is not possible, the game is over
                if (!this.drop(this.factory.make())) {
                    // game is over
                    this.state = 'OVER';
                    console.log("Game Over");
                }
            }
            this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, this.piece.color);

            this.repaint();
            setTimeout(this.tick.bind(this), this.MAX_TICK_TIME/Math.sqrt(this.level));

            // TODO
            // accumlate the number of ticks
            // if the current level is lower than maximum, increment level accordingly
        }
    }

    control(key) {
        this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, undefined);
        switch(key) {
        case "ArrowLeft":
            if (this._isAllowed(this.piece.getShape(), this.pieceX - 1, this.pieceY)) {
                this.pieceX -= 1;
            }
            break;
        case "ArrowUp":
            // pause?
            break;
        case "ArrowRight":
            if (this._isAllowed(this.piece.getShape(), this.pieceX + 1, this.pieceY)) {
                this.pieceX += 1;
            }
            break;
        case "ArrowDown":
        case " ":
            // drop: set pieceY to maximum value
            while (this._isAllowed(this.piece.getShape(), this.pieceX, this.pieceY + 1)) {
                this.pieceY += 1;
            }
            break;
        case "Clear":
            // test if the rotation is possible
            if (this._isAllowed(this.piece.peekNext(), this.pieceX, this.pieceY)) {
                this.piece.next();
            }
            break;             
        }
        this.array2d.set(this.piece.getShape(), this.pieceX, this.pieceY, this.piece.color);
        this.repaint();
    }

    clearFilledLines() {
        let line = this.rows - 1;
        while (line >= 0) {
            // if this line is filled, clear the line; repeat till the line is not filled
            while (this.isLineFilled(line)) {
                // clear the line
                // 1. move grids in rows from row 0 to (line - 1) down by 1 position
                for (let y = line - 1; y >=0; --y) {
                    for (let x = 0; x < this.columns; ++x) {
                        this.array2d.get()[this.array2d.getIndex(x, y + 1)] = this.array2d.get()[this.array2d.getIndex(x, y)];
                    }
                }
                // 2. set the first row (first 'this.columne' elements) to undefined
                for (let x = 0; x < this.columns; ++x) {
                    this.array2d.get()[this.array2d.getIndex(x, 0)] = undefined;
                }
                ++this.completed;
                this.updateScoreForLineCompleted();
            }
            --line;
        }
    }

    isLineFilled(line) {
        let firstIndex = this.array2d.getIndex(0, line);
        let lastIndex = this.array2d.getIndex(this.columns - 1, line);
        for (let i = firstIndex; i <= lastIndex; ++i) {
            if (this.array2d.get()[i] === undefined) return false;
        }
        return true;
    }

    updateScoreForPieceDropped() {
        this.score += this.level * 10; // how do we award score points?
    }

    updateScoreForLineCompleted() {
        this.score += this.level * 100;
    }

    // state management behaviors

    start() {
        if (this.state === 'READY' || this.state === 'OVER') {
            // start the game play
            // clear the game space
            this.array2d.clear();

            // start timer based on current game level
            this.state = 'ACTIVE';
            this.level = 1; // may be modified by the player
            this.score = 0;
            this.completed = 0;
            this.scores.update(this.level, this.score, this.completed);

            this.drop(this.factory.make());
            setTimeout(this.tick.bind(this), this.MAX_TICK_TIME/Math.sqrt(this.level));
            this.repaint();
        }
    }

    initialize() {
        this.scores.update(1, 0, 0);
        this.repaint();
    }

    pause() {
        if (this.state === 'ACTIVE') {
            this.state = 'PAUSED';
        }
    }

    resume() {
        if (this.state === 'PAUSED') {
            this.state = 'ACTIVE'
        }
    }

    _isAllowed(coords, x, y) {
        return this.array2d.isInBoundary(coords, x, y) && 
        this.array2d.isUndefined(coords, x, y)
    }
}

export {
    GameSpace
}