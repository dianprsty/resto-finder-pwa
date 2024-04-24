import RestaurantSource from "../../data/restaurant-data";
import "../templates/restaurant-card";
import "../templates/loading-indicator";
import "../templates/refresh-button";

const Home = {
  async render() {
    let listSkeleton = "";
    for (let i = 0; i < 10; i += 1) {
      listSkeleton += `
      <article class="food-card">
        <div class="card-image skeleton">
        </div>
        <div class="card-body">
          <p class="skeleton skeleton-text"></p>
          <p class="skeleton skeleton-text-small"></p>
          <div class="food-description">
            <p class="skeleton skeleton-text"></p>
            <p class="skeleton skeleton-text"></p>
            <p class="skeleton skeleton-text"></p>
          </div>
          <p class="skeleton skeleton-button"></p>

        </div>
      </article>`;
    }
    return `
      <section class="hero">
        <picture>
          <source media="(max-width: 600px)"
            srcset="./images/heros/hero-small.jpg"
            type="image/jpg"
            crossorigin="anonymous">

          <img src='./images/heros/hero-large.jpg'
            alt="three cookies on the bowl and one cookie outside the bowl. there are yellow flowers and three slice lemon beside the bowl"
            crossorigin="anonymous"
            width=800px height=533px
            onerror="this.onerror=null;this.parentNode.children[0].srcset='./images/heros/hero.jpg';this.src='./images/heros/hero.jpg';"
          >
        </picture>
      </section>
      <section id="foods">
        <h1>Explore Restaurant</h1>
        <section class="foods-group">${listSkeleton}</section>
      </section>
  `;
  },
  async afterRender() {
    const foodsGroup = document.querySelector(".foods-group");
    const RefreshButton = document.createElement("refresh-button");
    RefreshButton.eventListener = () => {
      foodsGroup.removeChild(RefreshButton);
      this.afterRender();
    };

    try {
      const restaurants = await RestaurantSource.listRestaurant();
      foodsGroup.innerHTML = '';
      restaurants.forEach((resto) => {
        const restaurantCard = document.createElement("restaurant-card");
        restaurantCard.restaurant = resto;
        foodsGroup.appendChild(restaurantCard);
      });
    } catch (error) {
      foodsGroup.appendChild(RefreshButton);
    }
  },
};

export default Home;
