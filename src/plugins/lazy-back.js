document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages;
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
        Array.prototype.forEach.call(entries, function(entry) {
            if (entry.isIntersecting) {
                var image = entry.target;
                image.classList.remove("lazy");
                imageObserver.unobserve(image);
            }
        });
    });
    Array.prototype.forEach.call(lazyloadImages, function(image) {
        imageObserver.observe(image);

    });

});

