const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Warehouse = require('../models/warehouse.model');

/*
 * @route POST /warehouse/register
 */ 

router.post('/register', async (req, res) => {
    try{
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
            servicesOffered 
        } = req.body;

        // Check if the user already exists
        const user = await Warehouse.findOne({ username });
        if(user) return res.status(400).json({ msg: 'Username already exists' });

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
            servicesOffered 
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
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});