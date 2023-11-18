const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const { encrypt, decrypt } = require("../encryption");
const { enc } = require("crypto-js");

/*
 * @route POST /farmer/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      _adharNo,
      _fullName,
      _phoneNo,
      email,
      _address,
      username,
      password,
      _landSize,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const user = await Farmer.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    const adharNo = encrypt(_adharNo);
    const fullName = encrypt(_fullName);
    const phoneNo = encrypt(_phoneNo);
    const address = encrypt(_address);
    const landSize = encrypt(_landSize);

    // Create a new user
    const newUser = new Farmer({
      adharNo,
      fullName,
      phoneNo,
      email,
      address,
      username,
      password,
      landSize,
      typeOfCrop,
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

    if(token){
      res.status(201).json({ message: "Farmer register successfully", token });
    }else{
      res.status(400).json({ message: "Farmer register failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

/*
 * @route POST /farmer/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    // Check for existing user
    const user = await Farmer.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "No Farmer with this username" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
      if(token){
        res.status(201).json({ message: "Farmer login successfully", token });
      }
      else{
        res.status(400).json({ message: "Farmer login failed" });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route PUT /farmer/update
 */

router.put("/update", auth, async (req, res) => {
  try {
    const {
      adharNo,
      fullName,
      phoneNo,
      email,
      address,
      username,
      landSize,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const existingUser = await Farmer.findById(req.userId);

    adharNo = encrypt(adharNo);
    fullName = encrypt(fullName);
    phoneNo = encrypt(phoneNo);
    address = encrypt(address);
    landSize = encrypt(landSize);

    // Update the user fields
    await Farmer.updateOne({ _id: req.userId }, {
      adharNo,
      fullName,
      phoneNo,
      email,
      address,
      username,
      landSize,
      typeOfCrop,
    });

    // Sign the token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({ message: "Farmer updated successfully", token });
    } else {
      res.status(400).json({ message: "Farmer update failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


/*
 * @route Delete /farmer/delete/:id
 */

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const user = await Farmer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    await Farmer.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router