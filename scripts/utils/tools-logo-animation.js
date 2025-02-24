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

export function toolsInitAnimation() {
  observer.observe(OUR_TOOLS);
}
