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
    const { restaurant } = await RestaurantSource.detailRestaurant(url.id);

    this.renderDataToElement(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector(".icon-favorite"),
      resto: {
        ...restaurant,
      },
    });

    const submitReviewForm = document.getElementById("submit-review");
    submitReviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const name = event.target[0].value;
        const review = event.target[1].value;
        const id = event.target[2].value;

        const { customerReviews } = await RestaurantSource.addReview({ id, name, review });
        const foodDetail = document.querySelector("#food-details");
        foodDetail.innerHTML = "";

        restaurant.customerReviews = customerReviews;

        this.renderDataToElement(restaurant);
      } catch (error) {
        console.log(error);
      }
    });
  },

  renderDataToElement(restaurant) {
    const foodDetail = document.querySelector("#food-details");
    const restaurantDetail = document.createElement("restaurant-detail");
    restaurantDetail.classList.add("restaurant-detail");
    restaurantDetail.restaurant = restaurant;
    foodDetail.appendChild(restaurantDetail);
  },
};

export default Detail;
