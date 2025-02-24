const MODAL = document.querySelector("#modal");
const MODAL_OPEN_BUTTON = document.querySelector(".open-modal");
const MODAL_CLOSE_BUTTON = document.querySelector("#close-modal");
const MODAL_FORM = document.querySelector("#modal-form");

export function modalAddEvents() {
  MODAL_OPEN_BUTTON.addEventListener("click", () => {
    MODAL.style.display = "flex";
  });

  MODAL_CLOSE_BUTTON.addEventListener("click", () => {
    MODAL.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && MODAL.style.display === "flex") {
      MODAL.style.display = "none";
    }
  });

  MODAL_FORM.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Форма отправлена!");

    MODAL.style.display = "none";
  });

  // MODAL.addEventListener("click", (event) => {
  //   if (event.target === MODAL) {
  //     MODAL.style.display = "none";
  //   }
  // });
}
