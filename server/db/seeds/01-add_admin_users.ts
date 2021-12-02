import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  await knex('tblLookupUserTypes').del();
  await knex('tblLookupLangauges').del();
  await knex('tblLookupRaces').del();
  await knex('tblLookupGenders').del();
  await knex('tblLookupBookingStatus').del();
  await knex('staff').del();

  await knex('tblLookupUserTypes').insert([
    {
      description: 'Admin',
    },
  ]);

  await knex('tblLookupLangauges').insert([
    {
      description: 'TshiVenda',
    },
    {
      description: 'XiTsonga',
    },
    {
      description: 'SePedi',
    },
    {
      description: 'SeSotho',
    },
    {
      description: 'SeTswana',
    },
    {
      description: 'IsiXhosa',
    },
    {
      description: 'IsiZulu',
    },
    {
      description: 'English',
    },
    {
      description: 'Afrikaans',
    },
    {
      description: 'Swati',
    },
    {
      description: 'Ndebele',
    },
  ]);

  await knex('tblLookupRaces').insert([
    {
      description: 'Black',
    },
    {
      description: 'Coloured',
    },
    {
      description: 'Indian',
    },
    {
      description: 'White',
    },
  ]);

  await knex('tblLookupGenders').insert([
    {
      description: 'Male',
    },
    {
      description: 'Female',
    },
    {
      description: 'Other',
    },
  ]);

  await knex('tblLookupBookingStatus').insert([
    {
      description: 'Received',
    },
    {
      description: 'In-service',
    },
    {
      description: 'Final CheckUp',
    },
    {
      description: 'Released',
    },
    {
      description: 'On Hold',
    },
  ]);

  // Inserts seed entries
  await knex('staff').insert([
    {
      First_Name: 'admin',
      Last_Name: 'admin',
      Id_Number: '1000',
      User_Name: 'admin',
      Password: 'admin123',
    },
  ]);
}
