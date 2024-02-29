/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const Table = require("./models/table.model");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors("*"))

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/user';


const addCount = {};
const updateCount = {};

app.use((req, res, next) => {
    const userId = req.query.userId || 'default';
    const path = req.path.toLowerCase();

    if (path === '/add') {
        addCount[userId] = (addCount[userId] || 0) + 1;
    } else if (path === '/edit') {
        updateCount[userId] = (updateCount[userId] || 0) + 1;
    }

    next();
});

app.get('/add/count', (req, res) => {
    const userId = req.query.userId || 'default';
    const count = addCount[userId] || 0;
    res.json({ count });
});


app.get('/update/count', (req, res) => {
    const userId = req.query.userId || 'default';
    const count = updateCount[userId] || 0;
    res.json({ count });
});


app.get("/", async (req, res) => {
    try {
        const data = await Table.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.post("/add", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            throw new Error("Please send all details carefully.");
        }
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!regex.test(email)) {
            throw new Error("");
        }
        if (phone.length != 10) {
            throw new Error("");
        }
        const data = await Table.create(req.body);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.put("/edit/:id", async (req, res) => {
    try {

        const filter = { _id: req.params.id };

        const updateOperation = {
            $set: { ...req.body },
        };

        const options = {
            returnDocument: 'after',
            projection: { _id: 0 },
            upsert: true,
        };

        const result = await Table.findOneAndUpdate(filter, updateOperation, options);
        res.status(204).send(result);

    } catch (error) {
        res.status(400).send(error.message)
    }

});


app.listen(PORT, () => {
    console.log("Backend is running.");
    mongoose.connect(MONGO_URL).then(() => {
        console.log("DB Connected.");
    }).catch((err) => {
        console.log(err);
    })
})