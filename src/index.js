const doc = document,
    root = document.getElementsByTagName('html')[0],
    KEYS = {
        "TAB": "9"
    };

(function () {
    doc.addEventListener("click", function () {
        root.classList.remove("focus");
    });

    doc.addEventListener("keyup", function (e) {
        if (e.keyCode == KEYS.TAB) {
            root.classList.add("focus");
        }
    });
})();