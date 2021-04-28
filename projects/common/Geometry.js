import { D3x } from "../../visual/D3x.js"

class Geometry {
  /**
   * Given a rectangular arrangement of square boxes, maring at the top and the bottom, and spacing between
   * boxes, compute the box sizes and the actual margin.
   * @param {number} rows - the number of rows of boxes
   * @param {number} columns - the number of columns of boxes
   * @param {number} margin - the minimum margin at the top and bottom
   * @param {number} spacing - the spacing between 2 neightboring boxes
   * @returns an object { size, xMargin, yMargin }
   */
  computeSizeAndMargin(rows, columns, margin, spacing) {
    let max_size_along_x = (D3x.WIDTH - (columns - 1) * spacing - 2 * margin) / columns;
    let max_size_along_y = (D3x.HEIGHT - (rows - 1) * spacing - 2 * margin) / rows;

    let size = Math.floor(Math.min(max_size_along_x, max_size_along_y));

    return {
      size: size,
      xMargin: (D3x.WIDTH - (size * columns + spacing * (columns - 1))) / 2,
      yMargin: (D3x.HEIGHT - (size * rows + spacing * (rows - 1))) / 2,
    }
  }
}

export {
  Geometry,
}
