const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const uri = process.env.MONGO_DB_URI;
        if (!uri) {
            throw new Error("MONGO_DB_URI environment variable is not set");
        }
        await mongoose.connect(uri);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Failed to connect to database:", error.message);
    }
};

module.exports = connectToDB;
