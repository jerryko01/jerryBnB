const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true }
})