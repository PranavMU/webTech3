const express = require("express");
const signupModal = require("../modals/signup-modal");
const {checkExistingUser, generatePasswordHash} = require("../utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/posts", (req, res)=> {
    signupModal.find({comments: req.body.comments}).then((data)=> {
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                res.status(200).send(data);
            })
        } else {
            res.status(400).send("no comments");
        }
    })
});




///old password    /new //username

module.exports = router;
