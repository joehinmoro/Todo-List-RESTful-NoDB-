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
// serve static files used by views
app.use(express.static(join(__dirname, "public")));

// *** MIDDLEWARE ***
// parse url-encoded [form data]
app.use(express.urlencoded({ extended: true }));
// override post req to enable certain http verb req
app.use(methodOverride("_method"));

// *** ROUTING ***

// start server and listen on port
const portNumber = 8080;
app.listen(portNumber, () => {
    console.log(`listening on port ${portNumber}`);
});
