const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  item: { type: Sequelize.TEXT,
    },
    quantity: { type: Sequelize.INTEGER,
    },
  price: { type: Sequelize.INTEGER,
      },
  // numberOfCars: { type: Sequelize.INTEGER,
  //       defaultValue: 0,
  //       validate: {
  //         notEmpty: true,
  //         min: 0,
  //       }},
  })


    module.exports = Order
