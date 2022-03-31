let express = require("express");
let path = require("path");
let createError = require("http-errors");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let cors = require("cors");
let router = require("./routes");
let app = express();

// Test whether the database connection is successful
app.get("/", function (req, res) {
    res.send("SQL Success~~");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.use(function (req, res, next) {
    next(createError(404));
});


app.listen("8801", () => {
    console.log("Go to localhost:8801");
});
