class DrawingBoard {
    constructor(plane) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.bounds = this.canvas.getBoundingClientRect();
        this.plane = plane;
    }

    save() {
        this.context.save();
        this.context.clearRect(0, 0, DrawingBoard.WIDTH, DrawingBoard.HEIGHT);
        this.plane.reset(this);
    }

    restore() {
        this.context.restore();
    }

    contains(point) {
        return point.x < DrawingBoard.WIDTH && point.x > -1 && point.y < DrawingBoard.HEIGHT && point.y > -1;
    }

    /**
     * Draw a dot, where each point has properties
     *      x: x-coordinate
     *      y: y-coordinate
     *      c: color
     */
    dot(point, radius, arc0, arc1) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, arc0 ?? 0, arc1 ?? 2 * Math.PI);
        if (radius >= 8) {
            var gradient = this.context.createRadialGradient(point.x + radius/4, point.y - radius/8, radius/4, point.x, point.y, radius);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, point.c);
            this.context.fillStyle = gradient;
        } else {
            this.context.fillStyle = point.c;
        }
        this.context.fill();
    }

    /**
     * Draw a circle, where the center has properties
     *      x: x-coordinate
     *      y: y-coordinate
     *      c: stroke color
     *      s: stroke width
     *      d: dash pattern
     *      f: fill color
     */
    circle(point, radius, arc0, arc1) {
    this.context.save()
        this.context.setLineDash(point.d ?? [])
        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, arc0 ?? 0, arc1 ?? 2 * Math.PI);
        this.context.lineWidth = point.s ?? 1
        this.context.strokeStyle = point.c;
        this.context.stroke();
        if (point.f) {
            this.context.fillStyle = point.f
            this.context.fill();
        }
    this.context.restore()
    }

    /**
     * Draw an ellipse, where the center has properties
     *      x: x-coordinate
     *      y: y-coordinate
     *      c: stroke color
     *      s: stroke width
     *      d: dash pattern
     *      f: fill color
     */
    ellipse(point, radiusX, radiusY, rotation, arc0, arc1) {
    this.context.save()
        this.context.setLineDash(point.d ?? [])
        this.context.beginPath();
        this.context.ellipse(point.x, point.y, radiusX, radiusY, -rotation, arc0 ?? 0, arc1 ?? 2 * Math.PI);
        this.context.lineWidth = point.s ?? 1
        this.context.strokeStyle = point.c;
        this.context.stroke();
        if (point.f) {
            this.context.fillStyle = point.f
            this.context.fill();
        }
    this.context.restore()
    }

    /**
     * Connect 2 dots pi and pj, where each point has properties
     *      x: x-coordinate
     *      y: y-coordinate
     *      c: color
     */
    edge(pi, pj, width) {
        this.context.beginPath();
        let gradient = this.context.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
        gradient.addColorStop(0, pi.c);
        gradient.addColorStop(1, pj.c);
        this.context.strokeStyle = gradient;
        this.context.lineWidth = width;
        this.context.moveTo(pi.x, pi.y);
        this.context.lineTo(pj.x, pj.y);
        this.context.stroke();
    }

    text(point, text) {
        this.context.textBaseline = 'middle';
        this.context.fillText(text, point.x + 8, point.y);
    }

    line(pi, pj, width, color) {
    this.context.save()
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(pi.x, pi.y);
        this.context.lineTo(pj.x, pj.y);
        this.context.stroke();
    this.context.restore()
    }

    horizontal(x1, x2, y, width, color) {
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(x1, y);
        this.context.lineTo(x2, y);
        this.context.stroke();
    }

    vertical(x, y1, y2, width, color) {
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(x, y1);
        this.context.lineTo(x, y2);
        this.context.stroke();
    }

    randomColor() {
        return '#' + ('000000' + Math.round(Math.random() * 256 * 256 * 256).toString(16)).substr(-6);
    }
}

DrawingBoard.WIDTH = 1600;
DrawingBoard.HEIGHT = 900;

export default DrawingBoard;

