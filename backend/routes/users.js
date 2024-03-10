const express = require("express");
const {
  register,
  checkUser,
  login,
  getAllUser,
  getUserByRole,
  deleteUserById,
  getUserByService,
  getUserById,
  updateUserById,
} = require("../controllers/users");
const authentication = require("../middleware/authentication");
const cors = require("cors");
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", getAllUser);
usersRouter.get("/check", authentication, checkUser);
usersRouter.get("/:id", getUserByRole);
usersRouter.delete("/:id", deleteUserById);
usersRouter.post("/service", getUserByService);
usersRouter.get("/user/:id", authentication, getUserById);
usersRouter.put("/:id", authentication, updateUserById);
module.exports = usersRouter;
