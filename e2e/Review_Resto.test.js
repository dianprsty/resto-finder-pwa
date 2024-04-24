const assert = require("assert");

Feature("Review Resto");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("showing resto detail page", async ({ I }) => {
  I.seeElement(".food-card");

  const totalResto = await I.grabNumberOfVisibleElements(".food-card");
  const restoIndex = Math.ceil(Math.random() * totalResto);

  const choosenRestoNameElement = locate(".food-name").at(restoIndex);
  const choosenRestoName = await I.grabTextFrom(choosenRestoNameElement);

  const choosenRestoDetailButton = locate(".food-card a").at(restoIndex);
  I.click(choosenRestoDetailButton);

  I.seeElement(".restaurant-detail");
  I.dontSeeElement(".refresh-button");
  I.see(choosenRestoName, ".food-name");
});

Scenario("give review to a resto", async ({ I }) => {
  I.seeElement(".food-card");

  const totalResto = await I.grabNumberOfVisibleElements(".food-card");
  const restoIndex = Math.ceil(Math.random() * totalResto);

  const choosenRestoNameElement = locate(".food-name").at(restoIndex);
  const choosenRestoName = await I.grabTextFrom(choosenRestoNameElement);

  const choosenRestoDetailButton = locate(".food-card a").at(restoIndex);
  I.click(choosenRestoDetailButton);

  I.seeElement(".restaurant-detail");
  I.dontSeeElement(".refresh-button");
  I.see(choosenRestoName, ".food-name");
  I.seeElement(".review-form-container");

  const stringTimeStamp = Date.now().toString();
  const customerName = `Name ${stringTimeStamp}`;
  const customerReview = `${choosenRestoName} is very good ${stringTimeStamp}`;

  I.fillField("name", customerName);
  I.fillField("review", customerReview);
  I.click("#submit-button");

  I.see(customerName, ".customer-name");
  I.see(customerReview, ".review-content");
});
