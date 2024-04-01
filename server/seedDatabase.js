const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
  User,
  Role,
  Permission,
  Dashboard,
  Vehicle,
  STS,
  LandfillEntry,
  Route,
  StsEntry,
  Landfill
} = require('./models');
require('dotenv').config();
//connect to MongoDB and clear the database
const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));


  //password is hashed before saving to the database
  // await User.create({
  //   username: 'Admin',
  //   email: 'admin@gmail.com',
  //   password: await bcrypt.hash('password', 10),
  //   role: 'System Admin'
  // })
  //   .then(() => console.log('Admin user created'))
  
  // await User.create({
  //   username: 'User',
  //   email: 'a.h.joy066@gmail.com',
  //   password: await bcrypt.hash('password', 10),
  //   role: 'System Admin'
  // })
  //   .then(() => console.log('User user created'))
  
  // //Add STS Manager User
  // await User.create({
  //   username: 'STS Manager',
  //   email: 'sts-manager-1@gmail.com',
  //   password: await bcrypt.hash('password', 10),
  //   role: 'STS Manager'
  // })
  //   .then(() => console.log('STS Manager user created'))
  
  // //Add Landfill Manager User
  // await User.create({
  //   username: 'Landfill Manager',
  //   email: 'landfill-manager-1@gmail.com',
  //   password: await bcrypt.hash('password', 10),
  //   role: 'Landfill Manager'
  // })
  //   .then(() => console.log('Landfill Manager user created'))
  
  // //Add Driver User
  // await User.create({
  //   username: 'Driver',
  //   email: 'driver-1@gmail.com',
  //   password: await bcrypt.hash('password', 10),
  //   role: 'Driver'
  // })
  //   .then(() => console.log('Driver user created'))
  
  // //Add Permission
  // await Permission.create({
  //   name: 'Landfill Manager',
  //   details: 'Landfill Manager'
  // })
  //   .then(() => console.log('Landfill Manager permission created'))
  
  // await Permission.create({
  //   name: 'STS Manager',
  //   details: 'STS Manager'
  // })
  //   .then(() => console.log('STS Manager permission created'))
  
  // await Permission.create({
  //   name: 'Driver',
  //   details: 'Driver'
  // })
  //   .then(() => console.log('Driver permission created'))
  
  
  // const landfillManagerPermission = await Permission.findOne({ name: 'Landfill Manager' });
  // const stsManagerPermission = await Permission.findOne({ name: 'STS Manager' });

  // //Add Role
  // await Role.create({
  //   name: 'Landfill Manager',
  //   permissions: [landfillManagerPermission._id]
  // })
  //   .then(() => console.log('Landfill Manager role created'))
  
  // await Role.create({
  //   name: 'STS Manager',
  //   permissions: [stsManagerPermission._id]
  // })
  //   .then(() => console.log('STS Manager role created'))
  
  // await Role.create({
  //   name: 'Driver',
  //   permissions: []
  // })
  //   .then(() => console.log('Driver role created'))
  
  // await Role.create({
  //   name: 'System Admin',
  //   permissions: [landfillManagerPermission._id, stsManagerPermission._id]
  // })
  //   .then(() => console.log('System Admin role created'))
  

  //Add new User with Role here
  // await User.create({
  //   username: 'Admin',
  //   email: 'xxxxxx@gmail.com', //change this email
  //   password: await bcrypt.hash('password', 10),
  //   role: 'System Admin'
  // })
  
    

  //the connection is closed after seeding the database
  await mongoose.connection.close()
    .then(() => console.log('Connection closed'))
    .catch(err => console.error(err));

};

seed();
