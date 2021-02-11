/**
 * RegularPolygon helps computing the points of a regular polygon
 */
class RegularPolygon {
  /**
   * @param vertices - number of vertices, which must be an odd number if skipping > 0
   * @param skipping - number of vertices to skip when connecting neighboring vertices, ignored if the number of vertices is even
   */
  constructor(vertices, skipping) {
    if (vertices < 3 || skipping < 0 || skipping >= vertices - 1) {
        throw "*** Illegal arguments to RegularPolygon";
    }
    this.vertices = vertices;
    this.skipping = skipping;
    this.angle = 2*Math.PI/vertices;
  }

  /**
   * Returns the points of this regular polygon
   */
  points(x, y, radius) {
    let p = [];
    for (let i = 0; i < this.vertices; ++i) {
      let k = (i * (this.skipping + 1)) % this.vertices;
      p[i] = `${x + radius * (1 + Math.sin(k * this.angle))},${y + radius * (1 - Math.cos(k * this.angle))}`;
    }
    return p.join(' ');
  }
}

export { RegularPolygon };
