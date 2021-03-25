import { D3x } from "../../visual/D3x.js"

/**
 * Array2D is an array that also represents a 2-dimentional area.
 */
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

  /**
   * Returns the index into the array from the 2D coordinates.
   * 
   * @param {number} x - the x coordinate
   * @param {number} y - the y coordinate
   * @returns the index into the underneath array
   */
  getIndex(x, y) {
    return y * this.columns + x;
  }

  /**
   * Returns the x coordinate of the element at the given index.
   * 
   * @param {number} index 
   */
  getX(index) {
    return index % this.columns;
  }

  /**
   * Returns the y coordinate of the element at the given index.
   * 
   * @param {number} index
   */
  getY(index) {
    return Math.floor(index / this.columns);
  }

  /**
   * Returns the coordinates of the element at the given index as an object {x, y}.
   * 
   * @param {number} index 
   */
  getXY(index) {
    return {
      x: index % this.columns,
      y: Math.floor(index / this.columns)
    }
  }

  /**
   * Sets some array elements to a value using the given array of coordinates
   * 
   * Assign a given value to some specific array eleements
   * 
   *  array[?] = value
   *
   * @param {Array} coords - an array of coordinates {x, y}
   * @param {number} xTranslate - the distance to translate the points in x direction
   * @param {number} yTranslate - the distance to translate the points in y direction
   * @param {*} value - the value to set the array elements to
   */
  set(coords, xTranslate, yTranslate, value) {
    for (let i = 0; i < coords.length; ++i) {
      // place the ith grid in coords on the array
      // coords[i]: {x, y}
      let xInTheBiggerArray = xTranslate + coords[i].x;
      let yInTheBiggerArray = yTranslate + coords[i].y;
      let indexIntoArray = this.getIndex(xInTheBiggerArray, yInTheBiggerArray);
      this.array[indexIntoArray] = value;
    }
  }

  /**
   * Check if all elements at the given array of coordinates are undefined
   * 
   * @param {Array} coords - an array of coordinates {x, y}
   * @param {number} xTranslate - the distance to translate the points in x direction
   * @param {number} yTranslate - the distance to translate the points in y direction
   * @return true if array elements at all coordinates are undefined; false otherwise
   */
  isUndefined(coords, xTranslate, yTranslate) {
    for (let i = 0; i < coords.length; ++i) {
      // place the ith grid in coords on the array
      // coords[i]: {x, y}
      let xInTheBiggerArray = xTranslate + coords[i].x;
      let yInTheBiggerArray = yTranslate + coords[i].y;
      let indexIntoArray = this.getIndex(xInTheBiggerArray, yInTheBiggerArray);
      if (this.array[indexIntoArray] !== undefined) return false; 
    }
    return true;
  }

  /**
   * Check if all coordinates are within the rectangular boundary
   * 
   * @param {Array} coords - an array of coordinates {x, y}
   * @param {number} xTranslate - the distance to translate the points in x direction
   * @param {number} yTranslate - the distance to translate the points in y direction
   * @return true if array elements at all coordinates are undefined; false otherwise
   */  
  isInBoundary(coords, xTranslate, yTranslate) {
    for (let i = 0; i < coords.length; ++i) {
      // place the ith grid in coords on the array
      // coords[i]: {x, y}
      let xInTheBiggerArray = xTranslate + coords[i].x;
      let yInTheBiggerArray = yTranslate + coords[i].y;
      if (xInTheBiggerArray < 0) return false;
      if (xInTheBiggerArray > this.columns - 1) return false;
      if (yInTheBiggerArray < 0) return false;
      if (yInTheBiggerArray > this.rows - 1) return false;
    }
    return true;
  }


  /**
   * Logs the 2D shape to the console.
   * 
   * For development and unit test only.
   * 
   * @param {Function} translator - a function, (d, i, a) => Strintg, that translates each array
   * element into a String for display
   */
  log(translator) {
    for (let r = 0; r < this.rows; ++r) {
      let line = "";
      for (let c = 0; c < this.columns; ++c) {
        let index = this.getIndex(c, r);
        line += translator(this.array[index], index, this.array);
      }
      console.log(line);
    }
  }
}

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
  Array2D,
  Geometry
}
