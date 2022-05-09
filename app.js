const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // to use ejs 
app.use(express.static("public"));

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems = [];


app.get("/", function (req, res) {

    var today = new Date();
    var options = {  // to get a custom date format
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-us", options); // it maps the date into custom options object and creates a string
    res.render("list", { listTitle: day, newListItems: items }); // here the express.js looks for view folder and then looks for ejs file Note:- every key-value pair must be sent only via this get method ans must be specified here
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workitems });
});


// app.post("/work", function (req, res) {
//     var item = req.body.newItem;
//     workitems.push(item);
//     res.redirect("/work");
// })


app.post("/", function (req, res) {
    var item = req.body.listitem;

    if (req.body.list === "work") {  //where list is the name of button whose value is work
        workitems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }


    // res.render("list",{newListItem:item}); will throw error as newListItem key is not specified in get() method
    // res.redirect("/"); // redirects to root route where it will now send the value of newListItem to the ejs page
});


app.listen(3000, function () {
    console.log("Server started at port 3000");
})