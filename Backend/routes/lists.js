const router = require("express").Router()
const List = require('../models/List');
const verify = require("../verifyToken");

// CREATE

router.post("/" ,verify, async (req , res) => {
    if(req.user.isAdmin){
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();
            res.status(201).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You Are Not Allowed!")
    }
})


// DELETE

router.delete("/:id" ,verify, async (req , res) => {
    if(req.user.isAdmin){

        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The List Has Been Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You Are Not Allowed!")
    }
})


// GET

router.get("/" , verify , async(req , res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;

    let list = [];
    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([{$sample: {size: 10}},{$match: { type: typeQuery , genre: genreQuery}},]);
            }
            else{
                list = await List.aggregate([{$sample: {size: 10}},{$match: { type: typeQuery}},]);
            }
        }
        else{
            list = await List.aggregate([{$sample: {size: 10} }])
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET Top 10 Movie list only
router.get("/top10", verify, async (req, res) => {
  try {
    const list = await List.findOne({ title: "TOP 10 MOVIE" });
    // const list = await List.findOne({ title: "Nightmares from the Subcontinent" });
    if (!list || !list.content || list.content.length === 0)
      return res.status(404).json("Top 10 Movie list not found");

    const randomMovieId = list.content[Math.floor(Math.random() * list.content.length)];
    res.status(200).json(randomMovieId); // return just one ID
  } catch (error) {
    res.status(500).json(error);
  }
});




module.exports = router