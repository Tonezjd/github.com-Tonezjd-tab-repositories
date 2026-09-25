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
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    toggle.focus();
  }
  function openNav() {
    toggle.classList.add("is-open");
    mobileNav.classList.add("is-open");
    scrim.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var firstLink = mobileNav.querySelector("a");
    if (firstLink) firstLink.focus();
  }
  if (toggle && mobileNav && scrim) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "mobile-nav");
    mobileNav.setAttribute("aria-hidden", "true");
    mobileNav.id = "mobile-nav";
    toggle.addEventListener("click", function () {
      toggle.classList.contains("is-open") ? closeNav() : openNav();
    });
    scrim.addEventListener("click", closeNav);
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.classList.contains("is-open")) {
        closeNav();
      }
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

  /* ---- License PDF modal (About page) ---- */
  var pdfModal = document.getElementById("license-pdf-modal");
  if (pdfModal) {
    var pdfIframe = pdfModal.querySelector("iframe");
    var pdfSrc = pdfIframe ? pdfIframe.getAttribute("data-pdf-src") : "";
    var pdfOpeners = document.querySelectorAll("[data-open-pdf-modal]");
    var pdfCloseBtn = pdfModal.querySelector(".pdf-modal-close");

    function openPdfModal() {
      if (pdfIframe && !pdfIframe.getAttribute("src")) {
        pdfIframe.setAttribute("src", pdfSrc);
      }
      pdfModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      if (pdfCloseBtn) pdfCloseBtn.focus();
    }
    function closePdfModal() {
      pdfModal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    pdfOpeners.forEach(function (btn) {
      btn.addEventListener("click", openPdfModal);
    });
    if (pdfCloseBtn) pdfCloseBtn.addEventListener("click", closePdfModal);
    pdfModal.addEventListener("click", function (e) {
      if (e.target === pdfModal) closePdfModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && pdfModal.classList.contains("is-open")) {
        closePdfModal();
      }
    });
  }

  /* ---- Our Work carousel (homepage) ---- */
  var workTrack = document.querySelector("[data-carousel-track]");
  if (workTrack) {
    var workSlides = Array.prototype.slice.call(workTrack.querySelectorAll("[data-carousel-slide]"));
    var workPrevBtn = document.querySelector("[data-carousel-prev]");
    var workNextBtn = document.querySelector("[data-carousel-next]");
    var workDotsWrap = document.querySelector("[data-carousel-dots]");
    var workDots = [];

    workSlides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to project photo " + (i + 1));
      dot.addEventListener("click", function () {
        slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
      if (workDotsWrap) workDotsWrap.appendChild(dot);
      workDots.push(dot);
    });

    function setActiveWorkDot(index) {
      workDots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
      });
    }

    if ("IntersectionObserver" in window) {
      var workObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var idx = workSlides.indexOf(entry.target);
              if (idx !== -1) setActiveWorkDot(idx);
            }
          });
        },
        { root: workTrack, threshold: 0.6 }
      );
      workSlides.forEach(function (slide) { workObserver.observe(slide); });
    }

    function scrollWorkBy(direction) {
      var amount = workTrack.clientWidth * 0.82 * direction;
      workTrack.scrollBy({ left: amount, behavior: "smooth" });
    }
    if (workPrevBtn) workPrevBtn.addEventListener("click", function () { scrollWorkBy(-1); });
    if (workNextBtn) workNextBtn.addEventListener("click", function () { scrollWorkBy(1); });

    workTrack.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { scrollWorkBy(1); }
      if (e.key === "ArrowLeft") { scrollWorkBy(-1); }
    });
  }
});
