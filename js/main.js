// Volta Power Electric — site interactivity
document.addEventListener("DOMContentLoaded", function () {

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  var scrim = document.querySelector(".nav-scrim");

  function closeNav() {
    toggle.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    scrim.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function openNav() {
    toggle.classList.add("is-open");
    mobileNav.classList.add("is-open");
    scrim.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  if (toggle && mobileNav && scrim) {
    toggle.addEventListener("click", function () {
      toggle.classList.contains("is-open") ? closeNav() : openNav();
    });
    scrim.addEventListener("click", closeNav);
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---- Active nav link highlighting ---- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---- Contact form: service-type toggle ---- */
  var toggleBtns = document.querySelectorAll(".toggle-btn");
  toggleBtns.forEach(function (btn) {
    var input = btn.querySelector("input");
    if (!input) return;
    input.addEventListener("change", function () {
      var group = btn.closest(".field-toggle");
      group.querySelectorAll(".toggle-btn").forEach(function (b) {
        b.classList.remove("is-active");
      });
      if (input.checked) btn.classList.add("is-active");
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Simple client-side required-field check (Netlify still validates server-side) ---- */
  var form = document.querySelector("form[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      var required = form.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        var notice = form.querySelector(".form-notice");
        if (notice) {
          notice.textContent = "Please fill in all required fields before submitting.";
          notice.style.display = "block";
        }
      }
    });
  }
});
