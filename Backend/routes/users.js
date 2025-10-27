// const router = require("express").Router()
// const User = require('../models/User');
// const CryptoJS = require('crypto-js');
// const verify = require("../verifyToken");


// // Update
// router.put("/:id" ,verify, async (req , res) => {
//     if(req.user.id === req.params.id || req.user.isAdmin){
//         if(req.body.password){
//             req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
//         }
//         try {
//             const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new: true});
//             res.status(200).json(updateUser)
            
//         } catch (error) {
//             res.status(500).json(error)        
//         }
//     }
//     else{
//         res.status(403).json("You Can Not Update!")
//     }
// })

// // Delete
// router.delete("/:id" ,verify, async (req , res) => {
    
//     if(req.user.id === req.params.id || req.user.isAdmin){
//         try {
//              await User.findByIdAndDelete(req.params.id);
//             res.status(200).json("User Has Been Deleted..")
            
//         } catch (error) {
//             res.status(500).json(error)        
//         }
//     }
//     else{
//         res.status(403).json("You Can Not Delete!")
//     }
// });

// // Get
// router.get("/find/:id", async (req , res) => {
//         try {
//             const user = await User.findById(req.params.id);

//             const {password , ...info} = user._doc;

//             res.status(200).json(info);
            
//         } catch (error) {
//             res.status(500).json(error)        
//         }
//     }
// );

// // GET ALL
// router.get("/" ,verify, async (req , res) => {
//     const query = req.query.new;
//     if(req.user.isAdmin){
//         try {
//             const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
//             res.status(200).json(users)
            
//         } catch (error) {
//             res.status(500).json(error)        
//         }
//     }
//     else{
//         res.status(403).json("You Are Not Allowed To See All Users!")
//     }
// });

// // GET USER STATS
// router.get("/stats" , async (req , res) => {
//     const today = new Date();
//     const lastYear = today.setFullYear(today.setFullYear() - 1);

//     const monthsArray = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "Jun",
//         "July",
//         "August",
//         "September",
//         "Octomber",
//         "November",
//         "December"
//     ];

//     try {
//         const data = await User.aggregate([
//             {
//                 $project:{
//                     month:{$month: "$createdAt"},
//                 },
//             },
//             {
//                 $group: {
//                     _id:"$month",
//                     total:{$sum:1},
//                 },
//             },
//         ]);

//         res.status(200).json(data)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// })



// module.exports = router




import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can not update this user!");
  }
});

// DELETE USER
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can not delete this user!");
  }
});

// GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USERS
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const users = req.query.new
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

// GET USER STATS
router.get("/stats", async (req, res) => {
  try {
    const data = await User.aggregate([
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
