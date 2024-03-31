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
    U --> D6[Route Optimization Statistics];
    U --> E6[Fleet Optimization Statistics];
    U --> F6[Landfill Entry Statistics];
    U --> G6[STS Entry Statistics];
    U --> H6[User Activity Statistics];
    U --> I6[Vehicle Activity Statistics];
    U --> J6[Dashboard Customization];
    A1 --> A7[Add System Admin];
    A1 --> B7[Edit System Admin];
    A1 --> C7[Delete System Admin];
    B1 --> A8[Add STS Manager];
    B1 --> B8[Edit STS Manager];
    B1 --> C8[Delete STS Manager];
    C1 --> A9[Add Landfill Manager];
    C1 --> B9[Edit Landfill Manager];
    C1 --> C9[Delete Landfill Manager];
    D1 --> A10[Add Unassigned User];
    D1 --> B10[Edit Unassigned User];
    D1 --> C10[Delete Unassigned User];
    A2 --> A11[Add Vehicle];
    A2 --> B11[Edit Vehicle];
    A2 --> C11[Delete Vehicle];
    B2 --> A12[Create STS];
    B2 --> B12[Edit STS];
    B2 --> C12[Delete STS];
    C2 --> A13[Assign STS Managers];
    C2 --> B13[Edit STS Managers];
    C2 --> C13[Delete STS Managers];
    D2 --> A14[Assign Trucks to STS];
    D2 --> B14[Edit Trucks Assigned to STS];
    D2 --> C14[Delete Trucks Assigned to STS];
    E2 --> A15[Add STS Vehicle Entry];
    E2 --> B15[Edit STS Vehicle Entry];
    E2 --> C15[Delete STS Vehicle Entry];
    F2 --> A16[Create Landfill Sites];
    F2 --> B16[Edit Landfill Sites];
    F2 --> C16[Delete Landfill Sites];
    G2 --> A17[Assign Landfill Managers];
    G2 --> B17[Edit Landfill Managers];
    G2 --> C17[Delete Landfill Managers];
    H2 --> A18[Add Landfill Vehicle Entry];
    H2 --> B18[Edit Landfill Vehicle Entry];
    H2 --> C18[Delete Landfill Vehicle Entry];
    A3 --> A19[Calculate Fuel Allocation];
    A3 --> B19[Edit Fuel Allocation];
    A3 --> C19[Delete Fuel Allocation];
    A[EcoSync] --> T[End];
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
