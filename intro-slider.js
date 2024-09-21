document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".sliding");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  let startX = 0;
  let endX = 0;

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

  function handleSwipe() {
    if (startX > endX + 50) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (startX < endX - 50) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  }

  sliderContainer.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchmove", function (e) {
    endX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchend", function () {
    handleSwipe();
  });

  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });

  // Start the auto slide
  startAutoSlide();
});
