const doc = document;

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
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
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
  for (let link of links) {
    if (link.getAttribute(`href`) == `` || link.getAttribute(`href`) == `#`) {
      link.setAttribute(`href`, `javascript:void(0)`);
    }
  }
}

export function hamburger(hamburgerClass, contentClass) {
  const hamburger = doc.querySelector(hamburgerClass);
  const content = doc.querySelector(contentClass);

  hamburger.addEventListener("click", function () {
    content.classList.toggle("active");
  })

}

export function makeAJAXCall(url, methodType, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(methodType, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var resp = xhr.responseText;
        var respJson = JSON.parse(resp);
        callback(respJson);
      } else {
        console.log("xhr failed");
      }
    } else {
    }
  };
  xhr.send();
}


