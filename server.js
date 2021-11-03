const express = require('express');
const session = require('express-session');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const routes = require('./routes');

require('dotenv').config();
require('./config/passport');
require('connect-mongo')(session);

const app = express();
const PORT = process.env.PORT 

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:[`${process.env.ORIGIN}`],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true //allow session cookie to pass through
    }));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});