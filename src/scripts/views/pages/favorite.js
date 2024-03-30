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
    const restaurants = await FavoriteRestoIdb.getAllRestos();
    const foodsGroup = document.querySelector(".foods-group");

    const emptyFavoriteElement = document.createElement("p");
    emptyFavoriteElement.classList.add("empty-indicator");
    emptyFavoriteElement.innerText = "You don't have favorite restaurant yet!";

    if (restaurants.length === 0) {
      foodsGroup.appendChild(emptyFavoriteElement);
    }

    restaurants.forEach((resto) => {
      const restaurantCard = document.createElement("restaurant-card");
      restaurantCard.restaurant = resto;
      foodsGroup.appendChild(restaurantCard);
    });
  },
};

export default Favorite;
