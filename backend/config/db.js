const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error in connecting DB: ", error.message);
        process.exit(1); 
    }
};

module.exports = connectDb;
