const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

// Get all cars
router.get("/:id", async (req, res, next) => {
  try {
    const items = await Cart.findByPk(req.params.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const singleUser = await User.findByPk(req.params.id);
//     res.json(singleUser);
//   } catch (err) {
//     next(err);
//   }
// });
