import { addVoidForLinks, debounce } from './utils';

const doc = document;
addVoidForLinks(doc.querySelectorAll(`a`));

var swiperEvent = new Swiper('.js-swiper-event', {
  slidesPerView: 5,
  initialSlide: 2,
  spaceBetween: 30,
  centeredSlides: true,
  grabCursor: true,
  touchReleaseOnEdges: true,
  breakpoints: {
    // when window width is <= 320px
    1120: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 1,
      navigation: {
        nextEl: '.slider .swiper-button-next',
        prevEl: '.slider .swiper-button-prev',
      },
    }
  },
  on: {
    slideChange: function () {

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

var wheel = debounce(function(event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    let index = swiperEvent.activeIndex - 1;
    swiperEvent.slideTo(index);
  } else {
    let index = swiperEvent.activeIndex + 1;
    swiperEvent.slideTo(index);
  }
}, 150);


window.addEventListener('mousewheel', wheel);
