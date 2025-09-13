const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://prudvinath16:PRUDVIap16@cluster0.y46cokq.mongodb.net/");
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

module.exports = connectToDB;