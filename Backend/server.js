const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3003;

// Enable CORS
app.use(cors());

// Connect to MongoDB

mongoose
  .connect('mongodb+srv://maldolt:Pikachu1!@cluster0.5nvxwp6.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log("Could not connect to MongoDB...");
    console.log(err);
  });

// Parse JSON bodies
app.use(express.json());

// Routes
const foodRoutes = require('./routes/foodRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/foods', foodRoutes);
app.use('/api/reviews', reviewRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'nevada', 'build')));

// Catch-all route for handling React routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'nevada', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
