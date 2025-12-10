/* scripts.js - shared across all pages
   - mobile menu toggle
   - navbar background on scroll
   - intersection observer for reveal animations
   - particles.js init only when particles container exists
*/

document.addEventListener("DOMContentLoaded", function() {
  // feather icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById("mobile-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Navbar background change on scroll
  const nav = document.getElementById("navbar");
  function adjustNavOnScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add("bg-navy/90", "backdrop-blur-lg");
    } else {
      nav.classList.remove("bg-navy/90", "backdrop-blur-lg");
    }
  }
  adjustNavOnScroll();
  window.addEventListener("scroll", adjustNavOnScroll);

  // IntersectionObserver to reveal elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in-left, .fade-in-right, .service-card, .project-item")
    .forEach(el => observer.observe(el));

  // Show hero content and logo (if present)
  const heroContent = document.getElementById("hero-content");
  const mainLogo = document.getElementById("main-logo");
  if (heroContent) {
    window.addEventListener("load", () => {
      heroContent.style.opacity = "1";
      if (mainLogo) mainLogo.classList.add("show");
    });
    // also try immediate add if already loaded
    if (document.readyState === "complete") {
      heroContent.style.opacity = "1";
      if (mainLogo) mainLogo.classList.add("show");
    }
  }

  // particles.js init only if element exists (only on index/home)
  const particlesEl = document.getElementById("particles-js");
  if (particlesEl && window.particlesJS) {
    try {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 160,
            "density": { "enable": true, "value_area": 900 }
          },
          "color": { "value": "#ffffff" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.9 },
          "size": { "value": 6, "random": true },
          "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1.5
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": true,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
          },
          "modes": {
            "repulse": { "distance": 140, "duration": 0.6 },
            "push": { "particles_nb": 5 }
          }
        },
        "retina_detect": true
      });
    } catch (e) {
      // particles may not be available — fail silently
      console.warn("particles.js init failed:", e);
    }
  }

  // Light client-side contact form behaviour (no backend)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thanks — your message was submitted (demo). Replace with backend endpoint to save messages.");
      contactForm.reset();
    });
  }
});
