const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const items = await Cart.findOne({
      where: {
        userId: req.params.id,
      },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    const updateCart = await Cart.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateCart);
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
