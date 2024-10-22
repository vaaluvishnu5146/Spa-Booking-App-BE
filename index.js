const Express = require('express');
const AuthRouter = require('./controllers/Auth.controller');
const BookingRouter = require('./controllers/Bookings.controller');
const { createDbConnection } = require('./db');
const API_SERVER = Express();

// Initializing DB Connection
createDbConnection();

// Parsing Incoming request as JSON 
API_SERVER.use(Express.json());

// Controller Injection using middleware
API_SERVER.use('/auth', AuthRouter)
API_SERVER.use('/bookings', BookingRouter);

// Starting and listening to Express server
API_SERVER.listen(3000, "localhost", () => {
    console.log("http://localhost:3000")
});