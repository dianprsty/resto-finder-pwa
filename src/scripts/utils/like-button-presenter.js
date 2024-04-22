const { default: FavoriteRestoIdb } = require("../data/favorite-resto-idb");

const LikeButtonPreseter = {

  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLikedRestoButton();
    } else {
      this._renderNotLikedRestoButton();
    }
  },

  async _isRestoExist(id) {
    const resto = await FavoriteRestoIdb.getResto(id);
    return !!resto;
  },

  _renderNotLikedRestoButton() {
    this._likeButtonContainer.setAttribute("aria-label", "like this resto");
    this._likeButtonContainer.firstElementChild.setAttribute("src", "./images/icons/heart-outlined.svg");

    this._likeButtonContainer.addEventListener("click", async () => {
      await FavoriteRestoIdb.putResto(this._resto);
      this._renderButton();
    });
    this._likeButtonContainer.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        await FavoriteRestoIdb.putResto(this._resto);
        this._renderButton();
      }
    });
  },

  _renderLikedRestoButton() {
    this._likeButtonContainer.setAttribute("aria-label", "unlike this resto");
    this._likeButtonContainer.firstElementChild.setAttribute("src", "./images/icons/heart-solid.svg");

    this._likeButtonContainer.addEventListener("click", async () => {
      await FavoriteRestoIdb.deleteResto(this._resto.id);
      this._renderButton();
    });

    this._likeButtonContainer.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        await FavoriteRestoIdb.deleteResto(this._resto.id);
        this._renderButton();
      }
    });
  },
};

export default LikeButtonPreseter;
