import { D3x } from "../../visual/D3x.js"

class Array2D {
  constructor(rows, columns) {
    this.array = new Array(rows * columns);
    this.rows = rows;
    this.columns = columns;
  }

  // return the Array
  get() {
    return this.array;
  }

  // address conversion between 1-dimensional and 2-dimensional

  getIndex(x, y) {
    return y * this.columns + x;
  }

  getX(index) {
    return index % this.columns;
  }

  getY(index) {
    return Math.floor(index / this.columns);
  }

  getXY(index) {
    return {
      x: index % this.columns,
      y: Math.floor(index / this.columns)
    }
  }
}

class Geometry {
  /**
   * Given a rectangular arrangement of square boxes, maring at the top and the bottom, and spacing between
   * boxes, compute the box sizes and the actual margin.
   * @param {*} rows - the number of rows of boxes
   * @param {*} columns - the number of columns of boxes
   * @param {*} margin - the minimum margin at the top and bottom
   * @param {*} spacing - the spacing between 2 neightboring boxes
   * @returns an object { size, xMargin, yMargin }
   */
  computeSizeAndMargin(rows, columns, margin, spacing) {
    let max_size_along_x = (D3x.WIDTH  - (columns - 1) * spacing - 2 * margin) / columns;
    let max_size_along_y = (D3x.HEIGHT - (rows    - 1) * spacing - 2 * margin) / rows;

    let size = Math.floor(Math.min(max_size_along_x, max_size_along_y));

    return {
      size: size,
      xMargin: (D3x.WIDTH  - (size * columns + spacing * (columns - 1))) / 2,
      yMargin: (D3x.HEIGHT - (size * rows    + spacing * (rows    - 1))) / 2,
    }
  }
}

export {
  Array2D,
  Geometry
}
