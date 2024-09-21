document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".sliding");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;
  let startX = 0;
  let isSwiping = false;

  function goToSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 7000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function handleSwipe(endX) {
    if (startX - endX > 50) {
      goToSlide(currentIndex + 1); // Swipe left
    } else if (endX - startX > 50) {
      goToSlide(currentIndex - 1); // Swipe right
    }
  }

  slider.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    stopAutoSlide(); // Stop auto-slide when user interacts
    isSwiping = true;
  });

  slider.addEventListener("touchmove", function (event) {
    if (!isSwiping) return;
    const endX = event.touches[0].clientX;
    handleSwipe(endX);
    isSwiping = false;
  });

  slider.addEventListener("touchend", function () {
    startAutoSlide(); // Restart auto-slide after swipe
  });

  prevBtn?.addEventListener("click", function () {
    stopAutoSlide(); // Stop auto-slide on interaction
    goToSlide(currentIndex - 1);
    startAutoSlide(); // Restart auto-slide after interaction
  });

  nextBtn?.addEventListener("click", function () {
    stopAutoSlide(); // Stop auto-slide on interaction
    goToSlide(currentIndex + 1);
    startAutoSlide(); // Restart auto-slide after interaction
  });

  // Initialize auto-slide
  startAutoSlide();
});
