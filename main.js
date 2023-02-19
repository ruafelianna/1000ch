let vars = {};

function ready() {
    vars.inputList = document.querySelectorAll(".input");
    vars.html = document.querySelector("html");

    vars.inputList.forEach(elem => check(elem));

    vars.html.addEventListener("click", clickHandler);
    vars.html.addEventListener("input", inputHandler);
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

function clickHandler(event) {
    elem = event.target;
    switch (elem.dataset.action) {
        case "show-all":
            vars.inputList.forEach(elem => show(elem));
            break;
        case "clear-all":
            vars.inputList.forEach(elem => clear(elem));
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

function inputHandler(event) {
    elem = event.target;
    if (elem.classList.contains("input")) {
        check(elem);
    }
}

if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
