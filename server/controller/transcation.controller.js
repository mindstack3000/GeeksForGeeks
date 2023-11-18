const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const { encrypt, decrypt } = require("../encryption");

/* Farmer purchase warehouse */

router.post("/purchase/:id", auth, async (req, res) => {
    console.log("running")
    /* 
    ! Farmer is logged in 
    */

  try {
    const warehouseId = req.params.id;
    const farmerId = req.userId;

    console.log(farmerId , warehouseId)
    const getWarehouseDetails = await Warehouse.findById(warehouseId).exec();

    if (!getWarehouseDetails) {
      return res.status(404).json({ message: "Warehouse not found" });
    } 

    if (getWarehouseDetails.waitingList.includes(farmerId)) {
      return res.status(400).json({ message: "Farmer is already in the waiting list" });
    }

    // Add the farmerId to the waitingList
    await Warehouse.updateOne(
      { _id: warehouseId },
      { $push: { waitingList: farmerId } }
    );

    res.status(200).json({ message: "Farmer added to waiting list successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}); 



module.exports = router; 
