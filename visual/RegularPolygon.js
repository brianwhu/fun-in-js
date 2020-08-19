/**
 * RegularPolygon helps computing the points of a regular polygon
 */
class RegularPolygon {
  /**
   * @param points - number of points, which must be an odd number
   */
  constructor(points, steps) {
    this.points = points;
    this.steps = steps;
    this.angle = 2*Math.PI/points;
  }

  /**
   * Draw or update the shapes with the data array
   */
  polygon(x, y, radius) {
    let p = [];
    for (let i = 0; i < this.points; ++i) {
      let k = (i * this.steps) % this.points;
      p[i] = `${x + radius * (1 + Math.sin(k * this.angle))},${y + radius * (1 - Math.cos(k * this.angle))}`;
    }
    return p.join(' ');
  }
}

export { RegularPolygon };
