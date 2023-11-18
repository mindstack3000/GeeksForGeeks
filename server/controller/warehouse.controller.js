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
    }