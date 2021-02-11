class Knob {
    constructor(id) {
        this.knob = document.getElementById(id);
    }

    enable() {
        this.knob.classList.remove("d-none");
        this.knob.classList.add("d-block");
    }
}

export {
    Knob
}
