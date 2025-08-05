const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const listRoutes = require('./routes/lists');
const compression = require("compression");
const cors = require("cors");

dotenv.config();

app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB')
  }).catch(err => {
  console.error('Error connecting to MongoDB:', err)
  });

app.use(express.json());
app.use(compression());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});