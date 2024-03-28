const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
  User,
  Vehicle,
  STS,
  StsEntry,
  LandfillEntry,
  OilAllocation,
  Dashboard,
  Route,
  Role,
  Permission
} = require('./models');
require('dotenv').config();
//connect to MongoDB and clear the database
const clean = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
  //clear the database before running the tests to avoid duplicates and conflicts
  await User.deleteMany()
    .then(() => console.log('Users collection cleared'))
    .catch(err => console.error(err));
  await Vehicle.deleteMany()
    .then(() => console.log('Vehicles collection cleared'))
    .catch(err => console.error(err));
  await STS.deleteMany()
    .then(() => console.log('STS collection cleared'))
    .catch(err => console.error(err));
  await StsEntry.deleteMany()
    .then(() => console.log('StsEntry collection cleared'))
    .catch(err => console.error(err));
  await LandfillEntry.deleteMany()
    .then(() => console.log('LandfillEntry collection cleared'))
    .catch(err => console.error(err));
  await OilAllocation.deleteMany()
    .then(() => console.log('OilAllocation collection cleared'))
    .catch(err => console.error(err));
  await Dashboard.deleteMany()
    .then(() => console.log('Dashboard collection cleared'))
    .catch(err => console.error(err));
  await Route.deleteMany()
    .then(() => console.log('Route collection cleared'))
    .catch(err => console.error(err));
  await Role.deleteMany()
    .then(() => console.log('Role collection cleared'))
    .catch(err => console.error(err));
  await Permission.deleteMany()
    .then(() => console.log('Permission collection cleared'))
    .catch(err => console.error(err));
  //close the connection after clearing the database
  await mongoose.connection.close()
    .then(() => console.log('Connection closed'))
    .catch(err => console.error(err));
};

clean();
