const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const logger = require('morgan');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);


//Sets up the Express app
const app = express();
const PORT = process.env.PORT || 8080

app.use(logger("dev"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());

//set up cors to allow client requrests
app.use(
    cors({
        origin: ["http://localhost:3000"],
        // origin: ["https://bbelka.herokuapp.com"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true //allow session cookie to pass through
    }));


app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/bbelka",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});