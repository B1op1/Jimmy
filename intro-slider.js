document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".sliding");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  function goToSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }
    currentIndex = index;
    const translateValue = -currentIndex * 100 + "%";
    slider.style.transform = `translateX(${translateValue})`;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 7000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });

  // Start the auto slide
  startAutoSlide();
});
