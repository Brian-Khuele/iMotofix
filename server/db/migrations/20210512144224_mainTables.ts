import * as Knex from 'knex';

const onUpdateTrigger = (table: any) => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('staff', (table) => {
      table.increments('Id').primary();
      table.string('First_Name').notNullable();
      table.string('Last_Name').notNullable();
      table.string('Id_Number').unique().notNullable();
      table.string('Contact_Number').unique();
      table.string('Email').unique();
      table.string('User_Name');
      table.string('Password');
      table.string('Street_Number');
      table.string('Surburb');
      table.string('City');
      table.string('Province');
      table.string('PostalCode');
      table.integer('User_Type').defaultTo(1).references('Id').inTable('tblLookupUserTypes'); //1 = Mechanic, 2= Sales rep
      table.timestamps(true, true);
    })
    .createTable('client', (table) => {
      table.increments('Id').primary();
      table.string('First_Name').notNullable();
      table.string('Last_Name').notNullable();
      table.string('Id_Number').unique().notNullable();
      table.string('Contact_Number').unique();
      table.string('Email').unique();
      table.string('UserName');
      table.string('Password');
      table.string('StreetNumber');
      table.string('Surburb');
      table.string('City');
      table.string('Province');
      table.string('PostalCode');
      table.timestamps(true, false);
    })
    .createTable('communication', (table) => {
      table.increments('Id').primary();
      table.string('Recipient').notNullable().defaultTo('All');
      table.string('Message').notNullable();
      table.timestamps(true, true);
    })
    .createTable('bookings', (table) => {
      table.increments('Id').primary();
      table.string('Client_Id').notNullable().references('Id_Number').inTable('client');
      table.dateTime('Booking_In_Date');
      table.string('Car_Make').notNullable();
      table.string('Car_Model').notNullable();
      table.string('Car_Year').notNullable();
      table.string('Car_VIN').notNullable();
      table.dateTime('Book_Out_Date');
      table.integer('Booked_In_By').references('Id').inTable('staff');
      table.integer('Booked_Out_By').references('Id').inTable('staff');
      table.string('Work_Description'); //work to be done. Service, part replacement etc...
      table.string('Mechanic_Comment');
      table.string('Amount_Quoted');
      table.string('BookIn_InspectionNotes');
      table.string('BookOut_InspectionNotes');
      table.string('BelongingsNotes');
      //table.integer('BookingStage').defaultTo(1).references('Id').inTable('tblLookupBookingStatus'); // 0 = Pending, 1 = Active, 2 = Complete
      //table.integer('Comms_Id').references('Id').inTable('communication');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('bookings')
    .dropTable('communication')
    .dropTable('client')
    .dropTable('staff');
}
