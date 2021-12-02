import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tblLookupLangauges', (table) => {
      table.increments('Id').primary();
      table.string('description').notNullable();
    })
    .createTable('tblLookupRaces', (table) => {
      table.increments('Id').primary();
      table.string('description').notNullable();
    })
    .createTable('tblLookupGenders', (table) => {
      table.increments('Id').primary();
      table.string('description').notNullable();
    })
    .createTable('tblLookupUserTypes', (table) => {
      table.increments('Id').primary();
      table.string('description').notNullable();
    })
    .createTable('tblLookupBookingStatus', (table) => {
      table.increments('Id').primary();
      table.string('description').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('tblLookupLangauges')
    .dropTable('tblLookupRaces')
    .dropTable('tblLookupGenders')
    .dropTable('tblLookupUserTypes')
    .dropTable('tblLookupBookingStatus');
}
