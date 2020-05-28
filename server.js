const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const logger = require('logger');

//Sets up the Express app
const app = express();
const PORT = process.env.PORT || 8080

// app.use(logger("dev"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })

app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        // origin: ["https://mgr-talent.herokuapp.com"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true //allow session cookie to pass through
    }));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});