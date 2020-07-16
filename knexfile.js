require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DEV_CLINET_DB,
    connection: {
      database: process.env.DEV_DATABASE_DB,
      user: process.env.DEV_USERNAME_DB,
      password: process.env.DEV_PASSWORD_DB
    },
    migrations: {
      directory: __dirname + process.env.DEV_PATH_MIGRATIONS
    },
    seeds: {
      directory: __dirname + process.env.DEV_PATH_SEEDS
    }
  },
  test: {
    client: process.env.TEST_CLINET_DB,
    connection: {
      database: process.env.TEST_DATABASE_DB,
      user: process.env.TEST_USERNAME_DB,
      password: process.env.TEST_PASSWORD_DB
    },
    migrations: {
      directory: __dirname + process.env.TEST_PATH_MIGRATIONS
    },
    seeds: {
      directory: __dirname + process.env.TEST_PATH_SEEDS
    }
  },
  production: {
    client: process.env.PROD_CLINET_DB,
    connection: {
      database: process.env.PROD_DATABASE_DB,
      user: process.env.PROD_USERNAME_DB,
      password: process.env.PROD_PASSWORD_DB
    },
    migrations: {
      directory: __dirname + process.env.PROD_PATH_MIGRATIONS
    },
    seeds: {
      directory: __dirname + process.env.PROD_PATH_SEEDS
    }
  }
};
