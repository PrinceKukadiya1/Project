// const mongoose = require('mongoose');
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    },

    email: {
    type: String,
    required: true,
    unique: true,
    },

    password:{
    type: String,
    required: true,
    },

    profilepic:{
    type: String,
    default: ""
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }

},{timestamps: true});

export default mongoose.model("User", UserSchema);
// module.exports = mongoose.model("User", UserSchema);