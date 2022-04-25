const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  items: { type: Sequelize.JSON },
  price: { type: Sequelize.INTEGER },
  numberOfCars: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
});

module.exports = Cart;
