import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const tables = ['bookings', 'communication', 'client', 'staff'];
  // Deletes ALL existing entries in ALL tables.
  //BRIANK - Be sure that the order of tables is consistent with the order of foreign key constraints
  tables.map(async (table) => {
    await knex(table).del();
  });
}
