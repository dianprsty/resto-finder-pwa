import RestaurantSource from "../../data/restaurant-data";

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
    // Todo
    const restaurants = await RestaurantSource.listRestaurant();
    console.log(restaurants);
  },
};

export default Home;
