const express = require("express");
const {
  createNewService,
  getServiceByTilte,
  deleteServiceById,
} = require("../controllers/services");
const servicesRouter = express.Router();
servicesRouter.post("/", createNewService);
servicesRouter.get("/:title", getServiceByTilte);
servicesRouter.delete("/:id", deleteServiceById);
module.exports = servicesRouter;
