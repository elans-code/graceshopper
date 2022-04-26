const router = require("express").Router();
const {
  models: { Car, User },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const userData = await User.findByToken(req.headers.authorization);
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

// Get all cars
router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      await Car.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
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
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      res.status(201).send(await Car.create(req.body));
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});

// Update a car listing
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      const singleCar = await Car.findByPk(req.params.id);
      res.send(await singleCar.update(req.body));
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});

// Delete a car listing
router.delete("/:id",requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      const carToDelete = await Car.findByPk(req.params.id);
      await carToDelete.destroy();
      res.send(carToDelete);
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});
