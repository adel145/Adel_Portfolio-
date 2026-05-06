/*
 * Archived local demo server.
 *
 * The live portfolio is deployed to GitHub Pages as a static Vite app and does
 * not depend on this Express/MongoDB code. If this server is used locally, copy
 * .env.example to a private .env file and provide your own MONGO_URI. Never
 * commit a real database URI, password, token, or API key.
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

if (!mongoUri) {
  console.warn("MONGO_URI is not configured. Archived demo API will run without a database connection.");
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
}

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  importance: { type: Number, default: 1 },
});
const Task = mongoose.model("Task", taskSchema, "todo_tasks");

app.get("/api/tasks", async (_req, res) => {
  if (!mongoUri) return res.status(503).json({ message: "Database is not configured." });

  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  if (!mongoUri) return res.status(503).json({ message: "Database is not configured." });

  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  if (!mongoUri) return res.status(503).json({ message: "Database is not configured." });

  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  if (!mongoUri) return res.status(503).json({ message: "Database is not configured." });

  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (_error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

app.listen(port, () => console.log(`Archived demo server running on port ${port}`));
