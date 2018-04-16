exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.integer('owner_id').notNullable()
    table.string('title', 255).notNullable().defaultTo('')
    table.string('location', 255).notNullable().defaultTo('')
    table.dateTime('start_date_time').notNullable().defaultTo(knex.raw('now()'))
    table.integer('duration_minutes').notNullable().defaultTo(0)
    table.text('description').notNullable().defaultTo('')
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events')
}
\
