const MENU = document.querySelector(".header__navigation");
const MENU_BTN = document.querySelector(".header__open");
const NAVIGATION_LINK = document.querySelectorAll(".header-navigation__link");
const HEADER_BTN = document.querySelector(".header__btn");

export function addEventBurgerMenu() {
  MENU_BTN.addEventListener("click", () => {
    MENU.classList.toggle("open");
    MENU_BTN.classList.toggle("open");
  });

  [...NAVIGATION_LINK, HEADER_BTN].forEach((el) =>
    el.addEventListener("click", () => {
      MENU.classList.remove("open");
      MENU_BTN.classList.remove("open");
    })
  );
}
