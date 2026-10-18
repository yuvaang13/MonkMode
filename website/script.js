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

      // Close other open answers in this section
      btn.closest(".faq-grid").querySelectorAll(".faq-question").forEach((other) => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          const otherAns = other.nextElementSibling;
          const otherIcon = other.querySelector(".faq-icon");
          if (otherAns) otherAns.hidden = true;
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      btn.setAttribute("aria-expanded", !isOpen);
      if (answer) {
        answer.hidden = !isOpen;
      }
      if (icon) {
        icon.textContent = isOpen ? "+" : "−";
      }
    });
  });

  // Scroll reveal animations
  const revealEls = document.querySelectorAll(
    ".step, .feature-card, .opensource-card, .faq-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();