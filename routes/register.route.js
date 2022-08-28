// Register page
const Admin = require("../models/Admin");

const router = require("express").Router();
const bcrypt = require("bcrypt");

// Get sign up page
router.get("/signup", async (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (error) {
    return res.status(501).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(401).send("Credentials are required");

    const hashedPassword = await bcrypt.hash(password, 13);

    const newUser = new Admin({
      username,
      password: hashedPassword,
    });

    newUser.save();

    if (newUser) {
      return res.status(200).send("Account created!");
    } else {
      return res.status(401).send("Error occured please try again later");
    }
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
