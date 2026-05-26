// Import required modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import Sequelize and database connection
const sequelize = require('./database/db');

// Import error handler middleware
const errorHandler = require("./middleware/errorHandler");

// Import all routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

// Import all models
const User = require('./models/userModel');
const Role = require('./models/roleModel');
const JobOffering = require('./models/jobModel');
const Applicants = require('./models/applicantsModel');


// Create an Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || process.env.Port || 8080;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
};

// Middleware configuration
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json({ limit: "5mb" })); // JSON body parser middleware
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true })); // URL-encoded body parser middleware
app.use(cookieParser()); // Cookie parser middleware
app.use(cors(corsOptions)); // CORS middleware
app.use(express.json()); // JSON parser middleware

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
    }
});

const upload = multer({ storage: storage }); // Multer instance

// Use Multer middleware for handling file uploads
app.use(upload.single('file'));

// Make the uploads directory static to serve files
app.use("/api/uploads", express.static("uploads"));

// Routes configuration
app.use('/api', authRoutes); // Authentication routes
app.use('/api', userRoutes); // User routes
app.use('/api', jobRoutes); // Job routes
app.use('/api', applicantRoutes); // Applicant routes

// Custom error middleware
app.use(errorHandler);

// Database synchronization and server startup
sequelize.sync().then(async () => {
    console.log('All tables have been created');
    
    // Ensure default roles are present
    await Role.ensureDefaultRoles();
}).catch((error) => {
    console.error('Error synchronizing the database:', error);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
