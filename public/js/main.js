let vars = {};

function ready() {
    vars.inputList = document.querySelectorAll(".input");
    vars.html = document.querySelector("html");
    vars.btnTop = document.querySelector(".btn-top");

    vars.inputList.forEach(elem => check(elem));

    vars.html.addEventListener("click", clickHandler);
    vars.html.addEventListener("input", inputHandler);
    window.addEventListener("scroll", scrollHandler);
}

function clear(elem) {
    elem.textContent = "";
    if (elem.dataset.answer) {
        mark_invalid(elem);
    }
    else {
        mark_valid(elem);
    }
}

function show(elem) {
    elem.textContent = elem.dataset.answer;
    mark_valid(elem);
}

function mark_valid(elem) {
    elem.classList.remove("invalid");
    elem.classList.add("valid");
}

function mark_invalid(elem) {
    elem.classList.remove("valid");
    elem.classList.add("invalid");
}

function check(elem) {
    if (elem.textContent === elem.dataset.answer) {
        mark_valid(elem);
    }
    else {
        mark_invalid(elem);
    }
}

function clickHandler(event) {
    let elem = event.target;
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
        case "top":
            document.documentElement.scrollTop = 0;
            break;
        default:
            break;
    }
}

function inputHandler(event) {
    let elem = event.target;
    if (elem.classList.contains("input")) {
        check(elem);
    }
}

function scrollHandler(event) {
    if (document.documentElement.scrollTop > 200) {
        vars.btnTop.style.display = "flex";
    }
    else {
        vars.btnTop.style.display = "none";
    }
}

if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
