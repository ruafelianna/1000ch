let vars = {};

function ready() {
    vars.inputList = document.querySelectorAll(".input");
    vars.html = document.querySelector("html");

    check_all();

    vars.inputList.forEach(elem => elem.addEventListener("input", function () {
        check(this);
    }));

    vars.html.addEventListener("click", click);
}

function clear_all() {
    vars.inputList.forEach(elem => clear(elem));
}

function show_all() {
    vars.inputList.forEach(elem => show(elem));
}

function check_all() {
    vars.inputList.forEach(elem => check(elem));
}

function clear(elem) {
    elem.textContent = "";
    check(elem);
}

function show(elem) {
    elem.textContent = elem.dataset.answer;
    check(elem);
}

function check(elem) {
    if (elem.textContent === elem.dataset.answer) {
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    }
    else {
        elem.classList.remove("valid");
        elem.classList.add("invalid");
    }
}

function click(event) {
    elem = event.target;
    switch (elem.dataset.action) {
        case "show-all":
            show_all();
            break;
        case "clear-all":
            clear_all();
            break;
        case "show":
            show(elem.parentElement.querySelector(".input"));
            break;
        case "clear":
            clear(elem.parentElement.querySelector(".input"));
            break;
        default:
            break;
    }
}

if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
