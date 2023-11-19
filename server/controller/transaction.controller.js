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
    const { warehouseId, crop, quantity, duration } = req.body;
    const farmerId = req.userId;

    const Transcation = new Transaction({
      warehouseId,
      farmerId,
      crop,
      quantity,
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

router.post("/warehouse-request/:id", auth, async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const { status } = req.body;
    const allTransaction = await Transaction.find({ warehouseId: warehouseId });
    let farmerInfo = [];
    let Ids = [];
    for (let i = 0; i < allTransaction.length; i++) {
      let farmer = await Farmer.findById(allTransaction[i].farmerId);

      if (allTransaction[i].status === status) {
        farmerInfo.push({
          // id: allTransaction[i]._id,
          Name: farmer.fullName,
          Quantity: allTransaction[i].quantity,
          Crop: allTransaction[i].crop,
          Dutration: allTransaction[i].duration,
          PhoneNo: farmer.phoneNo,
          Email: farmer.email,
        });
        Ids.push(allTransaction[i]._id);
      }
    }
    if (farmerInfo) {
      res.status(200).json({ farmerInfo, Ids });
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

router.put("/accept", auth, async (req, res) => {
  try {
    const { transactionId } = req.body;
    const warehouse = await Warehouse.findById(req.userId);
    const transaction = await Transaction.findById(transactionId);
    transaction.status = "accepted";
    if (warehouse.facility.capacity < 0) {
      res.status(400).json({ message: "no space available" });
    }
    if (warehouse.facility.capacity < transaction.quantity) {
      res.status(400).json({ message: "no space available" });
    }

    await transaction.save();
    warehouse.facility.capacity -= transaction.quantity;
    await warehouse.save();
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
 *Warehouse  decline request
 */

router.put("/decline", auth, async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(transactionId, {
      status: "rejected",
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
        address: warehouse.location,
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
