// require packages
const { join } = require("path");
const express = require("express");
const methodOverride = require("method-override");
const { randomUUID } = require("crypto");

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
// root route (get)
app.get("/", (req, res) => {
    res.redirect("/todos");
});
// root route (post)
app.post("/", (req, res) => {
    res.redirect("/todos");
});

// index route (get)
app.get("/todos", (req, res) => {
    // render the index view
    res.render("todos/index", { title: "All ToDos", todoList });
});

// start server and listen on port
const portNumber = 8080;
app.listen(portNumber, () => {
    console.log(`listening on port ${portNumber}`);
    // console.log(randomUUID());
});

const todoList = [
    {
        _id: randomUUID(),
        text: "Hello World",
        dateCreated: new Date(1649923181674),
        dateUpdated: "",
    },
    {
        _id: randomUUID(),
        text: "Lorem Ipsum",
        dateCreated: new Date(1649923181674),
        dateUpdated: "",
    },
];

const deletedTodoList = [];
