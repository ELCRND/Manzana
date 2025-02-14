// ======================== OUR TOOLS ========================
const toolsSection = document.querySelector(".tools");
const toolsLogo = toolsSection.querySelectorAll(".tools__item ul li");

const options = {
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      toolsLogo.forEach((el) => el.classList.add("move"));
    }
  });
}, options);

observer.observe(toolsSection);

// ======================== PORTFOLIO SLIDER ========================
const PORTFOLIO_SLIDER = document.querySelector(".portfolio__list");
const PORTFOLIO_PREV_BUTTON = document.querySelector(".portfolio__prev");
const PORTFOLIO_NEXT_BUTTON = document.querySelector(".portfolio__next");

const slideWidth = PORTFOLIO_SLIDER.querySelector(
  ".portfolio__list li"
).clientWidth;
const gap = parseInt(window.getComputedStyle(PORTFOLIO_SLIDER).gap);
const quantSlides = PORTFOLIO_SLIDER.children.length;
let currentIndex = 0;

PORTFOLIO_PREV_BUTTON.addEventListener("click", prevSlide);
PORTFOLIO_NEXT_BUTTON.addEventListener("click", nextSlide);

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function goToSlide(index) {
  if (index < 0) return goToSlide(quantSlides - 1);
  if (index >= quantSlides) return goToSlide(0);

  currentIndex = index;

  PORTFOLIO_SLIDER.style.transform = `translateX(${
    -currentIndex * slideWidth - currentIndex * gap
  }px)`;
}

// ========================PORTFOLIO ZOOM========================
const PORTFOLIO_ZOOM_MODAL = document.querySelector(".portfolio__modal");
const PORTFOLIO_ZOOM_MODAL_IMAGE = PORTFOLIO_ZOOM_MODAL.querySelector(
  ".portfolio-modal__content img"
);
const PORTFOLIO_CLOSE_MODAL_BUTTON = PORTFOLIO_ZOOM_MODAL.querySelector(
  ".portfolio-modal__close"
);
const PORTFOLIO_ZOOM_MODAL_PREV_BUTTON = PORTFOLIO_ZOOM_MODAL.querySelector(
  ".portfolio-modal__prev"
);
const PORTFOLIO_ZOON_MODAL_NEXT_BUTTON = PORTFOLIO_ZOOM_MODAL.querySelector(
  ".portfolio-modal__next"
);
const PORTFOLIO_ZOOM_IMAGE_BUTTON = document.querySelectorAll(
  ".portfolio__list li button"
);
const PORTFOLIO_IMAGES = document.querySelectorAll(
  ".portfolio__list li picture img"
);

let currentImageIndex = 0;

PORTFOLIO_ZOOM_IMAGE_BUTTON.forEach((btn, idx) => {
  btn.addEventListener("click", () => openZoomModal(idx));
});

PORTFOLIO_ZOOM_MODAL_PREV_BUTTON.addEventListener(
  "click",
  zoomModalGoToPrevImage
);
PORTFOLIO_ZOON_MODAL_NEXT_BUTTON.addEventListener(
  "click",
  zoomModalGoToNextImage
);
PORTFOLIO_CLOSE_MODAL_BUTTON.addEventListener("click", closeZoomModal);

function openZoomModal(index) {
  currentImageIndex = index;

  PORTFOLIO_ZOOM_MODAL.style.display = "flex";
  PORTFOLIO_ZOOM_MODAL_IMAGE.src = PORTFOLIO_IMAGES[currentImageIndex].src;

  document.addEventListener("keydown", handleKeyDown);
  document.body.classList.add("scroll-off");
}

function closeZoomModal() {
  PORTFOLIO_ZOOM_MODAL.style.display = "none";

  document.body.classList.remove("scroll-off");
  document.removeEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  switch (event.key) {
    case "Escape":
      closeZoomModal();
      break;
    case "ArrowLeft":
      zoomModalGoToPrevImage();
      break;
    case "ArrowRight":
      zoomModalGoToNextImage();
      break;
  }
}

function zoomModalGoToPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length;

  PORTFOLIO_ZOOM_MODAL_IMAGE.src = PORTFOLIO_IMAGES[currentImageIndex].src;
}

function zoomModalGoToNextImage() {
  currentImageIndex = (currentImageIndex + 1) % PORTFOLIO_IMAGES.length;

  PORTFOLIO_ZOOM_MODAL_IMAGE.src = PORTFOLIO_IMAGES[currentImageIndex].src;
}
