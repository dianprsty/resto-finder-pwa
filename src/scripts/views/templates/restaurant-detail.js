import CONFIG from "../../globals/config";

class RestaurantDetail extends HTMLElement {
  #restaurant;

  set restaurant(restaurant) {
    this.#restaurant = restaurant;
    this.render();
  }

  renderCategories() {
    let categoryList = "";
    this.#restaurant.categories.forEach((category) => {
      categoryList += `<p class='category-pill'>${category.name}</p>`;
    });
    return categoryList;
  }

  renderFoods() {
    let foodList = "";
    this.#restaurant.menus.foods.forEach((food) => {
      foodList += `<p class='menu-item'>${food.name}</p>`;
    });
    return foodList;
  }

  renderDrinks() {
    let drinkList = "";
    this.#restaurant.menus.drinks.forEach((drink) => {
      drinkList += `<p class='menu-item'>${drink.name}</p>`;
    });
    return drinkList;
  }

  inputGroupCreator(fieldType, fieldAbout) {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = fieldAbout;
    label.innerHTML = fieldAbout.toUpperCase();

    let input;
    if (fieldType === "input") {
      input = document.createElement("input");
      input.type = "text";
      input.name = fieldAbout;
      input.id = fieldAbout;
      input.required = true;
    }

    if (fieldType === "textarea") {
      input = document.createElement("textarea");
      input.name = fieldAbout;
      input.id = fieldAbout;
      input.required = true;
      input.rows = 4;
    }

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    return inputGroup;
  }

  renderForms(id) {
    const inputName = this.inputGroupCreator("input", "name");
    const inputReview = this.inputGroupCreator("textarea", "review");
    const button = document.createElement("button");
    button.innerText = "Send Review";
    button.type = "submit";
    const idInput = document.createElement("input");
    idInput.value = id;
    idInput.type = "hidden";

    const form = document.createElement("form");
    form.id = "submit-review";

    form.appendChild(inputName);
    form.appendChild(inputReview);
    form.appendChild(idInput);
    form.appendChild(button);

    return form.outerHTML;
  }

  renderReviews() {
    let reviewList = "";
    this.#restaurant.customerReviews.reverse().forEach((review) => {
      reviewList += `<div class="review-card">
        <div class="profile-picture">
          <img src="./images/user_placeholder.avif" alt="customer ${review.name}" >
        </div>
        <div class="review-detail">
          <p class="customer-name">${review.name}</p>
          <p class="review-date">${review.date}</p>
          <p class="review-content">${review.review}</p>
        </div>
      </div>`;
    });
    return reviewList;
  }

  render() {
    this.innerHTML = `<div class="left">
          <img src="${
  CONFIG.BASE_IMAGE_URL_LARGE + this.#restaurant.pictureId
}" alt="${this.#restaurant.name}" />
          <div class="food-info">
            <button class="btn-favorite">
              <img src="./images/icons/heart-outlined.svg" alt="favorite button" class="icon-favorite" />
            </button>
            <p class="food-rating">
              <img
                class="star-rating"
                src="./images/icons/star-fiiled.svg"
                alt="star rating"
              />
              ${this.#restaurant.rating}
            </p>
            <p class="city-tag">${this.#restaurant.city}</p>
          </div>
        </div>
        <div class="right">
          <h1 class="food-name">${this.#restaurant.name}</h1>
          <div class="category-container">${this.renderCategories()}</div>
          <p class="food-address">Address : ${this.#restaurant.address}
          <p class="food-description">${this.#restaurant.description}
          </p>
        </div>
        <div class="menu-container">
          <h2 class="menu-title">Restaurant Menus</h2>
          <div class="foods-menu">
          <h3>Foods</h3>
          ${this.renderFoods()}
          </div>
          <div class="drinks-menu">
          <h3>Drinks</h3>
          ${this.renderDrinks()}</div>
        </div>
        <div class="review-container">
          <div class="review-form">
            <h2>Post a Review</h2>
            <div class="review-form-container">
            ${this.renderForms(this.#restaurant.id)}</div>
          </div>
          <div class="review-list">
            <h2>Customers Review</h2>
            ${this.renderReviews()}
          </div>
        </div>
        `;
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
