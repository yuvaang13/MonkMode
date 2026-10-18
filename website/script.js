// ---------------------------------------------------------------
// MonkMode website interactions
// ---------------------------------------------------------------

(() => {
  "use strict";

  // Mobile nav toggle
  const menuBtn = document.querySelector(".nav__menu");
  const navLinks = document.querySelector(".nav__links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");

      btn.setAttribute("aria-expanded", !isOpen);
      if (answer) {
        answer.hidden = !isOpen;
      }
      if (icon) {
        icon.textContent = isOpen ? "+" : "−";
      }
    });
  });

  // Reveal animations on scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".step, .feature-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 700ms cubic-bezier(0.23, 1, 0.32, 1), transform 700ms cubic-bezier(0.23, 1, 0.32, 1)";
    observer.observe(el);
  });

  // Smooth focus for CTA buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const href = btn.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();