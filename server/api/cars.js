const router = require("express").Router();
const {
  models: { Car },
} = require("../db");
module.exports = router;

// Get all cars
router.get("/", async (req, res, next) => {
  try {
    const users = await Car.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get single car
router.get("/:id", async (req, res, next) => {
  try {
    const singleCar = await Car.findByPk(req.params.id);
    res.json(singleCar);
  } catch (err) {
    next(err);
  }
});

// Add new car listing
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Car.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update a car listing
router.put("/:id", async (req, res, next) => {
  try {
    const singleCar = await Car.findByPk(req.params.id);
    res.send(await singleCar.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a car listing
router.delete("/:id", async (req, res, next) => {
  try {
    const carToDelete = await Car.findByPk(req.params.id);
    await carToDelete.destroy();
    res.send(carToDelete);
  } catch (error) {
    next(error);
  }
});
