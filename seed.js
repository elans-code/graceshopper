const { green, red, yellow } = require("chalk");
const { db } = require("./server/db");
const Car = require("./server/db/models/Car");
const User = require("./server/db/models/User");
const Order = require("./server/db/models/Order")
const Cart = require("./server/db/models/Cart")
const axios = require("axios")
const {convert} = require('html-to-text')


async function fetchRandomVehicle(){
  const upperApiLimit = 44290
  const selectedRandomVehicle = Math.floor(Math.random() * upperApiLimit)
  const colors = ['Blue','Green','Yellow','Orange','Red','white','Violet','Brown','Aqua','Black','Cyan','Purple']
  const {data:selectedCar} = await axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/${selectedRandomVehicle}`)
  const {data:carImage} = await axios.get(`http://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${selectedCar.year}%20${selectedCar.make}%20${selectedCar.model}`)
  const descriptions =[
    `Enjoy the fun and convenience of easy-to-park and easy-to-drive with this ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}. The ${selectedCar.make} ${selectedCar.model} is one of ${selectedCar.make}’s most famous offerings, and this one is in excellent condition. Easily access the ${selectedCar.make} ${selectedCar.model}'s trunk in the back of the car at the touch of a button. This ${selectedCar.make} ${selectedCar.model} drives like a dream.`,
    `A car that is sleek, stylish, and can get you from A to B. The ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} is a car that might just drive well and has a good amount of miles. This vehicle is a beauty inside and out.`,
    `For those just looking for a good time without compromising luxury and quality, the ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} gives you the best of both worlds. You’re getting a car that might drive well, has a good amount of miles, and has an interior and exterior that are just as beautiful as they are unique.`,
    `The ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} is a truly modern luxury car with an outstanding powertrain that offers an impressive amount of power, swift acceleration, and excellent fuel mileage. The aggressively styled exterior is highlighted by sharp lines and a wide and pointed radiator grille, as well as attractive 18-inch alloy wheels for a refined appearance.`,
    `The ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} a car that might drive well.`,
    `The ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.`,
    `The ${selectedCar.year} ${selectedCar.make} ${selectedCar.model} are a great value for their price and more importantly, are a Gasoline driven 4 wheeler. This vehicle has majestic design that includes its sleek trunk with peace sign stuck in it. ${selectedCar.make} ${selectedCar.model} is synonymous with luxury, technology and performance.`,
    `Introducing the ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}. This new ${selectedCar.make} creates all-new engineering, like our ground-breaking signature trim, dual-zone climate control and the ${selectedCar.make}Watch Plus security suite.`
  ]
  let carData = {
    year: selectedCar.year,
    make: selectedCar.make,
    model: selectedCar.model,
    color: colors[Math.floor(Math.random()*colors.length)],
    price: Math.floor(Math.random() * 100000),
    quantity: Math.ceil(Math.random()*25),
    description: descriptions[Math.floor(Math.random()*descriptions.length)],
    imageUrl: convert(carImage),
  }
  return carData
}
const cars = [];
async function populateCars(num){
  for(let i=0; i<num; i++){
    try {
      cars.push(await fetchRandomVehicle())
      if((i/num)==.25){
        console.log(green('Populating completion: 25%'))
      }else if((i/num)==.5){
        console.log(green('Populating completion: 50%'))
      }else if((i/num)==.75){
        console.log(green('Populating completion: 75%'))
      }
    } catch (error) {
      if(error.response.status === 404){
        try {
          console.log(yellow('Car not found trying another...'))
          cars.push(await fetchRandomVehicle())
        } catch (error) {
          if(error.response.status === 404){
            console.log(red('Error fetching from api please rerun the script...'))
            break
          }
        }
      }
    }
    
  }
}

const users = [
  {
    name: "Bob",
    email: "bsmith@gmail.com",
    password: "123456789",
    dateOfBirth: new Date("01/01/1950"),
    admin: true,
  },
  {
    name: "Mary",
    email: "msith@gmail.com",
    password: "123456789",
    dateOfBirth: new Date("01/01/1965"),
  },
  {
    name: "Joe",
    email: "Joe@gmail.com",
    password: "123456789",
    dateOfBirth: new Date("01/01/1965"),
  },
  {
    name: "popeye",
    email: "popeye@gmail.com",
    password: "123456789",
    dateOfBirth: new Date("01/01/1965"),
  },
  {
    name: "Amanda",
    email: "amanda@gmail.com",
    password: "123456789",
    dateOfBirth: new Date("01/01/1965"),
  },
];

const orders = [
  {
    item: "CAR PURCHASED",
    price: "2500",
  },
  {
    item: "OTHER CAR PURCHASED",
    price: "100",
  },
];

const carts = [
  {
    items: [{"item":{"id":14,"year":2007,"make":"Lamborghini","model":"Gallardo Spyder","color":"Yellow","description":"The 2007 Lamborghini Gallardo Spyder has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.","price":10136,"quantity":22,"imageUrl":"http://www.regcheck.org.uk/image.aspx/@MjAwNyBMYW1ib3JnaGluaSBHYWxsYXJkbyBTcHlkZXI=","createdAt":"2022-04-26T19:44:06.363Z","updatedAt":"2022-04-26T19:44:06.363Z","orderId":null},"quantity":1}],
    userId: 2,
  },
  {
    items: [{"item":{"id":14,"year":2007,"make":"Lamborghini","model":"Gallardo Spyder","color":"Yellow","description":"The 2007 Lamborghini Gallardo Spyder has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.","price":10136,"quantity":22,"imageUrl":"http://www.regcheck.org.uk/image.aspx/@MjAwNyBMYW1ib3JnaGluaSBHYWxsYXJkbyBTcHlkZXI=","createdAt":"2022-04-26T19:44:06.363Z","updatedAt":"2022-04-26T19:44:06.363Z","orderId":null},"quantity":4}],
    userId: 5,
  },
  {    
    items: [{"item":{"id":14,"year":2007,"make":"Lamborghini","model":"Gallardo Spyder","color":"Yellow","description":"The 2007 Lamborghini Gallardo Spyder has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.","price":10136,"quantity":22,"imageUrl":"http://www.regcheck.org.uk/image.aspx/@MjAwNyBMYW1ib3JnaGluaSBHYWxsYXJkbyBTcHlkZXI=","createdAt":"2022-04-26T19:44:06.363Z","updatedAt":"2022-04-26T19:44:06.363Z","orderId":null},"quantity":3}],
    userId: 4,
  },
  {
    items: [{"item":{"id":14,"year":2007,"make":"Lamborghini","model":"Gallardo Spyder","color":"Yellow","description":"The 2007 Lamborghini Gallardo Spyder has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.","price":10136,"quantity":22,"imageUrl":"http://www.regcheck.org.uk/image.aspx/@MjAwNyBMYW1ib3JnaGluaSBHYWxsYXJkbyBTcHlkZXI=","createdAt":"2022-04-26T19:44:06.363Z","updatedAt":"2022-04-26T19:44:06.363Z","orderId":null},"quantity":2}],
    userId: 3,
  },
  {
    items: [{"item":{"id":14,"year":2007,"make":"Lamborghini","model":"Gallardo Spyder","color":"Yellow","description":"The 2007 Lamborghini Gallardo Spyder has a sharp design with a lot of interior and exterior space. It's one of the best cars around, but it's not leaving the competition in the dust.","price":10136,"quantity":22,"imageUrl":"http://www.regcheck.org.uk/image.aspx/@MjAwNyBMYW1ib3JnaGluaSBHYWxsYXJkbyBTcHlkZXI=","createdAt":"2022-04-26T19:44:06.363Z","updatedAt":"2022-04-26T19:44:06.363Z","orderId":null},"quantity":5}],
    userId: 1,
  },
];

const seed = async () => {
  try {
    console.log('Populating cars from api ',red('!!( api is free so you will have bad images requests are limited)!!'))
    await populateCars(100);
    console.log(green('Finished populating cars'))
    await db.sync({ force: true });

    await Promise.all(
      cars.map((car) => {
        return Car.create(car);
      })
    );
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      carts.map((cart) => {
        return Cart.create(cart);
      })
    );
    await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );

    console.log(green("Inital seeding success!"));
    db.close();
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
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
