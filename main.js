let vars = {};

function ready() {
    vars.inputList = document.querySelectorAll(".input");
    vars.btnClearAll = document.querySelector(".btn-clear-all");
    vars.btnClearList = document.querySelectorAll(".btn-clear");
    vars.btnShowList = document.querySelectorAll(".btn-show");

    check_all();

    vars.inputList.forEach(elem => elem.addEventListener("input", function () {
        check(this);
    }));

    vars.btnClearAll.addEventListener("click", clear_all);

    vars.btnClearList.forEach(elem => elem.addEventListener("click", function () {
        clear(this.parentElement.querySelector(".input"));
    }));

    vars.btnShowList.forEach(elem => elem.addEventListener("click", function () {
        show(this.parentElement.querySelector(".input"));
    }));
}

function clear_all() {
    vars.inputList.forEach(elem => clear(elem));
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

if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
