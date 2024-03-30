import RestaurantSource from "../../data/restaurant-data";
import "../templates/restaurant-card";
import "../templates/loading-indicator";
import "../templates/refresh-button";

const Home = {
  async render() {
    return `
      <section class="hero">
        <img
          src="./images/heros/hero-image_4.jpg"
          alt="three cookies on the bowl and one cookie outside the bowl. there are yellow flowers and three slice lemon besade the bowl"
        />
      </section>
      <section id="foods">
        <h1>Explore Restaurant</h1>
        <section class="foods-group"></section>
      </section>
  `;
  },
  async afterRender() {
    const foodsGroup = document.querySelector(".foods-group");
    const loadingIndicator = document.createElement("loading-indicator");
    const RefreshButton = document.createElement("refresh-button");
    RefreshButton.eventListener = () => {
      foodsGroup.removeChild(RefreshButton);
      this.afterRender();
    };

    try {
      foodsGroup.appendChild(loadingIndicator);
      const restaurants = await RestaurantSource.listRestaurant();

      restaurants.forEach((resto) => {
        const restaurantCard = document.createElement("restaurant-card");
        restaurantCard.restaurant = resto;
        foodsGroup.appendChild(restaurantCard);
      });
    } catch (error) {
      foodsGroup.appendChild(RefreshButton);
    } finally {
      foodsGroup.removeChild(loadingIndicator);
    }
  },
};

export default Home;
