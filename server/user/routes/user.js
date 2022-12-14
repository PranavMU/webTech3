const express = require("express");
const signupModal = require("../modals/signup-modal");
const {checkExistingUser, generatePasswordHash} = require("../utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res)=> {
    signupModal.find({username: req.body.username}).then((userData)=> {
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});

router.post("/signup", async (req, res)=> {
    if(await checkExistingUser(req.body.username)) {
        res.status(400).send("Username exist. Please try with different username");
    } else {
        if(req.body.phoneNumber.length < 11){
            res.status(400).send("PhoneNumber invalid")
        }else{

            generatePasswordHash(req.body.password).then((passwordHash)=> {
                signupModal.create({username: req.body.username,phone_number: req.body.phoneNumber,
                                password: passwordHash})
                                .then(()=> { 
                                    res.status(200).send(`${req.body.username} added successfully`); 
                                }).catch((err)=> {
                                    res.status(400).send(err.message)
                })
            });
        }

     
    }
    
});

router.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});

///old password    /new //username

module.exports = router;




///verification
//token secretkey