the system/module should be mobile responsive and have a landing page.

its features should be recording vehicles and adding vehicles, recording of drivers and adding drivers, recording employees and adding employees, setting accepting trip schedules, and monitoring of vehicular and trip expenses.

The system/module should support rbac, the roles are admin, employees, and driver. role base access on modules are as below:

admin:
-dashboard
-vehicles
-drivers(all drivers)
-employees
-schedules(all schedules)
-expenses/analytics

employees:
-dashboard
-schedules(personal, past and future plotted)
-expenses(logbook style, personal)
-trip(book and on trip controls)

driver:
-dashboard
-schedules(personal, past and future plotted)
-expenses(logbook style, personal)
-trip(accept and on trip controls)

firestore structure
firestore-root
│
├── users/ (all registered users)
│    └── {userId}
│         ├── name: string
│         ├── email: string
│         ├── role: "admin" | "employee" | "driver"
│         ├── phone: string
│         └── createdAt: timestamp
│
├── vehicles/
│    └── {vehicleId}
│         ├── plate: string
│         ├── type: string ("van" | "truck" | "car")
│         ├── status: string ("active" | "in_repair" | "retired")
│         └── assignedDriver: userId | null
│
├── drivers/
│    └── {driverId}
│         ├── userId: string (ref → users/{id})
│         ├── licenseNo: string
│         ├── assignedVehicle: vehicleId | null
│         └── active: boolean
│
├── employees/
│    └── {employeeId}
│         ├── userId: string (ref → users/{id})
│         ├── department: string
│         └── active: boolean
│
├── schedules/
│    └── {scheduleId}
│         ├── date: timestamp
│         ├── time: string
│         ├── vehicleId: string
│         ├── driverId: string
│         ├── employeeId: string
│         ├── destination: geopoint/string
│         └── status: "pending" | "approved" | "completed"
│
├── trips/
│    └── {tripId}
│         ├── employeeId: string
│         ├── driverId: string
│         ├── vehicleId: string
│         ├── startTime: timestamp
│         ├── endTime: timestamp | null
│         ├── status: "pending" | "active" | "completed"
│         ├── destination: [ { lat: number, lng: number, name: string } ]
│         ├── stops: [ { reason: string, time: timestamp } ]
│         ├── expenses: [ { type: string, amount: number, time: timestamp } ]
│         └── report: string
│
└── expenses/
     └── {expenseId}
          ├── tripId: string
          ├── userId: string
          ├── type: string ("fuel" | "maintenance" | "other")
          ├── amount: number
          ├── description: string
          └── createdAt: timestamp

====================================================================================================================================

project structure

src/
├─ firebase/                  
│  └─ initFirebase.js         # initialize Firestore
│
├─ models/
│  ├─ api/
│  │  ├─ vehicleApi.js
│  │  ├─ driverApi.js
│  │  ├─ employeeApi.js
│  │  ├─ scheduleApi.js
│  │  ├─ expenseApi.js
│  │  └─ tripApi.js
│  ├─ entities/
│  │  ├─ Vehicle.js
│  │  ├─ Driver.js
│  │  ├─ Employee.js
│  │  ├─ Schedule.js
│  │  ├─ Expense.js
│  │  └─ Trip.js
│  └─ store/
│     └─ authStore.js         # Zustand auth + role
│
├─ controllers/
│  ├─ vehicleController.js
│  ├─ driverController.js
│  ├─ employeeController.js
│  ├─ scheduleController.js
│  ├─ expenseController.js
│  └─ tripController.js
│
├─ utils/
│  ├─ auth.js                 # RBAC helpers
│  └─ date.js
│
├─ routes/
│  └─ index.jsx               # route definitions + protected route wrapper
│
├─ views/
│  ├─ layouts/
│  │  ├─ MainLayout.jsx
│  │  └─ LandingLayout.jsx
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ Card.jsx
│  │  └─ Table.jsx
│  ├─ pages/
│  │  ├─ Landing.jsx
│  │  ├─ Login.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Vehicles.jsx
│  │  ├─ Drivers.jsx
│  │  ├─ Employees.jsx
│  │  ├─ Schedules.jsx
│  │  ├─ Expenses.jsx
│  │  └─ Trips.jsx
│  └─ trip/
│     ├─ TripRequestForm.jsx
│     ├─ TripActiveMap.jsx
│     └─ OnTripControls.jsx
│
├─ App.jsx
└─ main.jsx


