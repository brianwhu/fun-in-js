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

  grouped(attributes, handlers) {
    this.group = {
        element: d3.select(this.selector).append("g").attr("class", this.pclass),
        attributes: attributes,
        handlers: handlers
    }
    if (attributes.title) {
        this.group.label = attributes.title;
        this.group.title = this.group.element.append("title");
        delete attributes.title;
    }
    return this;
  }

  _kebab(n) {
    return n.replace(/([a-z])([A-Z])/g, (m, l, u) => [l, u.toLowerCase()].join('-'));
  }

  /**
   * Draw or update the shapes with the data array
   */
  refresh(data) {
    let container;
    if (this.group) {
        if (this.group.attributes) Object.keys(this.group.attributes).forEach(name => this.group.element.attr(this._kebab(name), this.group.attributes[name]));
        if (this.group.handlers) Object.keys(this.group.handlers).forEach(name => this.group.element.on(this._kebab(name), this.group.handlers[name]));
        if (this.group.label) this.group.title.text(this.group.label);
        container = this.group.element;
    } else {
        container = d3.select(this.selector);
    }

    let elements = container.selectAll('.' + this.pclass).data(data).join(enter => enter.append(this.shape)).classed(this.pclass, true);
    Object.keys(this.attributes).forEach(name => elements.attr(this._kebab(name), this.attributes[name]));
    if (this.contents) elements.text(this.contents);
    if (this.handlers) Object.keys(this.handlers).forEach(name => elements.on(this._kebab(name), this.handlers[name]));
  }
}

class D3x extends D3ShapeSeries {
/* Safari does not like these yet
    static WIDTH = 1600;
    static HEIGHT = 900;
    static SVG = "#svg";
*/

    constructor(shape, attributes, handlers) {
        super(D3x.SVG, shape, attributes, handlers);
    }
}

D3x.WIDTH = 1600;
D3x.HEIGHT = 900;
D3x.SVG = "#svg";


export {
    D3ShapeSeries,
    D3x
};
