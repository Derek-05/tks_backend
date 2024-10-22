# tks_backend

# Backend Documentation

## Introduction

The backend of a web application is responsible for managing the overall functionality of the web application, interacting with the server and the database to process user requests and return appropriate responses. This document provides a detailed description of the backend developed for this project, including its structure, technologies used, and available endpoints.

## Technologies Used

For the development of the backend of this application, Node.js was utilized along with the Express.js framework. Below are some of the main reasons for choosing these technologies:

- **Node.js**: It is a JavaScript runtime environment on the server-side that allows using JavaScript outside of the frontend environment. Node.js provides optimal performance and scalability in web applications, along with a robust ecosystem of reusable packages via npm.

- **Express.js**: It is the most popular web framework for Node.js, providing a set of tools to facilitate the development of web applications, including route definition, integration with template engines, middleware handling, among others.

## Backend Structure

The backend follows the Model-View-Controller (MVC) architecture, which divides the application into three main components:

- **Model**: It represents the data logic and defines the structure and operations on this data. In this project, models were used to define the information of users, applicants, jobs, among others.

- **View**: It contains the visual elements that interact with the user. In this project, the view was implemented using the React framework in the frontend.

- **Controller**: It acts as an intermediary between the model and the view, managing user requests and updating the view accordingly. Controllers also handle defining API endpoints and interacting with the database.

## Controllers

Several controllers were implemented to handle the different functionalities of the application. Below are the main controllers along with their corresponding endpoints:

### User Controllers

1. **Show all users**
   - URL: `/allusers`
   - Method: GET
   - Description: Retrieves a paginated list of all users.

2. **Show a single user**
   - URL: `/singleuser/:id`
   - Method: GET
   - Description: Retrieves a specific user by their ID.

3. **Edit user**
   - URL: `/edituser/:id`
   - Method: PUT
   - Description: Updates the information of an existing user by their ID.

4. **Delete user**
   - URL: `/admin/user/delete/:id`
   - Method: DELETE
   - Description: Deletes a user by their ID.

### Applicant Controllers

1. **Get all applicants**
   - URL: `/allApplicants`
   - Method: GET
   - Description: Retrieves a list of all applicants.

2. **Get an applicant by ID**
   - URL: `/getApplicants/:id`
   - Method: GET
   - Description: Retrieves a specific applicant by their ID.

3. **Update an existing applicant by ID**
   - URL: `/updateApplicants/:id`
   - Method: PUT
   - Description: Updates the information of an existing applicant by their ID.

4. **Delete an applicant by ID**
   - URL: `/deleteApplicants/:id`
   - Method: DELETE
   - Description: Deletes an applicant by their ID.

5. **Create a new applicant**
   - URL: `/create/applicant`
   - Method: POST
   - Description: Creates a new applicant.

### Job Controllers

1. **Get all job offerings**
   - URL: `/allJobs`
   - Method: GET
   - Description: Retrieves a list of all job offerings.

2. **Get a job offering by ID**
   - URL: `/job/:id`
   - Method: GET
   - Description: Retrieves a job offering by its ID.

3. **Create a new job offering**
   - URL: `/createJob`
   - Method: POST
   - Description: Creates a new job offering.

4. **Update an existing job offering by ID**
   - URL: `/updateJob/:id`
   - Method: PUT
   - Description: Updates an existing job offering by its ID.

5. **Delete a job offering by ID**
   - URL: `/deleteJob/:id`
   - Method: DELETE
   - Description: Deletes a job offering by its ID.

### Authentication Controllers

1. **Sign Up**
   - URL: `/signup`
   - Method: POST
   - Description: Registers a new user.

2. **Sign In**
   - URL: `/signin`
   - Method: POST
   - Description: Authenticates the user to log in.

3. **Logout**
   - URL: `/logout`
   - Method: GET
   - Description: Logs out the user.

4. **Get User Profile**
   - URL: `/me`
   - Method: GET
   - Description: Retrieves the user profile.

## Routes

The defined routes in the backend are the interface through which clients can access the different functionalities of the application. The routes are associated with the corresponding controllers to handle requests appropriately.

## Custom Middleware

Custom middleware has been implemented to add additional functionalities to the application, such as user authentication, error handling, among others.

## Conclusions

The backend developed for this application provides a robust and well-organized structure to handle the various functionalities of the application. The combination of Node.js and Express.js offers a flexible and scalable development environment, while the MVC architecture facilitates understanding and maintaining the code.

For more details on the specific implementation of each functionality, please refer to the documentation of the controllers and corresponding routes.

