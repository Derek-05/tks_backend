
const express = require("express");
const app = express();
const cors =require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require('./database/db'); 
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");

//Port
const PORT = process.env.PORT || 8080;


//import all routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require ('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

// Import all models
const User = require('./models/userModel');
const Role = require('./models/roleModel'); 
const JobOffering = require('./models/jobModel'); 
const Applicants = require('./models/applicantsModel'); 

//Middleware
app.use(morgan ('dev'));
app.use(bodyParser.json ({limit: "5mb"}));
app.use(bodyParser.urlencoded ({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true, allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials']}));
app.use(express.json());


//routes for users
app.use('/api', authRoutes);
app.use('/api', userRoutes);

//routes for jobs
app.use('/api', jobRoutes);

//routes for applicants
app.use('/api', applicantRoutes);

//custom error Middleware
app.use(errorHandler);



// sequelize.sync() will create all table if they doesn't exist in database
sequelize.sync().then(async () => {
    console.log('Todas las tablas han sido creadas');
    
    // Ensure default roles are present
    await Role.ensureDefaultRoles();
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});




app.listen(PORT, ()=> console.log (`Server running on PORT ${PORT}`))