import { D3x } from "../visual/D3x.js"
import { RegularPolygon } from "../visual/RegularPolygon.js";

class StarSpangledBanner {
    /**
     * Produces a StarSpangledBanner with the given height.
     * @param {Number} height in pixels 
     */
    constructor(height) {
        this.A = 1.0;
        this.B = 1.9;
        this.C = this.A * 7 / 13;
        this.D = this.B * 2 / 5;
        this.E = this.F = this.C / 10;
        this.G = this.H = this.D / 12;
        this.L = this.A / 13;
        this.K = this.L * 4 / 5;

        this.WHITE = '#FFFFFF';
        this.OLD_GLORY_RED = '#B22234';
        this.OLD_GLORY_BLUE = '#3C3B6E';

        this.unitSize = height;

        this.height = this.unitSize * this.A;
        this.width = this.unitSize * this.B;

        this.xMargin = (D3x.WIDTH - this.width)/2;
        this.yMargin = (D3x.HEIGHT - this.height)/2;

        this.stripes = new D3x("rect", {
            x: d => this.xMargin,
            y: (d, i) => this.yMargin + i * this.unitSize * this.L,
            width: d => d.width * this.unitSize,
            height: d => d.height * this.unitSize,
            fill: (d, i) => (i % 2) === 0 ? this.OLD_GLORY_RED : this.WHITE,
            stroke: "none",
        });

        this.edgeAndUnion = new D3x("rect", {
            x: () => this.xMargin,
            y: () => this.yMargin,
            width: d => d.width * this.unitSize,
            height: d => d.height * this.unitSize,
            fill: (d, i) => i === 0 ? 'none' : this.OLD_GLORY_BLUE,
            stroke: (d, i) => i === 0 ? 'black' : 'none'
        });


        let star = new RegularPolygon(5, 1);
        let radius = this.K * this.unitSize/2;
        this.stars = new D3x('polygon', {
            fill: this.WHITE,
            stroke: 'none',
            points: d => star.points(
                this.xMargin + d.x * this.unitSize - radius,
                this.yMargin + d.y * this.unitSize - radius,
                radius
            )
        }, {
            click: d => console.log(d)
        });

    }

    paint() {
        this.stripes.refresh(new Array(13).fill({ height: this.L, width: this.B }));
        this.edgeAndUnion.refresh([
            { height: this.A, width: this.B }, // the whole flag
            { height: this.C, width: this.D }, // the union
        ])

        let starCoords = [];
        let havingStar = true;
        for (let row = 1; row <= 9; ++row) {
            for (let col = 1; col <= 11; ++col) {
                if (havingStar) {
                    starCoords.push({
                        x: this.G * col,   // member named 'x'
                        y: this.E * row    // member named 'y'
                    });
                    havingStar = false;   
                } else {
                    havingStar = true;
                }
            }
        }
        this.stars.refresh(starCoords);
    }

}

let banner = new StarSpangledBanner(D3x.HEIGHT * 0.8);
banner.paint();