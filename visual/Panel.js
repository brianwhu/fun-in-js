class Panel {
    constructor(id) {
        this.world = document.getElementById('world');
        this.panel = document.getElementById(id);
        this.content = document.getElementById(id + '-body');
        this.heading = document.getElementById(id + '-heading');
        this.footer = document.getElementById(id + '-footer');
    }

    clear() {
        while (this.content.children.length) this.content.children.item(0).remove();
        this.heading.innerHTML = "&nbsp;";
        this.panel.classList.remove("d-block");
        this.panel.classList.add("d-none");
    }

    build(heading) {
        this.panel.classList.remove("d-none");
        this.panel.classList.add("d-block");
        this.heading.innerHTML = heading;
    }
}

export {
    Panel
}
