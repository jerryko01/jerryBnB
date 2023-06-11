const express = require("express");
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env' });
const User = require('./models/user.js');

const bcryptSalt = bcrypt.genSaltSync(10);

mongoose.connect(process.env.MONGO_URL);
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

app.get("/test", (req, res) => {
    res.json("Server Setup")
})

app.post("/register", async (req, res) => {
    // const { name, email, password } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hashSync(req.body.password, bcryptSalt);
    // const hash = await bcrypt.hashSync(req.body.password, bcryptSalt);
    try {
        const newUser = await User.create({ name, email, password })
        res.json(newUser);
    }
    catch (e) { res.status(422).json(e) }

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            res.json("Password Matched")
        } else {
            res.json("Password does not match")
        }
    } else {
        res.json('not found');
    }
})

app.listen(4000, () => {
    console.log("Connected to Express on Port 4000")
})