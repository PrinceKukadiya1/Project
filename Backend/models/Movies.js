// const mongoose = require('mongoose');
import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    },

    desc: {
    type: String,
    },
    
    ldesc: {
    type: String,
    },

    img:{
    type: String,
    },
    
    imgSm:{
    type: String,
    },
    
    trailer:{
    type: String,
    },
    
    video:{
    type: String,
    },
    
    year:{
    type: String,
    },
    
    limit:{
    type: Number,
    },
     
    duration:{
      type: String
    },

    genre:{
    type: String,
    },

    isSeries:{
    type: Boolean,
    default: false,
    }


},{timestamps: true});

export default mongoose.model("Movie", MovieSchema);
// module.exports = mongoose.model("Movie", MovieSchema);