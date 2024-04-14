const { MongoClient } = require('mongodb');
require('dotenv').config();

let db; // Declare a variable to hold the database instance

async function connectToDatabase() {
    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to MongoDB
        console.log('Database connected');
        db = client.db(process.env.MONGO_DB_NAME); // Set the database instance
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await db.collection('users').findOne({ user_email: email }); // Find the user by email
        return user; // Return the user object
    } catch (err) {
        console.error('Error while fetching user:', err);
        throw err;
    }
}

module.exports = {
    connectToDatabase,
    getUserByEmail
};
