const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const Transaction = require("../model/transaction.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/* Farmer purchase warehouse */
router.post("/farmer-purchase", auth, async (req, res) => {
  try {
    const { warehouseId, crop, quantity, price, duration } = req.body;
    const farmerId = req.userId;

    const Transcation = new Transaction({
      warehouseId,
      farmerId,
      crop,
      quantity,
      price,
      duration,
      status: "pending",
    });

    await Transcation.save();

    if (Transcation) {
      res.status(200).json({ Transcation });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
 ! Warehouse Dashboard
 *Warehouse all request info 
 */

router.get("/warehouse-request/:id", auth, async (req, res) => {
  try {
    const warehouseId = req.params.id;
    console.log(warehouseId);
    const allTransaction = await Transaction.find({ warehouseId: warehouseId });
    let farmerInfo = [];
    for (let i = 0; i < allTransaction.length; i++) {
      let farmer = await Farmer.findById(allTransaction[i].farmerId);
      farmerInfo.push({
        Name: farmer.fullName,
        Quantity: allTransaction[i].quantity,
        Crop: allTransaction[i].crop,
        Dutration: allTransaction[i].duration,
        PhoneNo: farmer.phoneNo,
        Email: farmer.email,
      });
    }
    if (farmerInfo) {
      res.status(200).json({ farmerInfo });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *Warehouse accept request
 */

router.post("/accept-reject", auth, async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(transactionId, {
      status: status,
    });
    if (transaction) {
      res.status(200).json({ message: "status updated" });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *Warehouse Occupied Space
 */
router.put("/warehouse-occupied-space/", auth, async (req, res) => {
  try {
    const warehouseId = req.userId;
    const allTransaction = await Transaction.find({
      warehouseId: warehouseId,
      status: "accepted",
    });

    if (allTransaction) {
      res.status(200).json({ transaction: allTransaction });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 ! Farmer Dashboard
 * all request info 
 */
router.get("/farmer-request/:id", auth, async (req, res) => {
  try {
    const farmerId = req.params.id;
    const allTransaction = await Transaction.find({ farmerId: farmerId });
    let warehouseInfo = [];
    for (let i = 0; i < allTransaction.length; i++) {
      let warehouse = await Warehouse.findById(allTransaction[i].warehouseId);
      warehouseInfo.push({
        warehouseOwner: warehouse.name,
        address : warehouse.location,
        crop: allTransaction[i].crop,
        quantity: allTransaction[i].quantity,
        duration: allTransaction[i].duration,
        phoneNo: warehouse.phoneNo,
        email: warehouse.email,
      });
    }
    if (warehouseInfo) {
      res.status(200).json({ warehouseInfo });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
