require('dotenv').config();
const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

console.log('ENV', process.env.NODE_ENV);

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'imotofix',
      user: 'postgres',
      password: '',
      host: 'localhost',
      port: 5432,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'dap4uqfje4aqkq',
      user: 'mwghvbemgapsho',
      password: 'a90b575775a2c996bcb6541ca027e51a6edeb471ca380d332bcdd372d7f14064',
      host: 'ec2-18-214-195-34.compute-1.amazonaws.com',
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
