const express = require("express");
const mongoose = require("mongoose");
const userController = require("./user/routes/user");
const multer = require("multer")();
const app = express();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cors = require("cors");
const uprotectedRoutes = ["/user/login", "/user/signup"];

//server

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer.array());
app.use(cors());


//Database connection
mongoose.connect("mongodb+srv://prnv:prnv123@cluster0.cszthhf.mongodb.net/web3?retryWrites=true&w=majority", (data)=> {
    console.log("Successfully connected to db");
}, (err)=> {
    console.log(err)
});

app.get("/", (req, res)=> {
    res.send("Backend works")
});

app.use("/user", userController);

//middleware
app.listen(3001, (err)=> {
    if(!err) {
        console.log("Server started at port 3001")
    } else {
        console.log(err);
    }
});
