// require packages
const { join } = require("path");
const express = require("express");
const methodOverride = require("method-override");

// *** APP SETTINGS ***
// execute app
const app = express();
// set view engine
app.set("view engine", "ejs");
// set views directory
app.set("views", join(__dirname, "views"));

// *** MIDDLEWARE ***
// parse url-encoded [form data]
app.use(express.urlencoded({ extended: true }));
// override post req to enable certain http verb req

// start server and listen on port
