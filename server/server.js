const express = require("express");
const mongoose = require("mongoose");
const userController = require("./user/routes/user");
const multer = require("multer")();

const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const cors = require("cors");
const uprotectedRoutes = ["/user/login", "/user/signup"];
const bodyParser = require("body-parser");
const app = express();
//server

//body parser middleware
app.use(cors())
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(multer.array());
app.use(cors())


//Database connection
mongoose.connect(process.env.DATABASE);

app.get("/", (req, res)=> {
    res.send("Backend works")
});

app.use("/user", userController);

//middleware
app.listen(process.env.PORT,()=>{
    console.log("server started @ : " +process.env.PORT);
});
