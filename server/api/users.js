const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// async function requireToken(req, res, next) {
//   try {
//     const userData = await User.findByToken(req.headers.authorization);
//     req.user = userData;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
// router.get("/", requireToken, async (req, res, next) => {
//   try {
//     res.send(req.user);
//   } catch (ex) {
//     next(ex);
//   }
// });

router.put('/update/:id', async (req, res, next) => {
  try {
      await User.update(req.body, {
          where: {
              id: req.params.id,
          }
      })
      res.sendStatus(200);
  } catch (error) {
      next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    let users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
