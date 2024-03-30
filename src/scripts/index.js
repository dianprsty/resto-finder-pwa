/* eslint-disable no-restricted-syntax */
import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const content = document.getElementById("content");

const app = new App({
  button: hamburger,
  drawer,
  content,
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
