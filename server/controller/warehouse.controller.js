const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Warehouse = require("../model/warehouse.model");
const Farmer = require("../model/farmer.model")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const { encrypt, decrypt } = require("../encryption");

/*
 * @route POST /warehouse/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      _name,
      username,
      password,
      _location,
      facility,
      _certifications,
      _security,
      _phoneNo,
      email,
      servicesOffered,
      waitingList,
      price,
      typeOfCrop
    } = req.body;

    // Check if the user already exists
    const user = await Warehouse.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    const name = encrypt(_name);
    const phoneNo = encrypt(_phoneNo);
    const location = encrypt(_location);
    const certifications = encrypt(_certifications);
    const security = encrypt(_security);

    // Create a new user
    const newUser = new Warehouse({
      name,
      username,
      password,
      location,
      facility,
      certifications,
      security,
      phoneNo,
      email,
      servicesOffered,
      waitingList,
      price,
      typeOfCrop
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace the password with the hashed password
    newUser.password = hashedPassword;

    // Save the user
    await newUser.save();

    // Sign the token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res
        .status(201)
        .json({ message: "Warehouse owner register successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse owner register failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
 * @route POST /warehouse/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    // Check if the user exists
    const user = await Warehouse.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered" });

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials", token });

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({ message: "Warehoouse owner login successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse owner login failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
 * @route PUT /warehouse/update
 */

router.put("/update", auth, async (req, res) => {
  try {
    const {
      _name,
      username,
      _location,
      facility,
      _certifications,
      _security,
      _phoneNo,
      email,
      servicesOffered,
      waitingList,
      price,
      typeOfCrop
    } = req.body;

    // Check if the user already exists
    const existingUser = await Warehouse.findById(req.userId);

    const name = encrypt(_name);
    const phoneNo = encrypt(_phoneNo);
    const location = encrypt(_location);
    const certifications = encrypt(_certifications);
    const security = encrypt(_security);

    // Update the user fields
    await Warehouse.updateOne({ _id: req.userId },  {
      name,
      username,
      password,
      location,
      facility,
      certifications,
      security,
      phoneNo,
      email,
      servicesOffered,
      waitingList,
      price,
      typeOfCrop
    });

    // Sign the token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({ message: "Warehouse owner updated successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse owner update failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


/*
 * @route DELETE /warehouse/delete
 */

router.delete("/delete:id", auth, async (req, res) => {
  try {
    const user = await Warehouse.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Warehouse gets all the details of farmers  */

router.get("/waiting-list", auth, async (req, res) => {
  try {
    /* 
      !Warehouse owner is logged in 
    */
    const warehouseId = req.userId;

    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const waitingList = warehouse.waitingList;

    if (waitingList.length === 0) {
      return res.status(200).json({ message: "No farmers in the waiting list" });
    }

    // Fetch details of specific parameters of farmers in the waiting list
    const farmers = await Farmer.find({ _id: { $in: waitingList } })
      .select("fullName phone email address landSize "); // Add the fields you want to retrieve

    res.status(200).json({ farmers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;
