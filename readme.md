# API Project - Hospital Management System (HMS)

This is the backend API for the Hospital Management System (HMS), built with Node.js, Express, and MongoDB. The project provides RESTful APIs for managing admissions, patients, rooms, billing, appointments, and more.

## Features
* Authentication and authorization
* Admission management
* Room and department management
* Billing and payment tracking
* Log management for CRUD actions
* RESTful APIs

## Requirements
* Node.js (v16 or later recommended)
* MongoDB (local or Atlas)

## Installation

* Clone the repository

``` 
git clone https://github.com/madushanka92/T3-JS-Project-HMS-API.git
cd api-project-hms
```

*  Install dependencies

```
npm install
```

This will install the required dependencies listed in the package.json file:

* bcryptjs: For hashing passwords.
* cors: For handling cross-origin requests.
* dotenv: For managing environment variables.
* express: Web framework for Node.js.
* jsonwebtoken: For generating and verifying JWT tokens.
* mongoose: MongoDB object modeling.
* nodemon: For automatic server restart during development.

### Configure Environment Variables

```
MONGODB_URI=mongodb://localhost:27017/hms  # MongoDB URI (or MongoDB Atlas connection string)
JWT_SECRET=your_secret_key_here            # Secret key for JWT
PORT=5000     
```

* Start the server

You can now start the server using nodemon for development, which will automatically restart the server when changes are made:

```
npm start
```

Note : By default, the server will run on port 5000 (or the port you defined in the .env file).

### Middleware
The API uses middleware for logging requests. The log data is stored automatically in the MongoDB Log collection when performing POST, PUT, and DELETE operations.


# API Routes

Reffer to the `postman.json` file for more detailed API information.


### Endpoints Overview

### Users

| Method    | Endpoint         | Description                |
| :-------- | :--------------- | :------------------------- |
| `GET`     | `/users`         | **Retrieve all users**.    |
| `POST`    | `/users`         | **Create a new user**.     |
| `GET`     | `/users/:id`     | **Retrieve user by ID**.   |
| `PUT`     | `/users/:id`     | **Update user by ID**.     |
| `DELETE`  | `/users/:id`     | **Delete user by ID**.     |
| `POST`    | `/users/login`   | **User login**.            |

### Roles

| Method    | Endpoint         | Description                    |
| :-------- | :--------------- | :----------------------------- |
| `GET`     | `/roles`         | **Retrieve all roles**.        |
| `POST`    | `/roles`         | **Create a new role**.         |
| `GET`     | `/roles/:id`     | **Retrieve role by ID**.       |
| `PUT`     | `/roles/:id`     | **Update role by ID**.         |
| `DELETE`  | `/roles/:id`     | **Delete role by ID**.         |

### Departments

| Method    | Endpoint           | Description                        |
| :-------- | :----------------- | :--------------------------------- |
| `GET`     | `/departments`     | **Retrieve all departments**.      |
| `POST`    | `/departments`     | **Create a new department**.       |
| `GET`     | `/departments/:id` | **Retrieve department by ID**.     |
| `PUT`     | `/departments/:id` | **Update department by ID**.       |
| `DELETE`  | `/departments/:id` | **Delete department by ID**.       |

### Patients

| Method    | Endpoint        | Description                   |
| :-------- | :-------------- | :---------------------------- |
| `GET`     | `/patients`     | **Retrieve all patients**.    |
| `POST`    | `/patients`     | **Create a new patient**.     |
| `GET`     | `/patients/:id` | **Retrieve patient by ID**.   |
| `PUT`     | `/patients/:id` | **Update patient by ID**.     |
| `DELETE`  | `/patients/:id` | **Delete patient by ID**.     |

### Rooms

| Method    | Endpoint        | Description                 |
| :-------- | :-------------- | :-------------------------- |
| `GET`     | `/rooms`        | **Retrieve all rooms**.     |
| `POST`    | `/rooms`        | **Create a new room**.      |
| `GET`     | `/rooms/:id`    | **Retrieve room by ID**.    |
| `PUT`     | `/rooms/:id`    | **Update room by ID**.      |
| `DELETE`  | `/rooms/:id`    | **Delete room by ID**.      |

### Features

| Method    | Endpoint        | Description                   |
| :-------- | :-------------- | :---------------------------- |
| `GET`     | `/features`     | **Retrieve all features**.    |
| `POST`    | `/features`     | **Create a new feature**.     |
| `GET`     | `/features/:id` | **Retrieve feature by ID**.   |
| `PUT`     | `/features/:id` | **Update feature by ID**.     |
| `DELETE`  | `/features/:id` | **Delete feature by ID**.     |

### Feature Mappings

| Method    | Endpoint                        | Description                                |
| :-------- | :------------------------------ | :---------------------------------------- |
| `GET`     | `/featureMappings`              | **Retrieve all feature mappings**.        |
| `POST`    | `/featureMappings`              | **Create a new feature mapping**.         |
| `GET`     | `/featureMappings/:id`          | **Retrieve feature mapping by ID**.       |
| `PUT`     | `/featureMappings/:id`          | **Update feature mapping by ID**.         |
| `DELETE`  | `/featureMappings/:id`          | **Delete feature mapping by ID**.         |
| `GET`     | `/feature-mappings/role/:name`  | **Retrieve mapped features by role name**.|

### Admissions

| Method    | Endpoint        | Description                    |
| :-------- | :-------------- | :----------------------------- |
| `GET`     | `/admissions`   | **Retrieve all admissions**.   |
| `POST`    | `/admissions`   | **Create a new admission**.    |
| `GET`     | `/admissions/:id` | **Retrieve admission by ID**. |
| `PUT`     | `/admissions/:id` | **Update admission by ID**.   |
| `DELETE`  | `/admissions/:id` | **Delete admission by ID**.   |

### Appointments

| Method    | Endpoint                       | Description                                 |
| :-------- | :----------------------------- | :----------------------------------------- |
| `POST`    | `/appointments`                | **Create a new appointment**.              |
| `GET`     | `/appointments`                | **Retrieve all appointments**.             |
| `GET`     | `/appointments/:id`            | **Retrieve appointment by ID**.            |
| `PUT`     | `/appointments/:id`            | **Update appointment by ID**.              |
| `DELETE`  | `/appointments/:id`            | **Delete appointment by ID**.              |
| `PUT`     | `/appointments/:id/status`     | **Update appointment status**.             |
| `GET`     | `/appointments/patient/:id`    | **Retrieve appointments by patient ID**.   |
| `GET`     | `/appointments/scheduled/:id`  | **Retrieve scheduled appointments by patient ID**. |

### Billings

| Method    | Endpoint         | Description                  |
| :-------- | :--------------- | :--------------------------- |
| `GET`     | `/billings`      | **Retrieve all billings**.   |
| `POST`    | `/billings`      | **Create a new billing**.    |
| `GET`     | `/billings/:id`  | **Retrieve billing by ID**.  |
| `PUT`     | `/billings/:id`  | **Update billing by ID**.    |
| `DELETE`  | `/billings/:id`  | **Delete billing by ID**.    |

### Payments

| Method    | Endpoint                  | Description                          |
| :-------- | :------------------------ | :----------------------------------- |
| `POST`    | `/payments`               | **Create a new payment**.            |
| `GET`     | `/payments`               | **Retrieve all payments**.           |
| `GET`     | `/payments/:id`           | **Retrieve payment by ID**.          |
| `GET`     | `/payments/bill/:billId`  | **Retrieve payments by Bill ID**.    |
| `GET`     | `/payments/patient/:id`   | **Retrieve payments by Patient ID**. |
| `PUT`     | `/payments/:id/status`    | **Update payment status**.           |
| `DELETE`  | `/payments/:id`           | **Delete payment by ID**.            |
| `GET`     | `/payments/status/:status`| **Retrieve payments by status**.     |

### Statistics

| Method    | Endpoint        | Description                          |
| :-------- | :-------------- | :----------------------------------- |
| `GET`     | `/statistics/counts` | **Retrieve total counts**.      |

### Assignments (Doctor-Patient)

| Method    | Endpoint                 | Description                           |
| :-------- | :----------------------- | :------------------------------------ |
| `POST`    | `/doctorPatient/assignments` | **Create doctor-patient assignment**.|
| `GET`     | `/doctorPatient/assignments` | **Retrieve all assignments**.        |
| `GET`     | `/doctorPatient/assignments/:id` | **Retrieve assignment by ID**.      |
| `PUT`     | `/doctorPatient/assignments/:id` | **Update assignment by ID**.        |
| `DELETE`  | `/doctorPatient/assignments/:id` | **Delete assignment by ID**.        |

### Assignments (Nurse-Doctor)

| Method    | Endpoint                 | Description                            |
| :-------- | :----------------------- | :------------------------------------- |
| `POST`    | `/nurseDoctor/assignments` | **Create nurse-doctor assignment**.   |
| `GET`     | `/nurseDoctor/assignments` | **Retrieve all assignments**.         |
| `DELETE`  | `/nurseDoctor/assignments/:id` | **Delete assignment by ID**.         |

### Assignments (Technician-Patient)

| Method    | Endpoint                     | Description                                |
| :-------- | :--------------------------- | :----------------------------------------- |
| `POST`    | `/technicianPatient/assignments` | **Create technician-patient assignment**. |
| `GET`     | `/technicianPatient/assignments` | **Retrieve all assignments**.             |
| `DELETE`  | `/technicianPatient/assignments/:id` | **Delete assignment by ID**.             |

### Assignments (Technician-Department)

| Method    | Endpoint                           | Description                                    |
| :-------- | :--------------------------------- | :---------------------------------------------|
| `POST`    | `/technicianDepartment/assignments`| **Create technician-department assignment**.  |
| `GET`     | `/technicianDepartment/assignments`| **Retrieve all assignments**.                 |
| `DELETE`  | `/technicianDepartment/assignments/:id` | **Delete assignment by ID**.                 |

