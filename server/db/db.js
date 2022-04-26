const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

console.log(chalk.yellow("Opening database connection"));

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`,
  config
);

module.exports = db;
