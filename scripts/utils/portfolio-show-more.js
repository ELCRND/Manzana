const PORTFOLIO_BUTTON = document.querySelector(".portfolio__btn");
const HIDDEN_ITEMS = document.querySelectorAll(".portfolio__item.hidden");

export function portfolioBtnAddEvent() {
  PORTFOLIO_BUTTON.addEventListener("click", function () {
    HIDDEN_ITEMS.forEach((item) => {
      item.classList.remove("hidden");
    });

    PORTFOLIO_BUTTON.disabled = true;
  });
}
