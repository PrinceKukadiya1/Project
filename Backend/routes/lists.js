// // const router = require("express").Router()
// // const List = require('../models/List');
// // const verify = require("../verifyToken");

// // // CREATE

// // router.post("/" ,verify, async (req , res) => {
// //     if(req.user.isAdmin){
// //         const newList = new List(req.body);

// //         try {
// //             const savedList = await newList.save();
// //             res.status(201).json(savedList)
// //         } catch (error) {
// //             res.status(500).json(error)
// //         }
// //     }
// //     else{
// //         res.status(403).json("You Are Not Allowed!")
// //     }
// // })


// // // DELETE

// // router.delete("/:id" ,verify, async (req , res) => {
// //     if(req.user.isAdmin){

// //         try {
// //             await List.findByIdAndDelete(req.params.id);
// //             res.status(201).json("The List Has Been Deleted")
// //         } catch (error) {
// //             res.status(500).json(error)
// //         }
// //     }
// //     else{
// //         res.status(403).json("You Are Not Allowed!")
// //     }
// // })


// // // GET

// // router.get("/" , verify , async(req , res)=>{
// //     const typeQuery = req.query.type;
// //     const genreQuery = req.query.genre;

// //     let list = [];
// //     try {
// //         if(typeQuery){
// //             if(genreQuery){
// //                 list = await List.aggregate([{$sample: {size: 10}},{$match: { type: typeQuery , genre: genreQuery}},]);
// //             }
// //             else{
// //                 list = await List.aggregate([{$sample: {size: 10}},{$match: { type: typeQuery}},]);
// //             }
// //         }
// //         else{
// //             list = await List.aggregate([{$sample: {size: 10} }])
// //         }

// //         res.status(200).json(list);
// //     } catch (error) {
// //         res.status(500).json(error)
// //     }
// // })

// // // GET Top 10 Movie list only
// // router.get("/top10", verify, async (req, res) => {
// //   try {
// //     const list = await List.findOne({ title: "TOP 10 MOVIE" });
// //     // const list = await List.findOne({ title: "Nightmares from the Subcontinent" });
// //     if (!list || !list.content || list.content.length === 0)
// //       return res.status(404).json("Top 10 Movie list not found");

// //     const randomMovieId = list.content[Math.floor(Math.random() * list.content.length)];
// //     res.status(200).json(randomMovieId); // return just one ID
// //   } catch (error) {
// //     res.status(500).json(error);
// //   }
// // });


// // module.exports = router



// const router = require("express").Router();
// const List = require('../models/List');
// const verify = require("../verifyToken");

// // CREATE
// router.post("/", verify, async (req, res) => {
//   if (req.user.isAdmin) {
//     const newList = new List(req.body);
//     try {
//       const savedList = await newList.save();
//       res.status(201).json(savedList);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.status(403).json("You Are Not Allowed!");
//   }
// });

// // DELETE
// router.delete("/:id", verify, async (req, res) => {
//   if (req.user.isAdmin) {
//     try {
//       await List.findByIdAndDelete(req.params.id);
//       res.status(201).json("The List Has Been Deleted");
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.status(403).json("You Are Not Allowed!");
//   }
// });

// // GET (UPDATED) - CHANGED: match then sample
// router.get("/", verify, async (req, res) => {
//   const typeQuery = req.query.type;
//   const genreQuery = req.query.genre;

//   try {
//     let list = [];

//     if (typeQuery && genreQuery) {
//       // CHANGED: match first, then sample
//     //   console.log(`[lists] match type=${typeQuery} genre=${genreQuery}`);
//       list = await List.aggregate([
//         { $match: { type: typeQuery, genre: genreQuery } },
//         { $sample: { size: 10 } },
//       ]);
//     } else if (typeQuery) {
//       // CHANGED: type only
//     //   console.log(`[lists] match type=${typeQuery}`);
//       list = await List.aggregate([
//         { $match: { type: typeQuery } },
//         { $sample: { size: 10 } },
//       ]);
//     } else if (genreQuery) {
//       // NEW: support genre-only filtering even if type not provided
//     //   console.log(`[lists] match genre=${genreQuery}`);
//       list = await List.aggregate([
//         { $match: { genre: genreQuery } },
//         { $sample: { size: 10 } },
//       ]);
//     } else {
//       // no filters: sample from all
//       list = await List.aggregate([{ $sample: { size: 10 } }]);
//     }

//     return res.status(200).json(list);
//   } catch (error) {
//     console.error('[lists] GET error:', error);
//     return res.status(500).json(error);
//   }
// });

// // GET Top 10 Movie list only (UNCHANGED)
// router.get("/top10", verify, async (req, res) => {
//   try {
//     const list = await List.findOne({ title: "TOP 10 MOVIE" });
//     if (!list || !list.content || list.content.length === 0)
//       return res.status(404).json("Top 10 Movie list not found");

//     const randomMovieId = list.content[Math.floor(Math.random() * list.content.length)];
//     res.status(200).json(randomMovieId);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// module.exports = router;


import express from "express";
import List from "../models/List.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
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
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// GET
router.get("/", verifyToken, async (req, res) => {
  const { type, genre } = req.query;
  try {
    let list = [];
    if (type && genre) {
      list = await List.aggregate([{ $match: { type, genre } }, { $sample: { size: 10 } }]);
    } else if (type) {
      list = await List.aggregate([{ $match: { type } }, { $sample: { size: 10 } }]);
    } else if (genre) {
      list = await List.aggregate([{ $match: { genre } }, { $sample: { size: 10 } }]);
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET TOP 10
router.get("/top10", verifyToken, async (req, res) => {
  try {
    const list = await List.findOne({ title: "Shadows & Screams" });
    if (!list || !list.content || list.content.length === 0) return res.status(404).json("Top 10 movie list not found");
    const randomMovieId = list.content[Math.floor(Math.random() * list.content.length)];
    res.status(200).json(randomMovieId);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

