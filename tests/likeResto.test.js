import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking A Resto", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<button class="btn-favorite" id="btn-favorite">
      <img src="./images/icons/heart-outlined.svg"
        alt="favorite button" class="icon-favorite"
        id="icon-favorite"
        crossorigin="anonymous" />
    </button>`;
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should show the like button when the resto has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this resto"]'),
    ).toBeTruthy();
  });

  it("should not show the unlike button when the resto has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this movie"]'),
    ).toBeFalsy();
  });

  it("should be able to like the resto", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector(".btn-favorite").dispatchEvent(new Event("click"));

    const resto = await FavoriteRestoIdb.getResto(1);
    expect(resto).toEqual({ id: 1 });

    await FavoriteRestoIdb.deleteResto(1);
  });

  it("should not add a resto again when its already liked", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await FavoriteRestoIdb.putResto({ id: 1 });

    document.querySelector(".btn-favorite").dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([{ id: 1 }]);

    await FavoriteRestoIdb.deleteResto(1);
  });

  it("should not add a resto when it has no id", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ });

    document.querySelector(".btn-favorite").dispatchEvent(new Event("click"));
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});
