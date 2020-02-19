exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('properties', (t) => {
      t.increments('pid').primary();
      t.integer('price');
      t.integer('beds');
      t.integer('baths');
      t.integer('sqft');
      t.integer('address');
      t.string('zip');
      t.string('city');
      t.string('state');
      t.string('status');
      t.boolean('tour_active');
      t.specificType('agent_id', 'INT[]')
    }),
    knex.schema.createTable('agents', (t) => {
      t.increments('aid').primary();
      t.string('first_name');
      t.string('last_name');
      t.string('phone');
      t.string('profile_img');
      t.integer('reviews_count');
      t.integer('recent_sales');
      t.specificType('property_id', 'INT[]')
    })
  ])
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('properties'),
    knex.schema.dropTable('agents')
  ]);
};
