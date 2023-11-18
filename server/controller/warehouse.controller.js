const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Warehouse = require("../model/warehouse.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");


/*
 * @route POST /warehouse/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      location,
      facility,
      certifications,
      security,
      phoneNo,
      email,
      operatingHours,
      servicesOffered,
    } = req.body;

    // Check if the user already exists
    const user = await Warehouse.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

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
      operatingHours,
      servicesOffered,
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
        .json({ message: "Warehouse register successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse register failed" });
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
      res.status(201).json({ message: "Warehoouse login successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse login failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
 * @route PUT /warehouse/update
 */

router.put("/update", auth,  async (req, res) => {
  try {
    const {
      name,
      username,
      location,
      facility,
      certifications,
      security,
      phoneNo,
      email,
      operatingHours,
      servicesOffered,
    } = req.body;

    // Check if the user already exists
    const user = await Warehouse.findById({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Update the user fields
    await Warehouse.updateOne(
      { _id: req.params.id },
      {
        name,
        username,
        location,
        facility,
        certifications,
        security,
        phoneNo,
        email,
        operatingHours,
        servicesOffered,
      }
    );

    // Sign the token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({ message: "Warehouse update successfully", token });
    } else {
      res.status(400).json({ message: "Warehouse update failed" });
    }
  } catch (error) {}
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

module.exports = router;
