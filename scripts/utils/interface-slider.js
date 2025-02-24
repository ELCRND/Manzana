const INTERFACE_SLIDER = document.querySelector(".interface__list");
const INTERFACE_PREV_BUTTON = document.querySelector(".interface__prev");
const INTERFACE_NEXT_BUTTON = document.querySelector(".interface__next");

const slideWidth = INTERFACE_SLIDER.querySelector(
  ".interface__list li"
).clientWidth;
const gap = parseInt(window.getComputedStyle(INTERFACE_SLIDER).gap);
const quantSlides = INTERFACE_SLIDER.children.length;
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function goToSlide(index) {
  if (index < 0) return;
  if (index >= quantSlides) return;

  currentIndex = index;

  INTERFACE_SLIDER.style.transform = `translateX(${
    -currentIndex * slideWidth - currentIndex * gap
  }px)`;
}

function handleDragStart(event) {
  if (event.type === "touchstart") {
    startPosX = event.touches[0].clientX;
  } else {
    startPosX = event.clientX;
  }
  isDragging = true;

  INTERFACE_SLIDER.style.transition = "none";
  INTERFACE_SLIDER.classList.add("grabbing");
}

function handleDragEnd() {
  if (isDragging) {
    isDragging = false;
    INTERFACE_SLIDER.style.transition = "0.5s";
    const movedBy = currentTranslate - prevTranslate;

    if (Math.abs(movedBy) > slideWidth / 20) {
      if (movedBy < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      goToSlide(currentIndex);
    }

    prevTranslate = -(currentIndex * slideWidth);
    INTERFACE_SLIDER.classList.remove("grabbing");
  }
}

function handleDragMove(event) {
  if (isDragging) {
    const currentPosX =
      event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    const diffX = currentPosX - startPosX;
    currentTranslate = prevTranslate + diffX;
    INTERFACE_SLIDER.style.transform = `translateX(${currentTranslate}px)`;
  }
}

export function interfaceInitSlider() {
  INTERFACE_PREV_BUTTON.addEventListener("click", prevSlide);
  INTERFACE_NEXT_BUTTON.addEventListener("click", nextSlide);

  INTERFACE_SLIDER.addEventListener("mousedown", handleDragStart);
  INTERFACE_SLIDER.addEventListener("mousemove", handleDragMove);
  INTERFACE_SLIDER.addEventListener("mouseup", handleDragEnd);
  INTERFACE_SLIDER.addEventListener("mouseleave", handleDragEnd);

  INTERFACE_SLIDER.addEventListener("touchstart", handleDragStart);
  INTERFACE_SLIDER.addEventListener("touchmove", handleDragMove);
  INTERFACE_SLIDER.addEventListener("touchend", handleDragEnd);
}
