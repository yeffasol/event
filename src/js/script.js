function addPhoneMask(elements) {
	const phones = document.querySelectorAll(elements);
	Array.prototype.forEach.call(phones, child => {
		const mask = new IMask(child, {
			mask: "{8}(000)000-00-00",
		});
	});
}

function addVoidForLinks(links) {
	$.each(links, function() {
		if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
			$(this).attr("href", "javascript:void(0)");
		}
	});
}

// a11y hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
function hamburger(element, menu) {
	const button = document.getElementById(element);

	var menu = document.getElementById(menu);
	button.onclick = function() {
		// Toggle class "opened". Set also aria-expanded to true or false.
		if (button.className.indexOf("opened") !== -1) {
			button.className = button.className.replace(" opened", "");
			button.setAttribute("aria-expanded", "false");
			menu.className = menu.className.replace(" active", "");
			menu.setAttribute("aria-expanded", "false");
		} else {
			button.className += " opened";
			button.setAttribute("aria-expanded", "true");
			menu.className += " active";
			menu.setAttribute("aria-expanded", "true");
		}
	};
}

const doc = document;

const root = document.getElementsByTagName("html")[0];

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
trainJedi({ name: "Adeel", designation: "padawan" });
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
