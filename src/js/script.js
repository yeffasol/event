import { addVoidForLinks, hamburger } from './utils';

const doc = document;
const root = doc.getElementsByTagName("html")[0];
addVoidForLinks(doc.querySelectorAll(`a`));
hamburger(`js-hamburger`, `js-menu`);

root.classList.remove("no-js");

const person = {
    name: "Yoda",
    designation: "Jedi Master ",
};

function trainJedi(jediWarrion) {
    if (jediWarrion.name === "Yoda") {
        console.log("No need! already trained");
    }
    console.log(`Training ${jediWarrion.name} complete`);
}

trainJedi(person);
trainJedi({
    name: "Adeel",
    designation: "padawan"
});
// lazy load script file
// (function () {
//     function component() {
//         var element = document.createElement('div');
//         var button = document.createElement('button');
//         var br = document.createElement('br');
//
//         button.innerHTML = 'Click me and look at the console!';
//         element.innerHTML = "Hello webpack";
//         element.appendChild(br);
//         element.appendChild(button);
//
//         button.onclick = e => import('./print').then(module => {
//             var print = module.default;
//
//             print();
//         });
//         return element;
//     }
//
//     document.body.appendChild(component());
//
// })();
