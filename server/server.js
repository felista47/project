const express = require("express");
const path = require("path");
const app = express();

const connectDB = require("./database");
connectDB();

// Middleware to parse JSON
app.use(express.json());

const vendorRouter = require('./routes/vendors')
app.use('/vendor',vendorRouter)

const parentRouter = require('./routes/parents')
app.use('/parent',parentRouter)

const server = app.listen(process.env.PORT || 5000);
const portNumber = server.address().port;
console.log(`Server is running on port ${portNumber}`);