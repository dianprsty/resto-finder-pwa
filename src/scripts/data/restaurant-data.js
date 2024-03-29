import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = response.json();
    return responseJson;
  }

  static async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    return response.json();
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}

export default RestaurantSource;
