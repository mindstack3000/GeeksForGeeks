const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route POST /farmer/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      adharNo,
      fullName,
      phoneNo,
      email,
      address,
      username,
      password,
      landSize,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const user = await Account.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    // Create a new user
    const newUser = new Account({
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

    // Send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
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
    const user = await Account.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "No account with this username" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    // Send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route PUT /farmer/update
 */

router.put("/update/:id", auth, async (req, res) => {
  try {
    const {
      adharNo,
      fullName,
      phoneNo,
      email,
      address,
      username,
      password,
      landSize,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const user = await Account.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Create a new user
    const newUser = new Account({
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
    await Account.updateOne({ _id: req.params.id }, newUser);

    // Sign the token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );

    // Send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
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
    const user = await Account.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    await Account.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
