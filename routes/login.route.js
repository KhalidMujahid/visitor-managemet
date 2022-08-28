// Admin login
const Admin = require("../models/Admin");

const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/auth/login", async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(401).send("Credentails are required");

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).send("Invalid Detials");
    }

    const passcode = await bcrypt.compare(password, admin.password);
    if (!passcode) {
      return res.status(401).send("Invalid Details");
    }

    return res.status(200).render("dashboard");
  } catch (error) {
    return res.status(501).send(error);
  }
});

module.exports = router;
