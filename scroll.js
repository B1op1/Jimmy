document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const overshootDistance = 100; // Increased overshoot distance in pixels
    const maxSpeed = 80; // Maximum speed in pixels per frame
    let speed = 15; // Initial speed
    const acceleration = 2; // Acceleration in pixels per frame squared
    let currentPosition = startPosition;
    let isScrolling = true;

    // Cancel the scroll animation if user interferes
    function cancelScroll() {
      isScrolling = false;
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchmove", cancelScroll);
      window.removeEventListener("keydown", cancelScroll);
    }

    window.addEventListener("wheel", cancelScroll);
    window.addEventListener("touchmove", cancelScroll);
    window.addEventListener("keydown", cancelScroll);

    function step() {
      if (!isScrolling) return;

      const remainingDistance = targetPosition - currentPosition;

      if (Math.abs(remainingDistance) < speed) {
        // If close to the target, overshoot it
        currentPosition =
          targetPosition + Math.sign(remainingDistance) * overshootDistance;
        window.scrollTo(0, currentPosition);
        scrollToTarget();
        return;
      }

      // Calculate new speed, making sure not to exceed maxSpeed
      if (speed < maxSpeed) {
        speed += acceleration;
      }

      // If we're close to the target, start decelerating
      if (Math.abs(remainingDistance) < (speed * speed) / (2 * acceleration)) {
        speed -= acceleration;
      }

      // Move by the current speed
      currentPosition += Math.sign(remainingDistance) * speed;
      window.scrollTo(0, currentPosition);

      requestAnimationFrame(step);
    }

    function scrollToTarget() {
      if (!isScrolling) return;

      const remainingDistance = targetPosition - currentPosition;

      function stepBack() {
        if (!isScrolling) return;

        const remainingDistance = targetPosition - currentPosition;
        if (Math.abs(remainingDistance) < 1) {
          window.scrollTo(0, targetPosition);
          return;
        }

        currentPosition +=
          Math.sign(remainingDistance) *
          Math.max(Math.abs(remainingDistance) / 10, 1);
        window.scrollTo(0, currentPosition);
        requestAnimationFrame(stepBack);
      }

      requestAnimationFrame(stepBack);
    }

    requestAnimationFrame(step);

    // Close the sidebar if it's active
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  });
});

let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function () {
  sidebar.classList.toggle("active");
};
