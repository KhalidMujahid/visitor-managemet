const User = require("../models/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).render("index");
  } catch (error) {
    return res.status(501).send(error);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    return res.status(200).render("dashboard");
  } catch (error) {
    return res.status(501).send(error);
  }
});

router.get("/form", async (req, res) => {
  try {
    return res.status(200).render("form");
  } catch (error) {
    return res.status(501).send(error);
  }
});

router.get("/profile", async (req, res) => {
  try {
    return res.status(200).render("profile");
  } catch (error) {
    return res.status(501).send(error);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).render("edit", {
      user,
    });
  } catch (error) {
    return res.status(501).send(error);
  }
});

// search bar
router.get("/search", async (req, res) => {
  try {
    const visitor = await User.findOne({ phone_number: req.query.phone });
    return res.status(200).send(visitor);
  } catch (error) {
    return res.status(501).send("Not found!");
  }
});

module.exports = router;
