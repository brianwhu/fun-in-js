import { D3x } from "../../visual/D3x.js";
import { Array2D } from "./Helpers.js";

class PieceForcast {
    constructor(forecastXEdge, forecastYMargin, spacing, gridSize) {
        this.displaySizeInGrid = 6;
        this.titleHeight = 80; // pixels
        this.titleFontSize = 64;
        this.titleDisplayGap = 40;

        let displayWidth = gridSize * this.displaySizeInGrid + spacing * (this.displaySizeInGrid - 1);
        this.forecastXEdge = forecastXEdge;
        this.forecastXMargin = (D3x.WIDTH - forecastXEdge - displayWidth) / 2;
        this.forecastYMargin = forecastYMargin;
        this.spacing = spacing;
        this.gridSize = gridSize;


        this.titleBox = new D3x('rect', {
            x: forecastXEdge + this.forecastXMargin,
            y: forecastYMargin,
            width: displayWidth,
            height: this.titleHeight,
            fill: "black",
        });
        this.titleText = new D3x('text', {
            fill: 'yellow',
            stroke: 'none',
            fontFamily: 'Centaur',
            fontSize: this.titleFontSize,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            x: forecastXEdge + this.forecastXMargin + displayWidth/2,
            y: forecastYMargin + this.titleHeight/2,
          }).text('Next');

        this.array2d = new Array2D(this.displaySizeInGrid, this.displaySizeInGrid);

        let displayX = forecastXEdge + this.forecastXMargin;
        let displayY = forecastYMargin + this.titleHeight + this.titleDisplayGap;
        this.display = new D3x('rect', {
            x: (d, i) => displayX + (this.gridSize + this.spacing) * this.array2d.getX(i),
            y: (d, i) => displayY + (this.gridSize + this.spacing) * this.array2d.getY(i),
            width: this.gridSize,
            height: this.gridSize,
        });
    }

    update() {
        this.titleBox.refresh([ 0 ]);
        this.titleText.refresh([ 0 ]);
        this.display.refresh(this.array2d.get());
    }
}

export {
    PieceForcast
}