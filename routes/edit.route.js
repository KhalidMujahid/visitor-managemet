const User = require("../models/User");

const router = require("express").Router();

router.post("/edit/new", async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone_number,
      purpose,
      meet,
      date_of_visit,
      status,
    } = req.body;

    const id = (await User.findOne({ email }))._id;

    await User.findByIdAndUpdate(
      { _id: id },
      {
        name,
        address,
        email,
        phone_number,
        purpose,
        meet,
        date_of_visit,
        status,
      },
      { new: true }
    )
      .then((data) => {
        return res.status(200).redirect("/dashboard");
      })
      .catch((error) => {
        return res.status(401).send(error);
      });
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
