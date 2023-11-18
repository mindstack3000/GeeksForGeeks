const express = require("express");
const router = express.Router();
const Warehouse = require("../model/warehouse.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route GET /warehouseSearch
 */

router.get("/", auth, async (req, res) => {
  try {
    const { search } = req.body;
    const result = await Warehouse.find({addresssearch}).exec();
    if (element.search == Number) {
      const filteredResult = result.filter((element) => {
        if (
          element.search <= result.facility.capacity ||
          element.search >= result.facility.temperature.low ||
          element.search <= result.facility.temperature.high
        ) {
          return element;
        } else {
          return null;
        }
      });
      res.status(200).json(filteredResult);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
