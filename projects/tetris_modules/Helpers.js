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

export {
  Array2D
}