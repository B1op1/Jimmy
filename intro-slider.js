document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".sliding");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  function goToSlide(index, animate = true) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }
    currentIndex = index;
    slider.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
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

  slider.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    currentX = startX;
    stopAutoSlide(); // Stop auto-slide when user interacts
    isSwiping = true;
    slider.style.transition = 'none'; // Disable transition during the swipe
  });

  slider.addEventListener("touchmove", function (event) {
    if (!isSwiping) return;
    currentX = event.touches[0].clientX;
    const diffX = currentX - startX;
    const translateX = -currentIndex * 100 + (diffX / slider.offsetWidth) * 100;
    slider.style.transform = `translateX(${translateX}%)`;
  });

  slider.addEventListener("touchend", function () {
    if (!isSwiping) return;
    isSwiping = false;
    const diffX = currentX - startX;
    if (Math.abs(diffX) > slider.offsetWidth / 4) { // If swipe is more than 25% of the slide width
      if (diffX > 0) {
        goToSlide(currentIndex - 1); // Swipe right
      } else {
        goToSlide(currentIndex + 1); // Swipe left
      }
    } else {
      goToSlide(currentIndex); // Stay on the current slide
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
