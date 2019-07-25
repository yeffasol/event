import { debounce } from "./utils";

const doc = document;
let rivalFirst = doc.querySelector(".js-rival-first");
let rivalSecond = doc.querySelector(".js-rival-second");

export function slider(data) {
  const swiper = doc.querySelector(".js-swiper-event");
  const swiperWrapper = doc.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");

  data.forEach(event => {
    const item = `<div class="swiper-slide">
    <div class="slider__item">
      <div class="hexagon">
        <div class="hexagon__center">
          <div class="hexagon__figure">
            <div class="hexagon__active">
              <div class="hexagon__prop">${event.location}</div>
              <div class="hexagon__big-date">${event.date}</div>
              <div class="hexagon__time">${event.time}</div>
              <a class="hexagon__buy" href="#">Купить билет</a>
            </div>
            <div class="hexagon__date">${event.date}</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    swiperWrapper.insertAdjacentHTML("beforeEnd", item);
  });
  swiper.appendChild(swiperWrapper);

  var swiperEvent = new Swiper('.js-swiper-event', {
    slidesPerView: 5,
    initialSlide: 2,
    spaceBetween: 30,
    centeredSlides: true,
    touchReleaseOnEdges: true,
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.slider .swiper-button-next',
          prevEl: '.slider .swiper-button-prev',
        },
      }
    },
    on: {
      slideChange: function () {
        rivalFirst.textContent = data[this.activeIndex].rivals.first;
        rivalSecond.textContent = data[this.activeIndex].rivals.second;

        function getSlide() {
          let allSlides = doc.querySelectorAll(".swiper-slide");
          for (let i = 0; i < allSlides.length; i++) {
            allSlides[i].classList.remove("swiper-slide-small");
          }
          let swiperPrev = doc.querySelector(".swiper-slide-prev");

          if (swiperPrev) {
            let sliderSmall = swiperPrev.previousElementSibling;

            if (sliderSmall) {
              sliderSmall.classList.add('swiper-slide-small');
            }
          }

        }

        setTimeout(getSlide, 40);

      },
    },
  });

  var mouse_wheel = debounce(function (event) {
    if (false == !!event) event = window.event;
    var direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
    if (direction > 0) {
      let index = swiperEvent.activeIndex - 1;
      swiperEvent.slideTo(index);
    } else {
      let index = swiperEvent.activeIndex + 1;
      swiperEvent.slideTo(index);
    }
  }, 150);

  // window.addEventListener('mousewheel', wheel);
  var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x

  if (document.attachEvent) //if IE (and Opera depending on user setting)
  {
    document.attachEvent("on" + mousewheelevt, function (e) {
      mouse_wheel(e);
    });
  } else if (document.addEventListener) //WC3 browsers
  {
    document.addEventListener(mousewheelevt, function (e) {
      mouse_wheel(e);
    }, false);
  }

  const swiperSlides = doc.querySelectorAll(".swiper-slide");
  const hexagons = doc.querySelectorAll(".hexagon");
  const arr = Array.from(swiperSlides);

  for (let hexagon of hexagons) {
    hexagon.addEventListener("click", function () {
      const swiperSlide = hexagon.parentNode.parentNode;
      const index = arr.indexOf(swiperSlide);
      swiperEvent.slideTo(index);
    });
  }

}
