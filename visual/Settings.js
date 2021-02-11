import { Panel } from "./Panel.js";
import { Knob } from "./Knob.js";

class Settings {

    /**
     * @param heading A string heading of the settings panel
     * @param args A hash containing expected user input.
     * @param submit A data submission handler.
     *
     *      E.g.
     *      let settings = {
     *          name: {
     *              label: "Name",
     *              prompt: "Please enter your name",
     *              value: "JavaScript World",
     *          },
     *          numbers: {
     *              label: "Numbers",
     *              prompt: "A comma-separated list of natural numbers",
     *              value: "",
     *              check: /^ *(:?(\d{1,})(?: *, *(\d{1,}))*)? *$/,
     *              parse: /[^ ,]{1,}/g
     *          },
     *          "grade": {
     *              label: "School Grade",
     *              prompt: "Your grade in school",
     *              value: "Fourth",
     *              options: [
     *                  "Kindergarten",
     *                  "First",
     *                  "Second",
     *                  "Third",
     *                  "Fourth",
     *                  "Fifth"
     *              ]
     *          },
     *          size: {
     *              label: "Size",
     *              prompt: "Playground size",
     *              value: 50,
     *              check: /^ *[0-9]\d* *$/,
     *              parse: v => Number(v)
     *          }
     *      }
     */
    static configure(heading, args, submit) {
        let settings = new Panel("settings");
        settings.clear();
        settings.build(heading);
        new Knob("settings-knob").enable();

        let form = document.createElement("form");
        form.setAttribute("style", "height:100%");
        form.setAttribute("onsubmit", "return false");
        settings.content.appendChild(form);

        Object.keys(args).forEach(p => {
            let input = null;

            if (args[p].options) {
                input = document.createElement("select");

                let option = document.createElement("option");
                    option.setAttribute("value", "");
                    if (args[p].value === "") option.setAttribute("selected", "selected");
                    option.innerHTML = args[p].prompt;
                input.appendChild(option);

                for (let i = 0; i < args[p].options.length; ++i) {
                    let option = document.createElement("option");
                    option.setAttribute("value", args[p].options[i]);
                    option.innerHTML = args[p].options[i];
                    if (args[p].value === args[p].options[i]) option.setAttribute("selected", "selected");
                    input.appendChild(option);
                }
                input.addEventListener('change', Settings.dataChanged);
            } else {
                input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("placeholder", args[p].prompt);
                input.setAttribute("value", args[p].value);
                input.addEventListener('keyup', Settings.dataChanged);
            }

            let div = document.createElement("div");
            div.setAttribute("class", "form-group");

            let label = document.createElement("small");
            label.setAttribute("class", "form-text text-primary");
            label.innerHTML = args[p].label;
            div.appendChild(label);


            input.setAttribute("id", p);
            input.setAttribute("class", "form-control");
            div.appendChild(input);

            let message = document.createElement("small");
            message.setAttribute("class", "form-text text-danger");
            message.innerHTML = "&nbsp;";
            div.appendChild(message);

            input.addEventListener('focus', event => message.innerHTML = "&nbsp;");
            form.appendChild(div);
        });

        if (submit) {
            let button = document.getElementById('settings-apply');
            button.addEventListener('click', event => {
                let messages = form.getElementsByClassName('text-danger');
                //let data = {};
                for (let i = 0; i < form.elements.length; ++i) {
                    let p = form.elements[i].id;
                    if (args[p].check) {
                        if (args[p].check.exec(form.elements[i].value)) {
                            if (args[p].parse) {
                                if (args[p].parse.constructor === RegExp) {
                                    args[p].value = form.elements[i].value.match(args[p].parse);
                                } else if (args[p].parse.constructor === Function) {
                                    args[p].value = args[p].parse(form.elements[i].value);
                                } else {
                                    throw `ERROR: Invalid parser '${args[p].parse}'`;
                                }
                            } else {
                                args[p].value = form.elements[i].value;
                            }
                        } else {
                            messages[i].innerHTML = "This doesn't look right";
                            return;
                        }
                    } else {
                        args[p].value = form.elements[i].value;
                    }
                }
                button.setAttribute("disabled", "disabled");
                submit(args);
            });
        }
    }

    static dataChanged() {
        document.getElementById('settings-apply').removeAttribute("disabled");
    }
}

export {
    Settings
}
