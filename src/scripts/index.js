import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import { data } from "../public/data/data.js";

const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const content = document.getElementById("content");
const closeDrawer = document.getElementById("close-drawer");

const foodsGroup = document.querySelector(".foods-group");

hamburger.addEventListener("click", (event) => {
  if (drawer.classList.contains("open")) {
    drawer.classList.remove("open");
  } else {
    drawer.classList.add("open");
  }
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

window.onload = () => {
  for (const restaurant of data.restaurants) {
    foodsGroup.innerHTML += `<article class="food-card" key=${restaurant.id}>
    <div class="city-tag">
      <p>${restaurant.city}</p>
    </div>
    <button class="btn-favorite rounded">
      <img src="./images/icons/heart-outlined.svg" alt="heart icon" />
    </button>
    <div class="card-image">
      <img
        src="${restaurant.pictureId}"
        alt="image of ${restaurant.name}"
      />
    </div>
    <div class="card-body">
      <h2 class="food-name">${restaurant.name}</h2>
      <p class="food-rating"><img class="star-rating" src="./images/icons/star-fiiled.svg" alt="star icon" /> ${restaurant.rating}</p>
      <p class="food-description">
        ${restaurant.description}
      </p>
      <a href="#food-details" class="btn-details" >See Details</a>
    </div>
  </article>`;
  }
};
