const { green, red } = require("chalk");
const { db } = require("./server/db");
const Car = require("./server/db/models/Car")
const User = require("./server/db/models/User")

const cars = [{
  year: '2022',
  make: 'Toyota',
  model: 'Camry',
  color: 'black',
  description: "good car",
  price: '25395',
  quantity: '2',
  imageUrl: 'https://media-service.carmax.com/img/vehicles/22237567/1_cleaned.jpg?width=800'


}, {
  year: '1990',
  make: 'Ferrari',
  model: 'Testarossa',
  color: 'red',
  description: "good car",
  price: '150000',
  quantity: '1',
  imageUrl: 'https://www.supercars.net/blog/wp-content/uploads/2020/10/1990_ferrari_testarossa_1602079317b225e2589d78f41990_ferrari_testarossa_1601823305208495d5614f88edf-c282-4a34-8bef-60af03320f23-7GHiKL-1.jpg'

},];

const users = [{
  name: 'Bob Smith',
  email: 'bsmith@gmail.com',
  password: '123456789',
  dateOfBirth: '01/01/1950',
},
{
  name: 'Mary Smith',
  email: 'msith@gmail.com',
  password: '123456789',
  dateOfBirth: '01/01/1965',
},];


const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(cars.map(car => {
      return Car.create(car);
    }));
    await Promise.all(users.map(user => {
      return User.create(user);
    }));

    console.log(green('Seeding success!'))
    db.close()
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
