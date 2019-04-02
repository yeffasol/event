function addPhoneMask(elements) {
    const phones = document.querySelectorAll(elements);
    Array.prototype.forEach.call(phones, child => {
        const mask = new IMask(child, {
            mask: "{8}(000)000-00-00",
        });
    });
}

export function addVoidForLinks(links) {
    for(let link of links ){
        if (link.getAttribute(`href`) == `` || link.getAttribute(`href`) == `#`) {
            link.setAttribute(`href`, `javascript:void(0)`);
        }
    }
}

// a11y hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
export function hamburger(element, idmenu) {
    const button = document.getElementById(element);

    const menu = document.getElementById(idmenu);

    button.onclick = function() {
        // Toggle class "opened". Set also aria-expanded to true or false.
        if (button.className.indexOf("opened") !== -1) {
            button.className = button.className.replace(" opened", "");
            button.setAttribute("aria-expanded", "false");
            menu.className = menu.className.replace(" active", "");
            menu.setAttribute("aria-expanded", "false");
            document.querySelector(`.body`).classList.remove(`overlay`);
        } else {
            button.className += " opened";
            button.setAttribute("aria-expanded", "true");
            menu.className += " active";
            menu.setAttribute("aria-expanded", "true");
            document.querySelector(`.body`).classList.add(`overlay`);
        }
    };
}
