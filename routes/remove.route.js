const User = require("../models/User");

const router = require("express").Router();

router.get("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id }, { new: true })
      .then(() => {
        return res.status(301).redirect("/dashboard");
      })
      .catch((error) => {
        return res.status(401).send(error);
      });
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
