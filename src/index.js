const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");


app.set("port", process.env.PORT || 3014);
app.listen(app.get("port"), () => console.log("Server start http://localhost:"+app.get("port")));

app.use(express.static(path.join(__dirname,"../public")));

//uso JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//app view
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"))

app.use(methodOverride("_method"));

//app routes
//main
const main = require("./routes/main");
app.use(main);


