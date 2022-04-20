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
    res.render("todos/index", { title: "All ToDos", todoDB });
});

// new route (get)
app.get("/todos/new", (req, res) => {
    // render the new todo view
    res.render("todos/new", { title: "New Todo" });
});

// create route (post)
app.post("/todos", (req, res) => {
    try {
        // destruct new todo text from req body
        const { text } = req.body;
        // define new todo obj
        const newTodoObj = { _id: randomUUID(), text, dateCreated: new Date(), dateUpdated: "" };
        // push new todo obj to todoDB arr
        todoDB.push(newTodoObj);
        res.redirect("/todos");
    } catch (error) {
        res.send(`something went wrong<br><a href="/">home</a>`);
    }
});

// show route (get)
app.get("/todos/:_id", (req, res) => {
    // destruct id from url
    const { _id } = req.params;
    // validate id
    const todo = todoDB.find((todoObj) => todoObj._id === _id);
    // console.log(todo);
    if (todo) {
        // render show view if _id is valid
        res.render("todos/show", { title: todo.text, todo });
    } else {
        // render 404 page if _id is invalid
        res.send(`something went wrong<br><a href="/">home</a>`);
    }
});

// edit route (get)
app.get("/todos/:_id/edit", (req, res) => {
    try {
        // destruct id from req params
        const { _id } = req.params;
        // query todo obj using _id
        const todo = todoDB.find((todoObj) => todoObj._id === _id);
        if (todo) {
            // render show view if _id is valid
            res.render("todos/edit", { title: todo.text, todo });
        } else {
            // render 404 page if _id is invalid
            res.send(`something went wrong<br><a href="/">home</a>`);
        }
    } catch (error) {
        console.log(error);
        res.send(`something went wrong<br><a href="/">home</a>`);
    }
});

// update route (put)
app.put("/todos/:_id", (req, res) => {
    try {
        const { text: newText } = req.body;
        // destruct id from req params
        const { _id } = req.params;
        // query todo obj using _id
        const todo = todoDB.find((todoObj) => todoObj._id === _id);
        if (todo) {
            // update todo text and last updated timestamp
            todo.text = newText;
            todo.dateUpdated = new Date();
            // redirect to index
            res.redirect("/todos");
        } else {
            // render 404 page if _id is invalid
            res.send(`something went wrong<br><a href="/">home</a>`);
        }
    } catch (error) {
        console.log(error);
        res.send(`something went wrong<br><a href="/">home</a>`);
    }
});

// delete route (delete)
app.delete("/todos/:_id", (req, res) => {
    try {
        // destuct todo id
        const { delBtn } = req.body;
        const { _id: todoId } = req.params;
        // check if delete request was made legally
        if (delBtn === "delBtn") {
            // find todo to be deleted and backup
            const todo = todoDB.find(({ _id }) => _id === todoId);
            deletedtodoDB.push(todo);
            // filter out todo to be deleted
            const newTodoDB = todoDB.filter(({ _id }) => _id !== todoId);
            todoDB = newTodoDB;
            console.log(deletedtodoDB);
            res.redirect("/todos");
        }
    } catch (error) {
        console.log(error);
    }
});

// start server and listen on port
const portNumber = 3000;
app.listen(portNumber, () => {
    console.log(`listening on port ${portNumber}`);
    // console.log(randomUUID());
});

let todoDB = [
    {
        _id: randomUUID(),
        text: "Hello World",
        completed: true,
        dateCreated: new Date(1649923181674),
        dateUpdated: new Date(1649923191974),
    },
    {
        _id: randomUUID(),
        text: "Lorem Ipsum",
        completed: false,
        dateCreated: new Date(1649923181674),
        dateUpdated: "",
    },
];

const deletedtodoDB = [];
