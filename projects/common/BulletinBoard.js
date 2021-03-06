import { D3x } from "../../visual/D3x.js";

class BulletinBoard {
    /**
     * The board should be displayed at the center of a given area 
     * 
     * @param {Object} customization - an object providing the following customization info
     *  title,
     *  area: { x, y, width, height}
     *  width,
     *  titleHeight,
     *  gapHeight,
     *  displayHeight,
     *  entries: [ { label, name, position }, ... ]
     * 
     * For example:
     * 
     *  let board = new BulletinBoard({
     *      area: { x: 20, y: 100, width: 500, height: 800 },
     *      width: 0.9,
     *      title: "Scores",
     *      titleHeight: 0.2,
     *      titleFontSize: 64,
     *      gapHeight: 0.1,
     *      displayHeight: 0.6,
     *      labelFontSize: 48,
     *      labelFontColor: "white",
     *      valueFontSize: 48,
     *      labelFontColor: "green",
     *      entries: [
     *          { label: "Score", name: "gameScore", position: 0.3 },
     *          { label: "Level", name: "level", position: 0.4 },
     *          { label: "Lines", name: "lines", position: 0.5 },
     *          { label: "Time spent", name: "totalTime", position: 0.6 }
     *          { label: "Pause", action: () => console.log("pause"), position: 0.8 },
     *      ]
     *  });
     */
    constructor(customization) {
        this.defaults = {
            LabelValueSpacing: 15,
            BackgroundColor: 'lightgray',
            TitleFontFamily: 'Centaur',
            TitleFontColor: 'black',
            TitleFontSize: 64,
            LabelFontFamily: 'Centaur',
            LabelFontColor: 'black',
            LabelFontSize: 48,
            ValueFontFamily: 'Centaur',
            ValueFontColor: 'black',
            ValueFontSize: 48,
            ButtonColor: 'gray',
            ButtonWidth: 0.6,
            ButtonHeight: 0.09,
        };

        this.customization = customization;
        this.entryMap = {};
/*
        this.customization.entries.reduce((map, entry) => {
            if (entry.name) {
                entry.value = "";
                map[entry.name] = entry;
            }
            return map;
        }, this.entryMap);
*/
        let height = customization.titleHeight + customization.gapHeight + customization.displayHeight;

        this.xMargin = (1 - customization.width) * customization.area.width / 2;
        this.yMargin = (1 - height) * customization.area.height / 2;
        this.width = customization.width * customization.area.width;
        this.height = height * customization.area.height;

        this.boxes = new D3x('rect', {
            x: d => this.customization.area.x + d.x,
            y: d => this.customization.area.y + d.y,
            width: d => d.width,
            height: d => d.height,
            fill: d => d.fill,
            cursor: d => d.cursor
        }, {
            click: d => d.action ? d.action(d) : null
        });

        this.texts = new D3x('text', {
            fill: d => d.fill,
            stroke: 'none',
            fontFamily: d => d.fontFamily,
            fontSize: d => d.fontSize,
            textAnchor: d => d.textAnchor,
            dominantBaseline: 'middle',
            x: d => this.customization.area.x + d.x,
            y: d => this.customization.area.y + d.y,
            pointerEvents: 'none',
        }).text(d => d.text);

        let displayY = this.yMargin + (this.customization.titleHeight + this.customization.gapHeight) * this.customization.area.height;
        let displayH = this.customization.displayHeight * this.customization.area.height;

        this.data = {
            boxes: [
                {   // title
                    x: this.xMargin,
                    y: this.yMargin,
                    width: this.width,
                    height: this.customization.titleHeight * this.customization.area.height,
                    fill: this.customization.backgroundColor || this.defaults.BackgroundColor
                },
                {   // display
                    x: this.xMargin,
                    y: displayY,
                    width: this.width,
                    height: this.customization.displayHeight * this.customization.area.height,
                    fill: this.customization.backgroundColor || this.defaults.BackgroundColor
                }
            ],

            texts: [
                {   // title
                    fill: this.customization.titleFontColor || this.defaults.TitleFontColor,
                    stroke: 'none',
                    fontFamily: this.customization.titleFontFamily || this.defaults.TitleFontFamily,
                    fontSize: this.customization.titleFontSize,
                    textAnchor: 'middle',
                    x: this.xMargin + this.width/2,
                    y: this.yMargin + this.customization.titleHeight * this.customization.area.height/2,
                    text: this.customization.title
                }
            ]
        };
        this.customization.entries.reduce((data, entry) => {
            data.texts.push({
                fill: this.customization.labelFontColor || this.defaults.LabelFontColor,
                stroke: 'none',
                fontFamily: this.customization.labelFontFamily || this.defaults.LabelFontFamily,
                fontSize: this.customization.labelFontSize || this.defaults.LabelFontSize,
                textAnchor: entry.name ? 'end' : 'middle',
                x: entry.name ? this.xMargin + this.width/2 - this.defaults.LabelValueSpacing : this.xMargin + this.width/2,
                y: displayY + entry.position * displayH,
                text: entry.label,
            });
            if (entry.name) {
                this.entryMap[entry.name] = {
                    fill: this.customization.valueFontColor || this.defaults.ValueFontColor,
                    stroke: 'none',
                    fontFamily: this.customization.valueFontFamily || this.defaults.ValueFontFamily,
                    fontSize: this.customization.valueFontSize || this.defaults.ValueFontSize,
                    textAnchor: 'begin',
                    x: this.xMargin + this.width/2 + this.defaults.LabelValueSpacing,
                    y: displayY + entry.position * displayH,
                    text: entry.value,
                }
                data.texts.push(this.entryMap[entry.name]);
            } else {
                data.boxes.push({ // button
                    x: this.xMargin + this.width * (1 - this.defaults.ButtonWidth)/2,
                    y: displayY + entry.position * displayH - this.height * this.defaults.ButtonHeight/2,
                    width: this.width * this.defaults.ButtonWidth,
                    height: this.customization.displayHeight * this.customization.area.height * this.defaults.ButtonHeight,
                    fill: this.customization.buttonColor || this.defaults.ButtonColor,
                    cursor: 'pointer',
                    action: entry.action
                });
            }
            return data;
        }, this.data);
    }

    /**
     * Update the display.
     * 
     * @param {Object} value - the values to display, which must match the entries in the customization.
     *  {
     *      name1: "Value",
     *      name2: 200,
     *      name3: 300
     *  }
     */
    update(value) {
        // update the display array2d
        Object.keys(value).forEach(property => {
            if (this.entryMap[property] !== undefined) {
                this.entryMap[property].text = value[property];
            }
        });

        this.repaint();
    }
    
    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
/*
        let displayY = this.yMargin + (this.customization.titleHeight + this.customization.gapHeight) * this.customization.area.height;
        let displayH = this.customization.displayHeight * this.customization.area.height;

        let data = {
            boxes: [
                {   // title
                    x: this.xMargin,
                    y: this.yMargin,
                    width: this.width,
                    height: this.customization.titleHeight * this.customization.area.height,
                    fill: this.customization.backgroundColor || this.defaults.BackgroundColor
                },
                {   // display
                    x: this.xMargin,
                    y: displayY,
                    width: this.width,
                    height: this.customization.displayHeight * this.customization.area.height,
                    fill: this.customization.backgroundColor || this.defaults.BackgroundColor
                }
            ],

            texts: [
                {   // title
                    fill: this.customization.titleFontColor || this.defaults.TitleFontColor,
                    stroke: 'none',
                    fontFamily: this.customization.titleFontFamily || this.defaults.TitleFontFamily,
                    fontSize: this.customization.titleFontSize,
                    textAnchor: 'middle',
                    dominantBaseline: 'central',
                    x: this.xMargin + this.width/2,
                    y: this.yMargin + this.customization.titleHeight * this.customization.area.height/2,
                    text: this.customization.title
                }
            ]
        };
        this.customization.entries.reduce((data, entry) => {
            if (entry.name) {
                data.texts.push({
                    fill: this.customization.valueFontColor || this.defaults.ValueFontColor,
                    stroke: 'none',
                    fontFamily: this.customization.valueFontFamily || this.defaults.ValueFontFamily,
                    fontSize: this.customization.valueFontSize || this.defaults.ValueFontSize,
                    textAnchor: 'begin',
                    dominantBaseline: 'central',
                    x: this.xMargin + this.width/2 + this.defaults.LabelValueSpacing,
                    y: displayY + entry.position * displayH,
                    text: entry.value,
                });
            return data;
        }, data);
*/
        this.boxes.refresh(this.data.boxes);
        this.texts.refresh(this.data.texts);
    }
}

export {
    BulletinBoard
}
