const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Warehouse = require("../model/warehouse.model");

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

    // Send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

/*
 * @route PUT /warehouse/update
 */

router.put("/update:id", async (req, res) => {
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

    } catch (error) {
        
    }
});

module.exports = router;