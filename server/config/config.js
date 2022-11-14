require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    username: "postgres",
    password: "123",
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.PROD_DATABASE_URL,
    database: "aevirfyw",
    username: "aevirfyw",
    password: "e_fSdtEpJ5QXWatFUz9pgAY0pJfFryIo",
    dialect: "postgres",
  },
};
