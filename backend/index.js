const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Connected to PORT ${PORT}`);
});
