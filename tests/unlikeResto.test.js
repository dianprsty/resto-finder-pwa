import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Unliking A Resto", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<button class="btn-favorite" id="btn-favorite">
        <img src="./images/icons/heart-outlined.svg"
          alt="favorite button" class="icon-favorite"
          id="icon-favorite"
          crossorigin="anonymous" />
      </button>`;
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto(1);
  });

  it("should display unlike widget when the resto has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this resto"]'),
    ).toBeTruthy();
  });

  it("should not display like widget when the resto has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this resto"]'),
    ).toBeFalsy();
  });

  it("should be able to remove liked resto from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
    document
      .querySelector('[aria-label="unlike this resto"]')
      .dispatchEvent(new Event("click"));
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });

  it("should not throw error when user click unlike widget if the unliked resto is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await FavoriteRestoIdb.deleteResto(1);

    document
      .querySelector('[aria-label="unlike this resto"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});
