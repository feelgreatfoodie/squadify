exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('first_name', 255).notNullable().defaultTo('')
    table.string('last_name', 255).notNullable().defaultTo('')
    table.string('email_address', 255).notNullable().defaultTo('')
    table.specificType('hashed_password', "char(60)").notNullable()
    table.string('user_image_url', 255).defaultTo('https://placeimg.com/80/120/nature')
    table.string('about_user', 255).defaultTo('I like the outdoors and going on adventures with friends!')
    table.string('github', 255).defaultTo('')
    table.string('linkedIn', 255).defaultTo('')
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
