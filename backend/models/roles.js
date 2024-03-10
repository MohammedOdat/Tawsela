const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String }],
});
module.exports = mongoose.model("Role", roleSchema);
