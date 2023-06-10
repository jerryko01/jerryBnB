const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env' });
const User = require('./models/user.js');

mongoose.connect(process.env.MONGO_URL);
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

app.get("/test", (req, res) => {
    res.json("Server Setup")
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    User.create({ name, email, password });
    res.json({ name, email, password });
})

app.listen(4000, () => {
    console.log("Connected to Express on Port 4000")
})