const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/bbelka",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });