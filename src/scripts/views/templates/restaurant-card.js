import CONFIG from "../../globals/config";

class RestaurantCard extends HTMLElement {
  #restaurant;

  set restaurant(restaurant) {
    this.#restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `<article class="food-card" key=${this.#restaurant.id}>
    <div class="city-tag">
      <p>${this.#restaurant.city}</p>
    </div>
    <div class="card-image">
      <img
        class="lazyload" data-sizes="auto"
        data-src="${CONFIG.BASE_IMAGE_URL_SMALL + this.#restaurant.pictureId}"
        alt="image of ${this.#restaurant.name}"
        crossorigin="anonymous"
      />
    </div>
    <div class="card-body">
      <h2 class="food-name">${this.#restaurant.name}</h2>
      <p class="food-rating">
        <img class="star-rating" src="./images/icons/star-fiiled.svg" alt="star rating" crossorigin="anonymous" />
        ${this.#restaurant.rating}
      </p>
      <p class="food-description">
        ${this.#restaurant.description}
      </p>
      <a href="#/detail/${this.#restaurant.id}" class="btn-details" >
        See Details
      </a>
    </div>
  </article>`;
  }
}

customElements.define("restaurant-card", RestaurantCard);
