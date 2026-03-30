const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://tylernormdb:backendyay@backend.bmj4mvh.mongodb.net/?appName=Backend")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", ItemSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));