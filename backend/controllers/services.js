const serviceModel = require("../models/services");
const createNewService = (req, res) => {
  const { title, price, provider } = req.body;
  const service = new serviceModel({
    title,
    price,
    provider,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "service Created Successfully",
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
const getServiceByTilte = (req, res) => {
  serviceModel
    .find({ title: req.params.title })
    .populate("provider", "firstName phoneNumber")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All ${req.params.title} Services `,
          services: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Services",
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
const deleteServiceById = (req, res) => {
  const id = req.params.id;
  serviceModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Service With Id ${id} Not Found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Service Deleted`,
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
module.exports = { createNewService, getServiceByTilte, deleteServiceById };
