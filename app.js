const mongoose = require('mongoose');
require('dotenv').config();  // To use the .env file

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected successfully!');
}).catch((err) => {
  console.error('Database connection error:', err);
});
