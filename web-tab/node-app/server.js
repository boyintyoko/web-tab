const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require("./models/history")
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_API)
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.log(err))

app.post("/api/history", async (req, res) => {
  const { name, content } = req.body
  try {
    const newEntry = new Blog({ name, content });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.log(err)
    res.status(501).json({ message: "Failed to create entry"})
  }
});

app.get("/api/history-all", async(req, res) => {
  try {
    const entries = await Blog.find({})
    res.status(200).json(entries)
  } catch (err) {
    console.error(err)
  }
})

app.delete("/api/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete entry" });
  }
});