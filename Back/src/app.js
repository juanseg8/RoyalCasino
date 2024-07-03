const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = "mongodb+srv://juanseg:4HZEognnsjd2RlIT@cluster0.298ecga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const userRouter = require('./routes/user');
app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
