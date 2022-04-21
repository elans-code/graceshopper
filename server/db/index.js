const db = require('./db')

const User = require('./models/User')
const Car = require('./models/Car')
const Cart = require('./models/Cart')
// const Order = require('./models/Order')

Car.belongsTo(User)
User.hasMany(Car)
Cart.belongsTo(User)
Cart.hasMany(Car)
Cart.belongsToMany(Car, { through: 'order' });
Car.belongsToMany(Cart, { through: 'order' });

module.exports = {
  db,
  models: {
    User,
    Car,
    Cart,
  },
}
