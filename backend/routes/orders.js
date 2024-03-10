const express = require("express");
const { sendEmail } = require("../controllers/nodemiler");
const {
  createNewOrder,
  getAllClientsOrders,
  getAllProvidersOrders,
  deleteOrderById,
  updateOrderById,
  Notification,
  getOrderById
} = require("../controllers/orders");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const ordersRouter = express.Router();
ordersRouter.post(
  "/",
  authentication,
  authorization("CREATE_ORDERS"),
  createNewOrder
);
ordersRouter.get("/client/:id", getAllClientsOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.get("/provider/:id", authentication, getAllProvidersOrders);
ordersRouter.delete("/:id", deleteOrderById);
ordersRouter.put("/:id", authentication, updateOrderById, sendEmail);
ordersRouter.get("/notification/:id", authentication, Notification);
module.exports = ordersRouter;
