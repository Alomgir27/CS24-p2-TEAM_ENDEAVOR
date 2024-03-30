-- Create User table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    role_id INT NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create Vehicle table
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleNumber VARCHAR(255) NOT NULL,
    type ENUM('Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier') NOT NULL,
    capacity ENUM('3 ton', '5 ton', '7 ton', '15 ton') NOT NULL,
    fuelCostLoaded DECIMAL(10, 2) NOT NULL,
    fuelCostUnloaded DECIMAL(10, 2) NOT NULL,
    isAllocated BOOLEAN DEFAULT FALSE,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create STS table
CREATE TABLE sts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wardNumber VARCHAR(255) NOT NULL,
    capacity VARCHAR(255) NOT NULL,
    gpsCoordinates POINT NOT NULL,
    stsManager_id INT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (stsManager_id) REFERENCES users(id)
);

-- Create STS Entry table
CREATE TABLE sts_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sts_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    volume DECIMAL(10, 2) NOT NULL,
    timeOfArrival DATETIME NOT NULL,
    timeOfDeparture DATETIME NOT NULL,
    isAllocated BOOLEAN DEFAULT FALSE,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sts_id) REFERENCES sts(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Create Landfill table
CREATE TABLE landfills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity DECIMAL(10, 2) NOT NULL,
    operationalTimespan JSON NOT NULL,
    gpsCoordinates POINT NOT NULL,
    landfillManager_id INT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landfillManager_id) REFERENCES users(id)
);

-- Create Landfill Entry table
CREATE TABLE landfill_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    landfill_id INT NOT NULL,
    volume DECIMAL(10, 2) NOT NULL,
    timeOfArrival DATETIME NOT NULL,
    timeOfDeparture DATETIME NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landfill_id) REFERENCES landfills(id)
);

-- Create Dashboard table
CREATE TABLE dashboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numOfUsers INT NOT NULL,
    numOfVehicles INT NOT NULL,
    numOfSTS INT NOT NULL,
    numOfLandfills INT NOT NULL,
    numOfRoutes INT NOT NULL,
    allLandfillsLocations JSON,
    allStsLocations JSON,
    allVehicleMovements JSON,
    allCostData JSON,
    allDistanceData JSON,
    allVolumeData JSON,
    allTimeData JSON,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Route table
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stsEntryId INT NOT NULL,
    landfillId INT NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    numberOfTrips INT NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (stsEntryId) REFERENCES sts_entries(id),
    FOREIGN KEY (landfillId) REFERENCES landfills(id)
);

-- Create Fleet and Vehicle Deployment table
CREATE TABLE fleet_and_vehicle_deployments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    routeIds JSON NOT NULL,
    stsId INT NOT NULL,
    deployTimeRange VARCHAR(255) NOT NULL,
    totalDistance DECIMAL(10, 2) NOT NULL,
    totalWaste DECIMAL(10, 2) NOT NULL,
    totalVehicles INT NOT NULL,
    totalTrips INT NOT NULL,
    totalFuelCost DECIMAL(10, 2) NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (stsId) REFERENCES sts(id)
);

-- Create Role table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Permission table
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Role_Permission table for many-to-many relationship
CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
