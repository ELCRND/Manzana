const INTERFACE_ZOOM_MODAL = document.querySelector(".interface__modal");
const INTERFACE_ZOOM_MODAL_IMAGE = INTERFACE_ZOOM_MODAL.querySelector(
  ".interface-modal__content img"
);
const INTERFACE_CLOSE_MODAL_BUTTON = INTERFACE_ZOOM_MODAL.querySelector(
  ".interface-modal__close"
);
const INTERFACE_ZOOM_MODAL_PREV_BUTTON = INTERFACE_ZOOM_MODAL.querySelector(
  ".interface-modal__prev"
);
const INTERFACE_ZOON_MODAL_NEXT_BUTTON = INTERFACE_ZOOM_MODAL.querySelector(
  ".interface-modal__next"
);
const INTERFACE_ZOOM_IMAGE_BUTTON = document.querySelectorAll(
  ".interface__list li button"
);
const INTERFACE_IMAGES = document.querySelectorAll(
  ".interface__list li picture img"
);

let currentImageIndex = 0;

function openZoomModal(index) {
  currentImageIndex = index;

  INTERFACE_ZOOM_MODAL.style.display = "flex";
  INTERFACE_ZOOM_MODAL_IMAGE.src = INTERFACE_IMAGES[currentImageIndex].src;

  document.addEventListener("keydown", handleKeyDown);
  document.body.classList.add("scroll-off");
}

function closeZoomModal() {
  INTERFACE_ZOOM_MODAL.style.display = "none";

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
    (currentImageIndex - 1 + INTERFACE_IMAGES.length) % INTERFACE_IMAGES.length;

  INTERFACE_ZOOM_MODAL_IMAGE.src = INTERFACE_IMAGES[currentImageIndex].src;
}

function zoomModalGoToNextImage() {
  currentImageIndex = (currentImageIndex + 1) % INTERFACE_IMAGES.length;

  INTERFACE_ZOOM_MODAL_IMAGE.src = INTERFACE_IMAGES[currentImageIndex].src;
}

export function interfaceInitZoomModal() {
  INTERFACE_ZOOM_IMAGE_BUTTON.forEach((btn, idx) => {
    btn.addEventListener("click", () => openZoomModal(idx));
  });

  INTERFACE_ZOOM_MODAL_PREV_BUTTON.addEventListener(
    "click",
    zoomModalGoToPrevImage
  );
  INTERFACE_ZOON_MODAL_NEXT_BUTTON.addEventListener(
    "click",
    zoomModalGoToNextImage
  );
  INTERFACE_CLOSE_MODAL_BUTTON.addEventListener("click", closeZoomModal);
}
