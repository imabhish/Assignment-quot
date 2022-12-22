const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const router = require("./routes/router");
const crudRoutes = require("./routes/cruderoutes");


var cors = require("cors");
app.use(cors());
app.use(express.json());

// const url="mongodb+srv://admin:4LPZudtJGHHLK2Xx@cluster0.5qu8lrg.mongodb.net/?retryWrites=true&w=majority"
const url = "mongodb+srv://abhishek:r0zSBFeUtNJ8uGpy@test.bzqefd4.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(url).then(() => {
    console.log("Database Connected Succssfully")
}).catch((err) => {
    console.log(err)
});

// routes
app.use("/api/cruds", crudRoutes);

app.listen(5000);