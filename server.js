const express = require("express");
const PORT = process.env.PORT || 3009;
const app = express();
const mongoose = require("mongoose");


// connect DB
mongoose
  .connect("mongodb://localhost/VMS")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use("/", require("./routes/home.route"));
app.use("/", require("./routes/login.route"));
app.use("/", require("./routes/register.route"));
app.use("/", require("./routes/remove.route"));
app.use("/", require("./routes/users.route"));
app.use("/", require("./routes/add.route"));
app.use("/", require("./routes/edit.route"));

app.listen(PORT, () => console.log("Server running on port ", PORT));
