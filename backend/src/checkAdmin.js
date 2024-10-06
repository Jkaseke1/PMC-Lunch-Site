// src/checkAdmin.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('./models/User');
const logger = require('./utils/logger');

// Log the MONGODB_URI to check if it's loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const checkAdmin = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('Connected to MongoDB');

    const email = 'jkaseke@tpg.co.zw';
    const user = await User.findOne({ email });

    if (user) {
      console.log(`User found: ${user.email}`);
      console.log(`User role: ${user.role}`);
      if (user.role === 'admin') {
        console.log('This user is an admin');
      } else {
        console.log('This user is not an admin');
      }
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error checking admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

checkAdmin();
