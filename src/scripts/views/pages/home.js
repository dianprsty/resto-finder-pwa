import RestaurantSource from "../../data/restaurant-data";
import "../templates/restaurant-card";

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
    const restaurants = await RestaurantSource.listRestaurant();

    const foodsGroup = document.querySelector(".foods-group");
    restaurants.forEach((resto) => {
      const restaurantCard = document.createElement("restaurant-card");
      restaurantCard.restaurant = resto;
      foodsGroup.appendChild(restaurantCard);
    });
  },
};

export default Home;
