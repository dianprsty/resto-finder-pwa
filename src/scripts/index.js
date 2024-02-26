import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";

const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const content = document.getElementById("content");
const closeDrawer = document.getElementById("close-drawer");

hamburger.addEventListener("click", (event) => {
  drawer.classList.add("open");
  event.stopPropagation();
});

content.addEventListener("click", (event) => {
  drawer.classList.remove("open");
  event.stopPropagation();
});

closeDrawer.addEventListener("click", (event) => {
  drawer.classList.remove("open");
  event.stopPropagation();
});
