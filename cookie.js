document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");
  const contactForm = document.querySelector(".contact-form-container");
  const overlayMessage = document.querySelector(".contact-overlay");

  function showBanner() {
    banner.style.display = "flex"; // Ensure the banner is displayed
    setTimeout(() => {
      banner.classList.add("visible"); // Trigger the slide-in effect
    }, 10); // Short delay to ensure display change takes effect
  }

  function updateContactFormVisibility() {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === "rejected") {
      contactForm.style.display = "none"; // Hide contact form
      if (overlayMessage) {
        overlayMessage.style.display = "flex"; // Show the overlay message
      }
    } else {
      contactForm.style.display = "block"; // Show contact form
      if (overlayMessage) {
        overlayMessage.style.display = "none"; // Hide the overlay message
      }
    }
  }

  // Function to check if the session is new (i.e., the site has been reopened)
  function isSessionNew() {
    return !sessionStorage.getItem("sessionActive");
  }

  // Function to set session as active
  function setSessionActive() {
    sessionStorage.setItem("sessionActive", "true");
  }

  // Only show the banner if the session is new
  if (isSessionNew()) {
    setTimeout(showBanner, 1000); // Show the banner after 1 second
  }

  // Initialize contact form visibility based on cookie consent status
  updateContactFormVisibility();

  // Accept cookies action
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.classList.remove("visible");
    setTimeout(() => banner.classList.add("hide"), 500); // Hide banner with transition
    updateContactFormVisibility(); // Update contact form visibility
    setSessionActive(); // Mark session as active after accepting cookies
  });

  // Reject cookies action
  rejectBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "rejected");
    banner.classList.remove("visible");
    setTimeout(() => banner.classList.add("hide"), 500); // Hide banner with transition
    updateContactFormVisibility(); // Update contact form visibility
    setSessionActive(); // Mark session as active after rejecting cookies
  });

  // Listen for storage events to update contact form visibility if cookies are changed in cookies.html
  window.addEventListener("storage", function (event) {
    if (event.key === "cookieConsent") {
      updateContactFormVisibility();
    }
  });
});
