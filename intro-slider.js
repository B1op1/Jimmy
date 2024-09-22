document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".sliding");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;
  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  const swipeThreshold = 50; // Minimum distance required to count as a swipe

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

  function handleSwipe(endX, endY) {
    const diffX = startX - endX;
    const diffY = startY - endY;

    if (Math.abs(diffY) > Math.abs(diffX)) {
      // If the Y movement is greater than X, don't trigger a horizontal swipe
      return;
    }

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        goToSlide(currentIndex + 1); // Swipe left
      } else {
        goToSlide(currentIndex - 1); // Swipe right
      }
    }
  }

  slider.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    stopAutoSlide(); // Stop auto-slide when user interacts
    isSwiping = true;
  });

  slider.addEventListener("touchmove", function (event) {
    // Prevent default behavior like scrolling when swiping horizontally
    event.preventDefault();
  });

  slider.addEventListener("touchend", function (event) {
    if (isSwiping) {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      handleSwipe(endX, endY);
      isSwiping = false;
    }
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
