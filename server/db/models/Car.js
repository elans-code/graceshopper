const Sequelize = require('sequelize')
const db = require('../db')


const Car = db.define('car', {
  year: { type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }},
    make: { type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }},
    model: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          }
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
              min: 0,
            }
            },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'https://bbts1.azureedge.net/images/p/full/2021/09/519b0886-cd08-4ae5-914f-95a499609911.jpg',
    }})


module.exports = Car
