const HERO_BALL = document.querySelector(".hero-scene__ball");

function reflowAnimation() {
  HERO_BALL.style.animation = "none";
  void HERO_BALL.offsetHeight;
  HERO_BALL.style.animation = null;
}

function startAnimation() {
  reflowAnimation();

  let bounceCount = 0;
  const maxBounces = 2;

  const bounceInterval = setInterval(() => {
    bounceCount++;

    if (bounceCount >= maxBounces) {
      clearInterval(bounceInterval);
      reflowAnimation();
      HERO_BALL.style.animation = "fly 2s linear forwards";

      setTimeout(() => {
        startAnimation();
      }, 2000);
    }
  }, 1500);
}

startAnimation();

// ======================== OUR TOOLS ========================
const OUR_TOOLS = document.querySelector(".tools");
const TOOLS_LOGO = OUR_TOOLS.querySelectorAll(".tools__item ul li");

const options = {
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      TOOLS_LOGO.forEach((el) => el.classList.add("move"));
    }
  });
}, options);

observer.observe(OUR_TOOLS);

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
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

PORTFOLIO_PREV_BUTTON.addEventListener("click", prevSlide);
PORTFOLIO_NEXT_BUTTON.addEventListener("click", nextSlide);

PORTFOLIO_SLIDER.addEventListener("mousedown", (event) => {
  isDragging = true;
  startPosX = event.clientX;
  PORTFOLIO_SLIDER.style.transition = "none";
  PORTFOLIO_SLIDER.classList.add("grabbing");
});

PORTFOLIO_SLIDER.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const currentPosX = event.clientX;
    const diffX = currentPosX - startPosX;
    currentTranslate = prevTranslate + diffX;
    PORTFOLIO_SLIDER.style.transform = `translateX(${currentTranslate}px)`;
  }
});

PORTFOLIO_SLIDER.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    PORTFOLIO_SLIDER.style.transition = "0.5s";

    const movedBy = currentTranslate - prevTranslate;
    if (Math.abs(movedBy) > slideWidth / 8) {
      if (movedBy < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      goToSlide(currentIndex);
    }

    prevTranslate = -currentIndex * slideWidth;
    PORTFOLIO_SLIDER.classList.remove("grabbing");
  }
});

PORTFOLIO_SLIDER.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    PORTFOLIO_SLIDER.style.transition = "0.5s";
    goToSlide(currentIndex);
    PORTFOLIO_SLIDER.classList.remove("grabbing");
  }
});

PORTFOLIO_SLIDER.addEventListener("touchstart", (event) => {
  isDragging = true;
  startPosX = event.touches[0].clientX;
  PORTFOLIO_SLIDER.style.transition = "none";
});

PORTFOLIO_SLIDER.addEventListener("touchmove", (event) => {
  if (isDragging) {
    const currentPosX = event.touches[0].clientX;
    const diffX = currentPosX - startPosX;
    currentTranslate = prevTranslate + diffX;
    PORTFOLIO_SLIDER.style.transform = `translateX(${currentTranslate}px)`;
  }
});

PORTFOLIO_SLIDER.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    PORTFOLIO_SLIDER.style.transition = "0.5s";

    const movedBy = currentTranslate - prevTranslate;
    if (Math.abs(movedBy) > slideWidth / 8) {
      if (movedBy < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      goToSlide(currentIndex);
    }

    prevTranslate = -currentIndex * slideWidth;
  }
});

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function goToSlide(index) {
  //   if (index < 0) return goToSlide(quantSlides - 1);
  //   if (index >= quantSlides) return goToSlide(0);
  if (index < 0) return;
  if (index >= quantSlides) return;

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
