import { D3x } from "../../visual/D3x.js";

class FloatingTools {
    /**
     * Usage:
     *  let fc = new FloatingControls([
     *      {
     *        shapes: [ "...", ... ],
     *        labels: [ "Play", ... ],
     *        active: 0,
     *        status: ...,
     *        action: action
     *      },
     *      ...
     *    ], {
     *      enter: function,
     *      leave: function,
     *    }
     *  );
     * @param {Array} controls - an array of {shapes, active, action}, where each shares is an array of paths
     * @param {Object} options - an object providing optional parameters to fine-tune the panel
     *
     */
    constructor(controls, options) {
        let count = controls.length;
        this.size = FloatingTools.HEIGHT * D3x.HEIGHT;
        this.scale = this.size / FloatingTools.ORIGINAL_SIZE;
        this.margin = FloatingTools.MARGIN * (D3x.WIDTH - this.size * count) / (FloatingTools.MARGIN * 2 + FloatingTools.SPACING * (count - 1));
        this.spacing = FloatingTools.SPACING * (D3x.WIDTH - this.size * count) / (FloatingTools.MARGIN * 2 + FloatingTools.SPACING * (count - 1));
        this.y = D3x.HEIGHT * FloatingTools.POSITION;

        this.data = controls.map(control => control.shapes);

        this.opacity = 0;

        this.panel = controls.reduce((array, control, index) => {
            array.push(new D3x("path", {
                d: d => d,
                fill: d => control.status ? FloatingTools.COLORS[control.status] : FloatingTools.COLORS[0],
                opacity: (d, i) => i === control.active ? 1 : 0,
                pointerEvents: (d, i) => i === control.active ? "bounding-box" : "none",
            }, {
                click: (d, i) => {
                    if (control.status !== FloatingTools.STATUS_DISABLED) {
                        control.action(control, i, controls);
                        this.update();
                    }
                }
            }).grouped({
                title: () => control.labels ? control.labels[control.active] : undefined,
                transform: `translate(${this.margin + (this.size + this.spacing) * index} ${this.y - this.size/2}) scale(${this.scale} ${this.scale})`,
                style: "cursor:pointer",
                opacity: () => this.opacity
            }));
            return array;
        }, []);

        let svg = document.querySelector(D3x.SVG);
        svg.addEventListener("mouseover", e => {
            this.opacity = 1;
            this.update();
        });
        svg.addEventListener("mouseout", e => {
            this.opacity = 0;
            this.update();
        });
    }

    update() {
        this.panel.forEach((d, i) => d.refresh(this.data[i]));
    }
}

FloatingTools.COLORS = [
    "#007bff",
    "gray",
    "red"
];

FloatingTools.POSITION = 0.9;
FloatingTools.HEIGHT = 0.1;
FloatingTools.MARGIN = 0.3;
FloatingTools.SPACING = 0.2;

FloatingTools.ORIGINAL_SIZE = 24;

FloatingTools.STATUS_DISABLED = 1;
FloatingTools.STATUS_ESCAPING = 2;

FloatingTools.ICON_PLAY   = "M8 5v14l11-7z";
FloatingTools.ICON_PAUSE  = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
FloatingTools.ICON_REPLAY = "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z";
FloatingTools.ICON_ADD    = "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z";
FloatingTools.ICON_TRASH  = "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z";
FloatingTools.ICON_MENU   = "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z";


export {
    FloatingTools
}
