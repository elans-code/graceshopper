const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

// // Get all cars
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
