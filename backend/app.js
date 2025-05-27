// Load required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();
console.log(" JWT_SECRET:", process.env.JWT_SECRET);
// Initialize Express app
const app = express();

// Middleware
app.use(cors());              // Allows frontend to access the backend
app.use(express.json());
app.use('/api/auth', authRoutes);     // Parses incoming JSON requests

// Default route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error(' MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));