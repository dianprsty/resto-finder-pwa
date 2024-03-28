import FavoriteRestoIdb from "../../data/favorite-resto-idb";
import "../templates/restaurant-card";

const Favorite = {
  async render() {
    return `
    <section id="foods">
      <h1>Favorite Restaurant</h1>
      <section class="foods-group"></section>
    </section>
  `;
  },
  async afterRender() {
    // Todo
    const restaurants = await FavoriteRestoIdb.getAllRestos();
    console.log(restaurants);
    const foodsGroup = document.querySelector(".foods-group");

    restaurants.forEach((resto) => {
      const restaurantCard = document.createElement("restaurant-card");
      restaurantCard.restaurant = resto;
      foodsGroup.appendChild(restaurantCard);
    });
  },
};

export default Favorite;
