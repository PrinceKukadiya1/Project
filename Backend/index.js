// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const movieRoutes = require('./routes/movies');
// const listRoutes = require('./routes/lists');
// const compression = require("compression");
// const cors = require("cors");

// dotenv.config();

// app.use(cors());
// mongoose.connect(process.env.MONGO_URL).then(() => {
//   console.log('Connected to MongoDB')
//   }).catch(err => {
//   console.error('Error connecting to MongoDB:', err)
//   });

// app.use(express.json());
// app.use(compression());


// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/lists", listRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import movieRoutes from "./routes/movies.js";
import listRoutes from "./routes/lists.js";
import uploadRoute from "./routes/upload.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/upload", uploadRoute);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
