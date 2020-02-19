const faker = require("faker");

const generateProperty = () => {
  let randomVal = Math.random();
  let property = {
    body: {
      price: faker.fake("{{commerce.price}}") * 10 ** 4,
      beds: Math.ceil(Math.random() * 6),
      baths: Math.ceil(Math.random() * 7) / 2,
      sqft: faker.fake("{{random.number}}") % 2000,
      address: faker.fake("{{address.streetAddress}}"),
      zip: faker.fake("{{address.zipCode}}").substring(0, 5),
      city: faker.fake("{{address.city}}"),
      state: faker.fake("{{address.stateAbbr}}"),
      status:
        randomVal < 5 / 6
          ? "For sale"
          : randomVal < 11 / 12
            ? "For rent"
            : "Sold",
      tour_active: Math.random() < 0.85,
      owner_id: Math.floor(Math.random() * 1000000),
      agent_id: [Math.floor(Math.random() * 1000000)]
    }
  };
  return property;
};

const generateAgent = () => {
  let agent = {
    first_name: faker.fake("{{name.firstName}}"),
    last_name: faker.fake("{{name.lastName}}"),
    role: ['Recent sales', 'Listing agent'][0],
    phone: faker.fake("{{phone.phoneNumber}}"),
    profile_img: faker.fake("{{image.avatar}}"),
    reviews_count: Math.floor(Math.random() * 500),
    recent_sales: Math.floor(Math.random() * 10),
    property_id: [Math.floor(Math.random() * 1000000)]
  }
  return agent;
};

exports.module = {
  generateAgent,
  generateProperty
}