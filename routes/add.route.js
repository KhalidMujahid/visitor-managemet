const User = require("../models/User");

// Add new Visitor
const router = require("express").Router();

router.post("/add/new", async (req, res) => {
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

    if (
      !name ||
      !address ||
      !email ||
      !phone_number ||
      !purpose ||
      !meet ||
      !date_of_visit ||
      !status
    )
      return res.status(401).send("Credentails are required");

    const newUser = new User({
      name,
      address,
      email,
      phone_number,
      purpose,
      meet,
      date_of_visit,
      status,
    });

    newUser.save();

    if (newUser) {
      return res.status(200).send("Account Added!");
    } else {
      return res.status(401).send("Error occured");
    }
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
