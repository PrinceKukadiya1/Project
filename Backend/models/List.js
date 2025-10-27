// const mongoose = require('mongoose');
import mongoose from "mongoose";


const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    },

    type: {
    type: String,
    },

    genre:{
    type: String,
    },

   content:{
    type: Array,
    },


},{timestamps: true});

export default mongoose.model("List", ListSchema);
// module.exports = mongoose.model("List", ListSchema);   