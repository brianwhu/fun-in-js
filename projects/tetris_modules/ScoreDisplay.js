import { D3x } from "../../visual/D3x.js";
import { Array2D, Global } from "./Helpers.js";

class ScoreDisplay {
    constructor(xMargin, yMargin, displayWidth) {
        this.xMargin = xMargin;
        this.yMargin = yMargin;
        this.displaySize = displayWidth;

        this.titleBox = new D3x('rect', {
            x: this.xMargin,
            y: this.yMargin,
            width: this.displaySize,
            height: Global.TitleHeight,
            fill: "black",
        });
        this.titleText = new D3x('text', {
            fill: 'yellow',
            stroke: 'none',
            fontFamily: 'Centaur',
            fontSize: Global.TitleFontSize,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            x: this.xMargin + this.displaySize/2,
            y: this.yMargin + Global.TitleHeight/2,
        }).text('Scores');

        this.displayBox = new D3x('rect', {
            x: this.xMargin,
            y: this.yMargin + Global.TitleHeight + Global.TitleDisplayGap,
            width: this.displaySize,
            height: this.displaySize,
            fill: "black",
        });
        this.displayText = new D3x('text', {
            fill: 'yellow',
            stroke: 'none',
            fontFamily: 'Centaur',
            fontSize: Global.DisplayFontSize,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            x: this.xMargin + this.displaySize/2,
            y: d => this.yMargin + Global.TitleHeight + Global.TitleDisplayGap + this.displaySize * d.y,
        }).text(
            d => d.text
        );


        this.score = 0;
    }

    /**
     * Update the game level, the total score, and the lines completed.
     * 
     * @param {Number} level - the new level
     * @param {Number} score - the new score
     * @param {Number} lines - the lines completed
     */
    update(level, score, lines) {
        // update the display array2d

        this.repaint();
    }
    
    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
        this.titleBox.refresh([ 0 ]);
        this.titleText.refresh([ 0 ]);
        this.displayBox.refresh([ 0 ]);
/*
        this.displayScore.refresh([ 0 ]);
        this.displayLevel.refresh([ 0 ]);
        this.displayLines.refresh([ 0 ]);
*/
        this.displayText.refresh([
            { y: Global.DisplayScoreY, text: "Score"},
            { y: Global.DisplayLevelY, text: "Level"},
            { y: Global.DisplayLinesY, text: "Lines"},
        ])
        //this.display.refresh(this.array2d.get());
    }
    
}

export {
    ScoreDisplay
}