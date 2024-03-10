const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    serviceType,
    role,
  } = req.body;
  const user = new userModel({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    serviceType,
    role,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          author: result.firstName,
          role: result.role,
        };
        const options = { expiresIn: "7 days" };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const getUserByService = (req, res) => {
  userModel
    .find({ serviceType: req.body.serviceType })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the ${req.body.serviceType} users`,
          users: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No ${req.body.serviceType} users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};
const getAllUser = (req, res) => {
  userModel
    .find({})
    .populate("role", "role")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the users`,
          users: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};
const getUserByRole = (req, res) => {
  userModel
    .find({ role: req.params.id })
    .populate("role", "role")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the ${
            req.params.id === "6599007dc383021281e8c377" ? "Provider" : "Client"
          } users`,
          users: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No ${req.params.id} users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};
const deleteUserById = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `User With Id ${id} Not Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User Deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const checkUser = async (req, res) => {
  await res.status(200).json({
    success: true,
    info: req.token,
    image: req.image,
  });
};

const getUserById = (req, res) => {
  userModel
    .find({ _id: req.params.id })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "user Found",
          user: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `user not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};
const updateUserById = (req, res) => {
  const update = req.body;
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(id, update,{new:true})
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "user Updated",
        order: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};
module.exports = {
  register,
  login,
  getAllUser,
  getUserByRole,
  deleteUserById,
  checkUser,
  getUserByService,
  getUserById,
  updateUserById,
};
