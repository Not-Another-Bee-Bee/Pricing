const faker = require("faker");

const seedData = (total) => {
  for (let i = 0; i < total; i++) {
    let randomVal = Math.random();
    let property = {
      price: faker.fake("{{commerce.price}}") * 10 ** 4,
      bd: Math.ceil(Math.random() * 6),
      ba: Math.ceil(Math.random() * 7) / 2,
      sqft: faker.fake("{{random.number}}") % 2000,
      address:
        faker.fake(
          "{{address.streetAddress}} {{address.secondaryAddress}}, {{address.city}}, {{address.stateAbbr}}"
        ) +
        " " +
        faker.fake("{{address.zipCode}}").substring(0, 5),
      saleStatus:
        randomVal < 5 / 6
          ? "For sale"
          : randomVal < 11 / 12
          ? "For rent"
          : "Sold",
      tourButton: Math.random() < 0.85
    };
  }
};

exports.module = {
  seedData
};