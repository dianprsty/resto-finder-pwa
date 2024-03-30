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
    const foodDetail = document.querySelector("#food-details");

    const loadingIndicator = document.createElement("loading-indicator");
    const RefreshButton = document.createElement("refresh-button");
    RefreshButton.eventListener = () => {
      foodDetail.removeChild(RefreshButton);
      this.afterRender();
    };

    let restaurant;

    try {
      foodDetail.appendChild(loadingIndicator);
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const data = await RestaurantSource.detailRestaurant(url.id);

      restaurant = data.restaurant;
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

          const { customerReviews } = await RestaurantSource.addReview({
            id,
            name,
            review,
          });
          foodDetail.innerHTML = "";

          restaurant.customerReviews = customerReviews;

          this.renderDataToElement(restaurant);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      foodDetail.appendChild(RefreshButton);
    } finally {
      foodDetail.removeChild(loadingIndicator);
    }
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
