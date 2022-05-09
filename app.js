const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const date = require(__dirname+ "/date.js")
const app = express();

const listItems = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res)
 {
    let day = date.getDate();  //acquiring the return value of getDate() function in date.js

    res.render("list", {
        listTitle: day,
        listItems: listItems
    });
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        listItems: workItems
    });
});

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/", function (req, res) {

    if (req.body.listSubmit === "Work") { 
        workItems.push(req.body.listitem);
        res.redirect("/work");
    } else {
        listItems.push(req.body.listitem);
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000.");
});