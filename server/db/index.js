const db = require('./db')

const User = require('./models/User')
const Car = require('./models/Car')
const Cart = require('./models/Cart')

Car.belongsTo(User)
User.hasMany(Car)
Cart.belongsTo(User)
Cart.hasMany(Car)

module.exports = {
  db,
  models: {
    User,
    Car,
    Cart,
  },
}
