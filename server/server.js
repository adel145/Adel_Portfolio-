const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000; // Use port consistently

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://adel145:adel145@cluster0.zzbywqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Task schema and model
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  importance: { type: Number, default: 1 },
});
const Task = mongoose.model('Task', taskSchema, 'todo_tasks');

// Movie schema and model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  embedCode: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Add thumbnail URL
  description: { type: String, required: false }, // Add description
  category: { type: String, enum: ['movie', 'series'], required: true }, // Add category
  url: { type: String, required: true }, // Add video URL
});

const Movie = mongoose.model("Movie", movieSchema, "movies");



// Task routes
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Movie routes


app.post('/api/movies', async (req, res) => {
  const { title, type, embedCode, thumbnail, description, category, url } = req.body;

  if (!title || !type || !embedCode || !thumbnail || !description || !category || !url) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newMovie = new Movie({ title, type, embedCode, thumbnail, description, category, url });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error saving movie:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({ category: 'movie' }); // Filter by category
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all series
app.get('/api/series', async (req, res) => {
  try {
    const series = await Movie.find({ category: 'series' }); // Filter by category
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a specific movie or series by ID
app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Movie.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search movies and series by title
app.get('/api/search', async (req, res) => {
  const { query } = req.query; // Get search query from URL params

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const results = await Movie.find({
      title: { $regex: query, $options: 'i' }, // Case-insensitive search
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));







