const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    address: String,
    email: String,
    phone_number: String,
    purpose: String,
    meet: String,
    date_of_visit: Date,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
