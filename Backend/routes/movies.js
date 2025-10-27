// const router = require("express").Router()
// const Movie = require('../models/Movies');
// const { aggregate } = require("../models/User");
// const verify = require("../verifyToken");

// // CREATE

// router.post("/", verify, async (req, res) => {
//   if (req.user && req.user.isAdmin) {
//     const newMovie = new Movie(req.body);
//     try {
//       const savedMovie = await newMovie.save();
//       res.status(201).json(savedMovie);
//     } catch (error) {
//       console.error("🔥 POST /api/movies failed:", error);
//       res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   } else {
//     res.status(403).json("You Are Not Allowed!");
//   }
// });


// // UPDATE

// router.put("/:id" ,verify, async (req , res) => {
//     if(req.user.isAdmin){

//         try {
//             const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{$set: req.body,},{new: true});
//             res.status(200).json(updatedMovie)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
//     else{
//         res.status(403).json("You Are Not Allowed!")
//     }
// })


// // DELETE

// router.delete("/:id" ,verify, async (req , res) => {
//     if(req.user.isAdmin){

//         try {
//             await Movie.findByIdAndDelete(req.params.id);
//             res.status(200).json("The Movie Has Been Deleted.")
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
//     else{
//         res.status(403).json("You Are Not Allowed!")
//     }
// })


// // GET

// router.get("/find/:id" ,verify, async (req , res) => {

//         try {
//             const movie = await Movie.findById(req.params.id);
//             res.status(200).json(movie)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
// )


// // GET RANDOM

// router.get("/random" ,verify, async (req , res) => {
//     const type = req.query.type;
//     let movie;
//         try {
//             if(type === "series"){
//                 movie = await Movie.aggregate([
//                     {$match: {isSeries :true}},
//                     {$sample: {size : 1}},
//                 ]);
//             }
//             else{
//                 movie = await Movie.aggregate([
//                     {$match: {isSeries :false}},
//                     {$sample: {size : 1}},
//                 ]);
//             }
//             res.status(200).json(movie)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
// )

// // GET ALL
// router.get("/" ,verify, async (req , res) => {
//     if(req.user.isAdmin){

//         try {
//             const movies = await Movie.find();
//             res.status(200).json(movies.reverse())
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
//     else{
//         res.status(403).json("You Are Not Allowed!")
//     }
// })


// module.exports = router




import express from "express";
import Movie from "../models/Movies.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// GET BY ID
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET RANDOM
router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  try {
    const movie = type === "series"
      ? await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }])
      : await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

export default router;
