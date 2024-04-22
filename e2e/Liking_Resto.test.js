const assert = require("assert");

Feature("Liking Resto");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restos", ({ I }) => {
  I.seeElement(".empty-indicator");
  I.see("You don't have favorite restaurant yet!", ".empty-indicator");
});

Scenario("liking one resto", async ({ I }) => {
  I.seeElement(".empty-indicator");
  I.see("You don't have favorite restaurant yet!", ".empty-indicator");

  I.amOnPage("/");
  I.waitForElement(".food-name", 5);
  I.seeElement(".food-card");

  const firstRestoNameElement = locate(".food-name").first();
  const fisrtRestoNameText = await I.grabTextFrom(firstRestoNameElement);

  const firstRestoDetailButton = locate(".food-card a").first();
  I.click(firstRestoDetailButton);

  I.waitForElement("#btn-favorite", 5);
  I.seeElement("#btn-favorite");
  I.click("#btn-favorite");

  I.amOnPage("/#/favorite");
  I.dontSee("You don't have favorite restaurant yet!");
  I.seeElement(".food-card");
  const LikedRestoName = await I.grabTextFrom(".food-name");

  assert.strictEqual(fisrtRestoNameText, LikedRestoName);
});

Scenario("unliking one resto", async({ I }) => {
  I.seeElement(".empty-indicator");
  I.see("You don't have favorite restaurant yet!", ".empty-indicator");

  I.amOnPage("/");
  I.seeElement(".food-card");

  const firstRestoDetailButton = locate(".food-card a").first();
  I.click(firstRestoDetailButton);

  I.waitForElement("#btn-favorite", 5);
  I.seeElement("#btn-favorite");
  I.click("#btn-favorite");

  I.amOnPage("/#/favorite");
  I.dontSee("You don't have favorite restaurant yet!");
  I.seeElement(".food-card");

  const likedRestoNameElement = locate(".food-name").first();
  const likedRestoName = await I.grabTextFrom(likedRestoNameElement);

  const likedRestoDetailButton = locate(".food-card a").first();
  I.click(likedRestoDetailButton);

  I.waitForElement(".food-name", 5);
  I.see(likedRestoName, ".food-name");
  I.seeElement("#btn-favorite");
  I.click("#btn-favorite");

  I.amOnPage("/#/favorite");
  I.dontSee(likedRestoName);
});
