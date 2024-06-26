const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');
const rbacController = require('../controllers/rbacController');
const vehicleController = require('../controllers/vehicleController');
const stsController = require('../controllers/stsController');
const landfillEntryController = require('../controllers/landfillEntryController');
const routeController = require('../controllers/routeController');
const dashboardController = require('../controllers/dashboardController');

// middleware to check if user is authenticated
const isAuthenticated = require('../middlewares/isAuthenticated');

// Authentication Endpoints
router.post('/auth/create', authController.createUser);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/reset-password/initiate', authController.initiateResetPassword);
router.post('/auth/reset-password/confirm', authController.confirmResetPassword);
router.post('/auth/change-password', isAuthenticated, authController.changePassword);

// User Management Endpoints
router.get('/users', isAuthenticated, userController.getUsers);
router.get('/users/:userId', isAuthenticated, userController.getUser);
router.post('/users', isAuthenticated, userController.createUser);
router.put('/users/:userId', isAuthenticated, userController.updateUser);
router.delete('/users/:userId', isAuthenticated, userController.deleteUser);
router.get('/users/roles', isAuthenticated, userController.getRoles);
router.put('/users/:userId/roles', isAuthenticated, userController.updateRoles);
router.get('/managers', isAuthenticated, userController.getSTSManagers);
router.get('/landfill-managers', isAuthenticated, userController.getLandfillManagers);

// Profile Management Endpoints
router.get('/profile', isAuthenticated, profileController.getProfile);
router.put('/profile', isAuthenticated, profileController.updateProfile);

// Role-Based Access Control (RBAC) Endpoints
router.post('/rbac/roles', isAuthenticated, rbacController.createRole);
router.get('/rbac/roles', isAuthenticated, rbacController.getRoles);
router.get('/rbac/roles/:roleId', isAuthenticated, rbacController.getRole);
router.put('/rbac/roles/:roleId', isAuthenticated, rbacController.updateRole);
router.delete('/rbac/roles/:roleId', isAuthenticated, rbacController.deleteRole);
router.post('/rbac/permissions', isAuthenticated, rbacController.createPermission);
router.get('/rbac/permissions', isAuthenticated, rbacController.getPermissions);
router.put('/rbac/permissions/:permissionId', isAuthenticated, rbacController.updatePermission);
router.delete('/rbac/permissions/:permissionId', isAuthenticated, rbacController.deletePermission);
router.put('/rbac/roles/:roleId/permissions', isAuthenticated, rbacController.assignPermissions);
router.put('/rbac/users/:userId/roles', isAuthenticated, rbacController.assignRoles);

// Vehicle Management Endpoints
router.post('/vehicles', isAuthenticated, vehicleController.createVehicle);
router.get('/vehicles', isAuthenticated, vehicleController.getVehicles);
router.get('/vehicles/:vehicleId', isAuthenticated, vehicleController.getVehicle);
router.put('/vehicles/:vehicleId', isAuthenticated, vehicleController.updateVehicle);
router.delete('/vehicles/:vehicleId', isAuthenticated, vehicleController.deleteVehicle);

// STS Entry Endpoints
router.post('/sts', isAuthenticated, stsController.createSTS);
router.get('/sts', isAuthenticated, stsController.getSTS);
router.get('/sts-entries', isAuthenticated, stsController.getStsEntries);
router.put('/sts/:stsId/assign-manager', isAuthenticated, stsController.assignManager);
router.post('/sts-entries', isAuthenticated, stsController.addStsEntry);

// Landfill Entry Endpoints
router.post('/landfill', isAuthenticated, landfillEntryController.createLandfill);
router.get('/landfills', isAuthenticated, landfillEntryController.getLandfills);
router.get('/all-landfills', isAuthenticated, landfillEntryController.getAllLandfills);
router.get('/landfill-entries', isAuthenticated, landfillEntryController.getLandfillEntries);
router.post('/landfill-entries', isAuthenticated, landfillEntryController.createLandfillEntry);
router.get('/landfill-details', isAuthenticated, landfillEntryController.getLandfillDetails);



// Waste Collection and Transfer Tracking Endpoints
router.post('/optimize-routes', isAuthenticated, routeController.createOptimizeRoutes);
router.get('/routes', isAuthenticated, routeController.getRoutes);
router.get('/route/:routeId', isAuthenticated, routeController.getRoute);

router.post('/deploy-vehicle', isAuthenticated, routeController.deployVehicle);
router.get('/deployments', isAuthenticated, routeController.getDeployments);

// Dashboard Overview Endpoints
router.get('/dashboard', isAuthenticated, dashboardController.getDashboard);

module.exports = router;