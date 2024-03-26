import RestaurantSource from "../../data/restaurant-data";
import UrlParser from "../../routes/url-parser";

const Detail = {
  async render() {
    return `
    <section id="food-details">
      <div class="left">
        <img src="xxx{restaurant.pictureId}" alt="xxx{restaurant.name}" />
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
            xxx{restaurant.rating}
          </p>
          <p class="city-tag">xxx{restaurant.city}</p>
        </div>
      </div>
      <div class="right">
        <p class="food-name">xxx{restaurant.name}</p>
        <p class="food-description">xxx{restaurant.description}
        </p>
      </div>
    </section>
  `;
  },
  async afterRender() {
    // Todo
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    console.log(restaurant);
  },
};

export default Detail;
