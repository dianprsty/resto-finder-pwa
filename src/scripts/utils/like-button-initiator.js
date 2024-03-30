const { default: FavoriteRestoIdb } = require("../data/favorite-resto-idb");

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await FavoriteRestoIdb.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.src = "./images/icons/heart-outlined.svg";

    const iconLike = document.getElementById("icon-favorite");
    const likeButton = document.getElementById("btn-favorite");
    iconLike.addEventListener("click", async () => {
      await FavoriteRestoIdb.putResto(this._resto);
      this._renderButton();
    });
    likeButton.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        await FavoriteRestoIdb.putResto(this._resto);
        this._renderButton();
      }
    });
  },

  _renderLiked() {
    this._likeButtonContainer.src = "./images/icons/heart-solid.svg";

    const iconLike = document.getElementById("icon-favorite");
    const likeButton = document.getElementById("btn-favorite");
    iconLike.addEventListener("click", async () => {
      await FavoriteRestoIdb.deleteResto(this._resto.id);
      this._renderButton();
    });

    likeButton.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        await FavoriteRestoIdb.deleteResto(this._resto.id);
        this._renderButton();
      }
    });
  },
};

export default LikeButtonInitiator;
