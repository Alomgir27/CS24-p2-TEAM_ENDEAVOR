const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
  User
} = require('./models');
require('dotenv').config();
//connect to MongoDB and clear the database
const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error(err));
    
    //clear the database before running the tests to avoid duplicates and conflicts
    await User.deleteMany()
        .then(() => console.log('Users collection cleared'))
        .catch(err => console.error(err));

    //password is hashed before saving to the database
  await User.create({
    username: 'Admin',
    email: 'admin@gmail.com',
    password: await bcrypt.hash('password', 10),
    role: 'System Admin'
  })
        .then(() => console.log('Admin user created'))
    

    //the connection is closed after seeding the database
    await mongoose.connection.close()
        .then(() => console.log('Connection closed'))
        .catch(err => console.error(err));
  
};

seed();
