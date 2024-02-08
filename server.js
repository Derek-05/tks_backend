
const express = require("express");
const app = express();
const cors =require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");

//Port
const PORT = process.env.PORT || 8080;


//import all routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require ('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');



//Middleware
app.use(morgan ('dev'));
app.use(bodyParser.json ({limit: "5mb"}));
app.use(bodyParser.urlencoded ({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', // Change this to your client's origin
credentials: true}));
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





app.listen(PORT, ()=> console.log (`Server running on PORT ${PORT}`))