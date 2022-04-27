const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    if (req.params.id) {
      const items = await Cart.findAll({
        where: {
          userId: req.params.id,
        },
      });
      res.json(items);
    } else {
      res.send(window.localStorage.getItem("Cart", req.body));
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let newItems = req.body ?? null
    const query = await Cart.upsert({items: newItems, userId: req.params.id})
    res.status(200).send();
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
