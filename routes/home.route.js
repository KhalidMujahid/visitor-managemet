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

module.exports = router;
