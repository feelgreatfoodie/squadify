exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_user', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.integer('event_id').notNullable().references('event.id').onDelete('CASCADE');
    table.integer('user_id').notNullable().references('user.id').onDelete('CASCADE');
    //table.timestamps(true, true)
    // OR
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('event_user')
}