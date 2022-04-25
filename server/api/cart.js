const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    if (req.params.id) {
      const items = await Cart.findOne({
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

router.post("/:id", async (req, res, next) => {
  try {
    if (req.params.id) {
      const createCart = await Cart.create(req.body, {
        where: {
          userId: req.params.id,
        },
      });
      res.json(createCart);
    } else {
      res.send(window.localStorage.setItem("Cart", req.body));
    }
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
