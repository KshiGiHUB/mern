require("dotenv").config();
const express = require('express');
const app = express()
const mongoose = require("mongoose");
const cors = require('cors')
const port = process.env.PORT || 4000


mongoose.connect(process.env.DB_URI)
    .then(async () => {
        console.log(" MongoDB connected successfully");

        const db = mongoose.connection.db;
        const count = await db.collection("foodData").countDocuments();

        if (count === 0) {
            console.log("collection is empty.");
            return;
        }

        const data = await db.collection("foodData").find({}).toArray();
        const category = await db.collection("foodCategory").find({}).toArray();
        global.food = data;
        global.food_category = category;
    })
    .catch((error) => console.error("connection error:", error));

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Allow only specific HTTP methods
    allowedHeaders: ["Content-Type"] // Allow specific headers
}));


app.get('/', (req, res) => {
    res.send('hello world')
})

app.use(express.json())
app.use("", require('./Routes/createUser'))
app.use("", require('./Routes/displayFood'))
app.use("", require('./Routes/orderData'))


app.listen(port, () => {
    console.log(`successfully cconnected to port: ${port}`)
})