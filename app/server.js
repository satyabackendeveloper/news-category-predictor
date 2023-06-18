const express = require('express')
require("dotenv/config");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const notFound = require("./middleware/not-found.middleware.js");
const errorHandler = require("./middleware/error.middleware.js");
const v1Routes = require("./api/routes.index.js");

require("./shared/dbconnection");


const app = express();
// set security HTTP headers
app.use(helmet());
// added cross origin request support
app.use(cors());
// parse json request body
app.use(express.json());
// sanitize request data
app.use(xss());
app.get("/", (req, res) => {
    res.send("Server Running Now");
});
app.use("/api", v1Routes);
// send back a 404 error for any unknown api request
app.use(notFound);
// handle error
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("API server started sucessfully on port " + process.env.PORT);
});
