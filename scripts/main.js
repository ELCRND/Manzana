import { ballStartAnimation } from "./utils/hero-ball-animation.js";
import { addEventBurgerMenu } from "./utils/humb-menu.js";
import { interfaceInitSlider } from "./utils/interface-slider.js";
import { interfaceInitZoomModal } from "./utils/interface-zoom.js";
import { modalAddEvents } from "./utils/modal-form.js";
import { portfolioBtnAddEvent } from "./utils/portfolio-show-more.js";
import { toolsInitAnimation } from "./utils/tools-logo-animation.js";

ballStartAnimation();
portfolioBtnAddEvent();
toolsInitAnimation();
interfaceInitSlider();
interfaceInitZoomModal();
modalAddEvents();
addEventBurgerMenu();
