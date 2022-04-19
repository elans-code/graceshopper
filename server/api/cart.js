const router = require("express").Router();
const {
  models: { User },
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
