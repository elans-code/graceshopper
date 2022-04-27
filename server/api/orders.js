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
    const orders = await Order.findAll({
      where: {
      userId: req.params.id,
     },
   });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {

  try {

      const createOrder = await Order.create({item: req.body.item, quantity: req.body.quantity, price: req.body.price, userId: req.body.userId })

    res.json(createOrder);
  } catch (error) {
    next(error);
  }
});
