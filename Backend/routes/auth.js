// const router = require('express').Router();
// const User = require('../models/User');
// const CryptoJS = require('crypto-js')
// const jwt = require("jsonwebtoken")


// // Register route
// router.post('/register', async (req, res) => {
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
//     });

//     try {
//     const user = await newUser.save();
//     res.status(201).json(user);
//     } 
//     catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Login
// router.post('/login',async(req , res)=> {
//     try {
//         const user = await User.findOne({email: req.body.email});
//         !user && res.status(401).json("Wrong Password Or Username!")

//         const bytes = CryptoJS.AES.decrypt(user.password , process.env.SECRET_KEY);
//         const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//         originalPassword !== req.body.password && res.status(401).json("Wrong Password Or Username!")

//         const accessToken = jwt.sign({id:user._id , isAdmin:user.isAdmin},process.env.SECRET_KEY ,{expiresIn: "5d"});

//         const {password , ...info} = user._doc;

//         res.status(200).json({...info , accessToken});

//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// module.exports = router;


// const router = require('express').Router();
// const User = require('../models/User');
// const CryptoJS = require('crypto-js');
// const jwt = require("jsonwebtoken");

// // REGISTER ADMIN OR NORMAL USER
// router.post('/register', async (req, res) => {
//     try {
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
//             isAdmin: req.body.isAdmin || false // Make admin only if sent in request
//         });

//         const user = await newUser.save();
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(401).json("Wrong Email or Password!");
//         }

//         const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//         const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//         if (originalPassword !== req.body.password) {
//             return res.status(401).json("Wrong Email or Password!");
//         }

//         const accessToken = jwt.sign(
//             { id: user._id, isAdmin: user.isAdmin },
//             process.env.SECRET_KEY,
//             { expiresIn: "5d" }
//         );

//         const { password, ...info } = user._doc;
//         res.status(200).json({ ...info, accessToken });

//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// module.exports = router;


import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      isAdmin: req.body.isAdmin || false,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong Email or Password!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) return res.status(401).json("Wrong Email or Password!");

    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
