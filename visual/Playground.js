/**
 * Playground helps manage the page
 */
var Playground = {
    TogglePanel(id) {
        let panel = document.getElementById(id);
        if (panel.classList.contains('d-none')) {
            panel.classList.remove('d-none');
            panel.classList.add('d-block');
        } else {
            panel.classList.remove('d-block');
            panel.classList.add('d-none');
        }
        if (event.srcElement.innerHTML === 'first_page') {
            event.srcElement.innerHTML = 'last_page';
        } else {
            event.srcElement.innerHTML = 'first_page';
        }
    },

    ToggleLibrary(id) {
/*
        let library = document.getElementById(id);
        if (library.classList.contains('d-none')) {
            library.classList.remove('d-none');
            library.classList.add('d-block');
        } else {
            library.classList.remove('d-block');
            library.classList.add('d-none');
        }
        if (event.srcElement.innerHTML === 'first_page') {
            event.srcElement.innerHTML = 'last_page';
        } else {
            event.srcElement.innerHTML = 'first_page';
        }
*/
    },

    useButton(id, label, handler) {
        let button = document.getElementById(id);
        button.innerHTML = label;
        button.removeAttribute("disabled");
        button.addEventListener('click', handler);
    },

    useKeyboard(handler) {
        document.getElementById("drawing").addEventListener('keydown', handler);
    }
}

