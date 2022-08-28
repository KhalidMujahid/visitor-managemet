const User = require("../models/User");

const router = require("express").Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
