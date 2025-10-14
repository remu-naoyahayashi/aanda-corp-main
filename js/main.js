// 375px以下のビューポート
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value = window.outerWidth > 375 ? "width=device-width,initial-scale=1" : "width=375";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

// ページ内スムーススクロール
var navHeight = $(".header").outerHeight();

$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? "html" : href);
  var position = target.offset().top - navHeight;
  $("html, body").animate({ scrollTop: position }, 400, "swing");
});

// ドロワーメニュー
$(".js-menu-btn").on("click", function (e) {
  e.preventDefault();
  $(this).toggleClass("is-open");
  $(".js-drawer").slideToggle(300);
});

$(".js-nav-link").on("click", function () {
  $(".js-menu-btn").removeClass("is-open");
  $(".js-drawer").hide();
});

$(window).on("resize", function () {
  if (window.innerWidth >= 1024) {
    $(".js-menu-btn").removeClass("is-open");
    $(".js-drawer").hide();
  }
});

// TOP FV画像切替
(function () {
  const slider = document.getElementById("js-fv-slider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".js-top-fv-slide");
  let current = 0;
  const total = slides.length;
  const interval = 5000;

  function showNext() {
    slides[current].classList.remove("is-active");
    current = (current + 1) % total;
    slides[current].classList.add("is-active");
  }

  setInterval(showNext, interval);
})();

// TOP MEMBERSスライド
const membersSwiper = new Swiper(".js-members-slides", {
  loop: false,
  spaceBetween: 0,
  slidesPerView: "auto",
  centeredSlides: false,

  navigation: {
    nextEl: ".js-members-slide-next",
  },

  breakpoints: {
    660: {
      loop: true,
      spaceBetween: 0,
    },
  },
});

// TOP Q&Aアコーディオン

$(".js-top-accordion").on("click", function (e) {
  e.preventDefault();

  const $parent = $(this).parent();
  const $body = $(this).next();

  if ($parent.hasClass("is-open")) {
    $parent.removeClass("is-open");
    $body.slideUp();
  } else {
    $(".js-top-qa.is-open").removeClass("is-open").find(".qa-list__body").slideUp();

    $parent.addClass("is-open");
    $body.slideDown();
  }
});
