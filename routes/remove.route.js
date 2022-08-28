const User = require("../models/User");

const router = require("express").Router();

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        return res.status(200).send(" One Deleted");
      })
      .catch((error) => {
        return res.status(401).send(error);
      });
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
