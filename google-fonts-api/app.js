const express = require('express');
const mongoose = require('mongoose');
const fontRoutes = require('./routes/fontRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next();
});

// MongoDB connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost/googlefonts';

// Connect to MongoDB
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the font routes
app.use('/api/fonts', fontRoutes);

const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});