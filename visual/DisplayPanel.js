import { Panel } from "./Panel.js";

class DisplayPanel extends Panel {
    /**
     * @param header A panel heading
     * @param data A data object
     * @param labels A hash containing data item labels
     *      E.g.
     *          {
     *              "total": "Grand Total",
     *              "age": "Age",
     *          }
     * @param dismiss A optional callback upon panel dismiss
     */
    build(heading, data, labels, dismiss) {
        this.clear();
        super.build(heading);

        let group = document.createElement("ul");
        group.setAttribute("class", "list-group");
        this.content.appendChild(group);

        Object.keys(data).forEach(p => {
            let item = document.createElement("li");
            item.setAttribute("class", "list-group-item");
            group.appendChild(item);

            let label = document.createElement("sub");
            label.setAttribute("class", "text-muted");
            label.innerHTML = labels[p];
            item.appendChild(label);

            let value = document.createElement("h5");
            value.setAttribute("class", "float-right");
            if (data[p]) {
                if (data[p].constructor === Array) {
                    value.innerHTML = data[p].join(', ');
                } else {
                    value.innerHTML = data[p];
                }
            }
            item.appendChild(value);
        });

        if (dismiss) {
            let button = document.createElement("button");
            button.setAttribute("class", "btn btn-secondary btn-block");
            //button.setAttribute("data-toggle", "collapse");
            //button.setAttribute("data-target", "#panel");
            //button.setAttribute("aria-expanded", "true");
            //button.setAttribute("aria-controls", "panel");
            button.appendChild(new Text("Dismiss"));
            button.addEventListener('click', event => {
                dismiss();
                this.clear();
            });
            this.footer.appendChild(button);
        }
    }
}

export {
    DisplayPanel
}
