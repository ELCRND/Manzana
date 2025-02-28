const PORTFOLIO_BUTTON = document.querySelector(".portfolio__btn");
const HIDDEN_ITEMS = document.querySelectorAll(".portfolio__item");

export function portfolioBtnAddEvent() {
  let currentIndex = window.innerWidth > 767 ? 7 : 3;
  PORTFOLIO_BUTTON.addEventListener("click", function () {
    const itemsToShow = 3;

    for (let i = currentIndex; i < currentIndex + itemsToShow; i++) {
      if (i < HIDDEN_ITEMS.length) {
        HIDDEN_ITEMS[i].classList.add("visible");
      } else {
        PORTFOLIO_BUTTON.disabled = true;
        break;
      }
    }

    currentIndex += itemsToShow;

    if (currentIndex >= HIDDEN_ITEMS.length) {
      PORTFOLIO_BUTTON.disabled = true;
    }
  });
}
