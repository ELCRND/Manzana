const HERO_BALL = document.querySelector(".hero-scene__ball");

function reflowAnimation() {
  HERO_BALL.style.animation = "none";
  void HERO_BALL.offsetHeight;
  HERO_BALL.style.animation = null;
}

export function ballStartAnimation() {
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
        ballStartAnimation();
      }, 2000);
    }
  }, 1500);
}
