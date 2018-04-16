exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('first_name', 255).notNullable().defaultTo('')
    table.string('last_name', 255).notNullable().defaultTo('')
    table.string('email_address', 255).notNullable().defaultTo('')
    table.specificType('hashed_password', "char(60)").notNullable()
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user')
}