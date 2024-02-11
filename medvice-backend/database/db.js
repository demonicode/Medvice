const mongoose = require('mongoose');

require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};


module.exports = {connectMongoDB};
