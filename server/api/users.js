const router = require("express").Router();
const {
  models: { User },
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

router.put("/update/:id", requireToken, async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["name", "email", "dateOfBirth"],
    });
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      let users = await User.findAll({
        attributes: ["name", "email", "dateOfBirth"],
      });
      res.json(users);
    } else {
      return res.status(403).send("You shll not pass!");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      const userToDelete = await User.findByPk(req.params.id);
      await userToDelete.destroy();
      res.send(userToDelete);
    } else {
      return res.status(403).send("You shll not pass!");
    }
  } catch (error) {
    next(error);
  }
});
