const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  serviceType: { type: String },
  image: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);