import CONFIG from "../../globals/config";

class RestaurantDetail extends HTMLElement {
  #restaurant;

  set restaurant(restaurant) {
    this.#restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `<div class="left">
          <img src="${CONFIG.BASE_IMAGE_URL_LARGE + this.#restaurant.pictureId}" alt="${this.#restaurant.name}" />
          <div class="food-info">
            <button class="btn-favorite">
              <img src="./images/icons/heart-outlined.svg" alt="favorite button" class="icon-favorite" />
            </button>
            <p class="food-rating">
              <img
                class="star-rating"
                src="./images/icons/star-fiiled.svg"
                alt="star rating"
              />
              ${this.#restaurant.rating}
            </p>
            <p class="city-tag">${this.#restaurant.city}</p>
          </div>
        </div>
        <div class="right">
          <p class="food-name">${this.#restaurant.name}</p>
          <p class="food-description">${this.#restaurant.description}
          </p>
        </div>`;
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
