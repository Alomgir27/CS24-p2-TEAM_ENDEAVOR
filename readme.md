# EcoSync - Waste Management Application

Welcome to EcoSync, a Waste Management Application designed for Dhaka city. This project utilizes React for the frontend and Node.js for the backend, both located in the same root directory.

## Installation

To run the backend, navigate to the `server` directory:

```bash
cd server
npm install
npm start
# or
npm run dev
```

To run the frontend, navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```



## Database Management

To clean the database, run:

```bash
npm run clean:database
```

To seed the database, run:

```bash
npm run seed:database
```

## Environment Variables

Make sure to set up your `.env` file with the following variables:

```
MONGODB_URI=*your mongodb uri*
PORT=5000
JWT_SECRET=*your jwt secret
TOKEN_SECRET=*your token secret*
EMAIL=*your email*
PASSWORD=*your password*
```

## System admin Email & Password
Email : `admin@gmail.com`
Password : `password`

## About

EcoSync aims to streamline waste management processes in Dhaka city. It provides functionalities for efficient waste collection, tracking, and management.

For any inquiries, please contact team Endeavor at `teamendeavorcodesamurai@gmail.com`.

 
## 1. Diagrams and Flowcharts
### Entity Relationship Diagram
![Flowchart](server/drawSQL-image.png)


### 2. End to End Activity Diagram
```mermaid
graph TD;
    A[Start] --> B[User Requests];
    B --> C{Authentication};
    C -- Yes --> D[Process Request];
    C -- No --> E[Access Denied];
    D --> F{Authorization};
    F -- Yes --> G[Perform Action];
    F -- No --> H[Permission Denied];
    G --> I{Activity Types};
    I -- User and Role Management --> J[Manage Users and Roles];
    I -- Data Entry --> K[Enter Data];
    I -- Billing --> L[Generate Billing Slip];
    I -- Route Optimization --> M[Optimize Routes];
    I -- Fleet Optimization --> N[Optimize Fleet];
    I -- Dashboard Statistics --> O[View Dashboard];
    J --> P{User Types};
    K --> Q{Data Entry Types};
    L --> R{Billing Parameters};
    M --> S{Route Optimization Parameters};
    N --> T{Fleet Optimization Parameters};
    O --> U{Dashboard Parameters};
    P --> A1[Manage System Admin];
    P --> B1[Manage STS Manager];
    P --> C1[Manage Landfill Manager];
    P --> D1[Manage Unassigned User];
    Q --> A2[Add Vehicles];
    Q --> B2[Create STS];
    Q --> C2[Assign STS Managers];
    Q --> D2[Assign Trucks to STS];
    Q --> E2[Add STS Vehicle Entry];
    Q --> F2[Create Landfill Sites];
    Q --> G2[Assign Landfill Managers];
    Q --> H2[Add Landfill Vehicle Entry];
    R --> A3[Calculate Fuel Allocation];
    S --> A4[Efficient Resource Utilization];
    S --> B4[Traffic Load Consideration];
    T --> A5[Number of Trips];
    T --> B5[Fuel Consumption Cost];
    T --> C5[Minimum Number of Trucks];
    U --> A6[Waste Collection Statistics];
    U --> B6[Fuel Cost Statistics];
    U --> C6[Real-time Monitoring];
    A[End];
```



### 3. Backend Flow Diagram
 ```mermaid
graph LR;
    Frontend_API --> Routes;
    Routes --> Middleware;
    Middleware --> Controllers;
    Controllers --> Models;
    Models --> Database;
    Database --> Response;
    Response --> Frontend_API;
```
```sh
                                    +-------------------------+                                 
                                    |       Frontend/API      |                                 
                                    +-------------------------+                                 
                                                |                                               
                                                |                                               
                                    +-------------------------+                                 
                                    |         Routes          |                                 
                                    +-------------------------+                                 
                                                |                                               
                                                |                                               
                                    +-------------------------+                                 
                                    |      Middleware         |                                 
                                    |     (isAuthenticated)   |                                 
                                    +-------------------------+                                 
                                                |                                               
                    +----------------------------------------------------+                       
                    |                           |                        |                       
                    v                           v                        v                       
      +-------------------------+  +--------------------------+  +-------------------------+   
      |      Controllers        |  |        Models            |  |       Database          |   
      |     (e.g., Auth,        |  |     (e.g., User,         |  |                         |   
      |     User, Profile,      |  |      Vehicle, STS,       |  |                         |   
      |     RBAC, Vehicle,      |  |      LandfillEntry,      |  |     MongoDB Atlas       |   
      |     STS, Landfill,      |  |      Dashboard, Route)   |  |                         |   
      |     Dashboard)          |  |                          |  |                         |   
      +-------------------------+  +--------------------------+  +-------------------------+   
                                                |                                               
                                                |                                               
                                    +-------------------------+                                 
                                    |       Response          |                                 
                                    +-------------------------+                                 

```


### 4. Frontend Flow Diagram
```mermaid
graph LR;
    Frontend --> API;
    API --> Routes;
    Routes --> Middleware;
    Middleware --> Controllers;
    Controllers --> Models;
    Models --> Database;
    Database --> Response;
    Response --> Frontend;
```
