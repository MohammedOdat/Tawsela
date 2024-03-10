const orderModel = require("../models/orders");
const nodemailer = require("nodemailer");
const createNewOrder = (req, res) => {
  const { provider, state, client, notes, units, location } = req.body;
  const order = new orderModel({
    provider,
    state,
    client,
    notes,
    units,
    location,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Order Created Successfully",
        order: result,
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
const getAllClientsOrders = (req, res) => {
  orderModel
    .find({ client: req.params.id })
    .populate("client", "firstName -_id")
    .populate("provider", "firstName -_id")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All ${req.params.id} Services `,
          services: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Orders",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};
const getAllProvidersOrders = (req, res) => {
  orderModel
    .find({ provider: req.params.id })
    .populate("client", "firstName phoneNumber -_id")
    .populate("provider", "firstName -_id")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All ${req.params.id} Services `,
          services: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Orders",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};
const deleteOrderById = (req, res) => {
  const id = req.params.id;
  orderModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Order With Id ${id} Not Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Order Deleted`,
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
const updateOrderById = (req, res, next) => {
  const update = req.body;
  const id = req.params.id;
  orderModel
    .findByIdAndUpdate(id, update,{new:true})
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Order With id ${id} Not Found`,
        });
      }

      if (result.state === "completed") {
       
        next();
      }
      res.status(200).json({
        success: true,
        message: "Order Updated",
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
const Notification = (req, res) => {
  const id = req.params.id;
  orderModel
    .find({ state: "pending", price: { $gt: 0 }, client: id })
    .populate("provider", "firstName -_id")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All orders `,
          orders: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Orders",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};
const getOrderById=(req,res)=>{
  const id= req.params.id
  orderModel.find({_id:id}) .then((result) => {
    if (result.length) {
      res.status(200).json({
        success: true,
        message: ` order `,
        orders: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No Orders",
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err,
    });
  });

}

module.exports = {
  createNewOrder,
  getAllClientsOrders,
  getAllProvidersOrders,
  deleteOrderById,
  updateOrderById,
  Notification,
  getOrderById
};
