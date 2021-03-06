# ZILLOW PRICING API DOCUMENTATION

endpoint: /properties

CREATE

Route: '/api/v1/properties/' will create a new property with price, beds, baths, sqft, address, zip, city, state, status, tour_active, and owner

READ

Route: '/api/v1/properties/:id' which will return a property.

Example: '/api/v1/properties/1' will return property listing of id 1.

UPDATE
// must be the owner of the property, 

Route: '/api/v1/properties/:id' updates an image/'.

Example: '/api/v1/properties/1' will update property listing of id 1.

DELETE

Route: '/api/v1/properties/:id' will delete listing of property if the owner_id.

Example: '/api/v1/properties/1' will delete property listing of id 1.


endpoint: /agents

CREATE

Route: '/api/v1/agents/' will create a new agent with first_name, last_name, phone_number, profile_img, reviews_count, recent_sales, property_id

READ

Route: '/api/v1/agents/:id' which will return an agent.

Example: '/api/v1/agents/1' will return agent listing of id 1.

UPDATE

Route: '/api/v1/agents/:id' updates an agent profile'.

Example: '/api/v1/agents/1' will update agent listing of id 1.

DELETE

Route: '/api/v1/agents/:id' will delete agent profile.

Example: '/api/v1/agents/1' will delete agent of id 1.
