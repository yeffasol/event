function addPhoneMask(elements) {
    const phones = document.querySelectorAll(elements);
    Array.prototype.forEach.call(phones, child => {
        const mask = new IMask(child, {
            mask: "{8}(000)000-00-00",
        });
    });
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function addVoidForLinks(links) {
    for(let link of links ){
        if (link.getAttribute(`href`) == `` || link.getAttribute(`href`) == `#`) {
            link.setAttribute(`href`, `javascript:void(0)`);
        }
    }
}
