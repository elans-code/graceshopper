const Sequelize = require('sequelize')
const db = require('./database.js')


const Cart = db.define('cart', {
  item: { type: Sequelize.STRING,
    },
  price: { type: Sequelize.INTEGER,
      },
  numberOfCars: { type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          notEmpty: true,
          min: 0,
        }},
  })


    module.exports = Cart
