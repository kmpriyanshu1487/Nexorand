import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import User from './models/users.model.js'; // Adjust the path as necessary

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Read JSON data from file
const readJsonData = () => {
  const filePath = path.join(process.cwd(), 'data.json'); // Adjust the path if necessary
  try {
    const data = fs.readFileSync(filePath, 'utf-8'); // Read the file
    if (!data) {
      throw new Error("The JSON file is empty."); // Custom error for empty file
    }
    return JSON.parse(data); // Parse the JSON data
  } catch (error) {
    console.error('Error reading or parsing JSON data:', error.message);
    process.exit(1); // Exit if there is an error
  }
};

// Upload data to the database
async function uploadData(users) {
  try {
    // Delete existing users
    await User.deleteMany({}); // Deletes all documents in the User collection

    // Use upsert to avoid duplicate key errors
    const promises = users.map(async (user) => {
      const { username, ...rest } = user; // Destructure to get username and other fields
      return User.updateOne({ username }, { $set: rest }, { upsert: true }); // Upsert operation
    });

    // Execute all update operations
    await Promise.all(promises);
    console.log(`${users.length} documents were processed (inserted/updated).`);
  } catch (error) {
    console.error("An error occurred during upload:", error);
  }
}

// Main function
const main = async () => {
  await connectDB();
  const data = readJsonData();
  try {
    await uploadData(data); // Call uploadData with the parsed data
  } catch (error) {
    console.error('Upload process failed:', error);
  } finally {
    // Ensure the connection closes regardless of success or error
    mongoose.connection.close();
  }
};

main();
