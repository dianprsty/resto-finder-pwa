/* eslint-disable no-restricted-syntax */
import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import data from "../public/data/data";

const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const content = document.getElementById("content");
const closeDrawer = document.getElementById("close-drawer");
const foodDetails = document.getElementById("food-details");
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

const renderCurrentFood = () => {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
  foodDetails.innerHTML = `<div class="left">
      <img src="${restaurant.pictureId}" alt="${restaurant.name}" />
      <div class="food-info">
        <button class="btn-favorite">
          <img src="./images/icons/heart-outlined.svg" alt="favorite button" />
        </button>
        <p class="food-rating">
          <img
            class="star-rating"
            src="./images/icons/star-fiiled.svg"
            alt="star rating"
          />
          ${restaurant.rating}
        </p>
        <p class="city-tag">${restaurant.city}</p>
      </div>
    </div>
    <div class="right">
      <p class="food-name">${restaurant.name}</p>
      <p class="food-description">${restaurant.description}
      </p>
    </div>`;
};

const setCurrentFood = (event) => {
  const id = event.target.id.split("-")[1];
  const restaurant = data.restaurants.find((e) => e.id === id);

  localStorage.setItem("restaurant", JSON.stringify(restaurant));

  renderCurrentFood();
};

window.onload = () => {
  for (const restaurant of data.restaurants) {
    foodsGroup.innerHTML += `<article class="food-card" key=${restaurant.id}>
        <div class="city-tag">
          <p>${restaurant.city}</p>
        </div>
        <button class="btn-favorite rounded">
          <img src="./images/icons/heart-outlined.svg" alt="favorite button" />
        </button>
        <div class="card-image">
          <img
            src="${restaurant.pictureId}"
            alt="image of ${restaurant.name}"
          />
        </div>
        <div class="card-body">
          <h2 class="food-name">${restaurant.name}</h2>
          <p class="food-rating"><img class="star-rating" src="./images/icons/star-fiiled.svg" alt="star rating" /> ${restaurant.rating}</p>
          <p class="food-description">
            ${restaurant.description}
          </p>
          <a href="#food-details" class="btn-details" id="btn-${restaurant.id}" >
          See Details</a>
        </div>
      </article>`;
  }
  for (const restaurant of data.restaurants) {
    document
      .getElementById(`btn-${restaurant.id}`)
      .addEventListener("click", setCurrentFood);
  }

  if (localStorage.getItem("restaurant")) {
    renderCurrentFood();
  }
};
