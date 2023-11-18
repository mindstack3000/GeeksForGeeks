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

router.post("/", async (req, res) => {
    try {
      const { crop } = req.body;
  
      // Validate that a crop is provided in the request
      if (!crop) {
        return res.status(400).json({ error: "Crop name is required." });
      }
  
      // Find warehouses that have the specified crop in the typeOfCrop array
      const shortlistedWarehouses = await Warehouse.find({
        typeOfCrop: { $in: [crop] }
        .select("name location facility certifications security price email servicesOffered operatingHours phoneNo"),
      });
  
      // Return the shortlisted warehouses
      res.status(200).json({ shortlistedWarehouses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  


module.exports = router;