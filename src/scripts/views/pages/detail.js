import RestaurantSource from "../../data/restaurant-data";
import UrlParser from "../../routes/url-parser";
import LikeButtonInitiator from "../../utils/like-button-initiator";
import "../templates/restaurant-detail";

const Detail = {
  async render() {
    return `
    <section id="food-details">
    </section>
  `;
  },
  async afterRender() {
    // Todo
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const data = await RestaurantSource.detailRestaurant(url.id);

    const foodDetail = document.querySelector("#food-details");
    const restaurantDetail = document.createElement("restaurant-detail");
    restaurantDetail.classList.add("restaurant-detail");
    restaurantDetail.restaurant = data.restaurant;
    foodDetail.appendChild(restaurantDetail);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector(".icon-favorite"),
      resto: {
        ...data.restaurant,
      },
    });
  },
};

export default Detail;
