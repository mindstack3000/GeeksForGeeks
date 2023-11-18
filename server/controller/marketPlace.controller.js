 const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");


/*
  * GET /marketplace
    get all the warehouses with the crops that the farmer has
 */

// Farmer purchase warehouse

router.get("/", async (req, res) => {
    try {
      const allWarehouses = await Warehouse.find().select("name location facility certifications security phoneNo email servicesOffered  price typeOfCrop ");
      // Return the shortlisted warehouses
      res.status(200).json(allWarehouses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  


module.exports = router;