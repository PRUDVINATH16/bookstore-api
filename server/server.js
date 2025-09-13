require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const path = require('path');
const bookRoutes = require('./routes/book-route');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Database connection
connectToDB();

// Middleware
app.use(cors());            // 👈 this enables CORS for all origins
app.use(express.json());

// Serve everything inside /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});