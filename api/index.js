const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: 'https://jerrybnb.onrender.com'
}))
const mongoose = require('mongoose');
require('dotenv').config()

const User = require('./models/User.js')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')

const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(10)

const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser');
app.use(cookieParser())

const imageDownloader = require("image-downloader");
app.use('/uploads', express.static(__dirname + "/uploads"))

const multer = require('multer')
const fs = require('fs')

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    })

}



app.get('/test', (req, res) => {
    res.json(process.env.PORT)
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({ name, email, password: bcrypt.hashSync(password, bcryptSalt) })
        res.send(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email })
    // In cases where the email is found or not found
    if (userDoc) {
        // If the email is found, compare the entered password with UserDoc's pwd
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            // When the password is okay, we want to create a JWT and respond with a cookie and an encrypted username
            // Name of the cookie will be token, value will be encrypted
            jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.json("Password does not Match")
        }
    } else {
        res.json("not found")
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }
})

app.post("/logout", (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName
    })
    res.json(newName)
})

const photosMiddleware = multer({ dest: 'uploads/' })

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.')
        const extension = parts[parts.length - 1]
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
})

app.post("/places", (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const PlaceDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        })
        res.json(PlaceDoc)
    })
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
    Booking.create({ place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData.id })
        .then((doc) => {
            res.json(doc)
        }).catch((err) => {
            throw err;
        })
})

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))
})


const startServer = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("MongoDB Connected"))
            .catch((err) => console.log(err))
    } catch (error) {
        console.log(error);
    }
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log("Server Started on Port 4000")
    })
}

startServer();