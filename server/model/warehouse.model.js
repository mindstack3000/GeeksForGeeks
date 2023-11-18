const mongoose = require('mongoose');
const client = require('../config/connect');

const facilites = {
    temperature:{
        low:{
            type: Number,
            required: true,
        },
        high:{
            type: Number,
            required: true,
        }
    },
    capacity:{
        type: Number,
        required: true,
    },
    tempType:{
        type: String,
        required: true,
    }
}

const hours = {
    open:{
        type: Number,
        required: true,
    },
    close:{
        type: Number,
        required: true,
    }

}

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    facility:{
        type: String,
        enum: facilites,
        required: true,
    },
    certifications:{
        type: String,
        required: true,
    },
    security:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    oeratingHours:{
        type: String,
        enum: hours,
        required: true,
    },
    otp:{
        type: Number,
        required: false,    
    },
})

const Warehouse = client.model('Warehouse', warehouseSchema);
module.exports = Warehouse;