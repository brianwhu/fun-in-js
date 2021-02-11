/**
 * D3ShapeSeries manages a series of homogenious shapes controlled by a single data array.
 */
class D3ShapeSeries {
  /**
   * @param selector - String, SVG element selector
   * @param shape - String, SVG shape name
   * @param attributes - Object, hash of shape attributes, in the form of { 'name': 'value' } or { 'name': (d, i) => mapping }
   * @param handlers - Object, hash of event handlers
   */
  constructor(selector, shape, attributes, handlers) {
    this.selector = selector;
    this.shape = shape;
    this.attributes = attributes;
    this.handlers = handlers;
    this.pclass = shape + Math.round(Math.random() * 1000000);
  }

  text(contents) {
    this.contents = contents;
    return this;
  }

  _kebab(n) {
    return n.replace(/([a-z])([A-Z])/g, (m, l, u) => [l, u.toLowerCase()].join('-'));
  }

  /**
   * Draw or update the shapes with the data array
   */
  refresh(data) {
    let elements = d3.select(this.selector).selectAll('.' + this.pclass).data(data).join(enter => enter.append(this.shape)).classed(this.pclass, true);
    Object.keys(this.attributes).forEach(name => elements.attr(this._kebab(name), this.attributes[name]));
    if (this.contents) elements.text(this.contents);
    if (this.handlers) Object.keys(this.handlers).forEach(name => elements.on(this._kebab(name), this.handlers[name]));
  }
}

class D3x extends D3ShapeSeries {
    static WIDTH = 1600;
    static HEIGHT = 900;
    static SVG = "#svg";

    constructor(shape, attributes, handlers) {
        super(D3x.SVG, shape, attributes, handlers);
    }
}

export {
    D3ShapeSeries,
    D3x
};
