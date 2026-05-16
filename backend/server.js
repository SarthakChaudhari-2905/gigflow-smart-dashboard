const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("GigFlow API Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});