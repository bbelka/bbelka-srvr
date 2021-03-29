const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const util = require("util");

const passwordHash = require("../../config/passwordHash");

// Get middleware
const authenticateUser = require("../middleware/authenticateUser");
const validateBodyWith = require("../middleware/validateBodyWith");

// Data validators
const { loginValidator, registerValidator } = require("../validation");

// Load User model
const { User } = require("../../models");
const { token } = require("morgan");

const jwtSign = util.promisify(jwt.sign);

// Get the currently authenticated user
router.post("/authenticated", authenticateUser, (req, res) => {

    res.json(req.user);

});

router.post("/login", validateBodyWith(loginValidator), async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        //if user not found
        if (!user) {
            return res.status(404).json({ default: "There is no user associated with that username." });
        };

        const {
            password: encryptedPassword,
            //user object w/o password
            ...secureUser
        } = user._doc;

        const isMatch = await bcrypt.compare(password, encryptedPassword, (err) => console.log(err));

        //if invalid password
        if (!isMatch) {
            return res.status(404).json({ default: "password does not match the password for this user" })
        };

        const payload = {
            id: secureUser._id,
            username: secureUser.username
        };

        //create signed JWT token. Returns to client. Client keeps for reauthentication.a
        const token = await jwtSign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 31556926 //1year
            }
        );

        return res.json({
            success: true,
            token: "Bearer" + token,
            user: secureUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ default: "Something went wrong trying to log in", err })
    }
});

//register new user
router.post("/register", validateBodyWith(registerValidator), async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        //if user alread exists
        if (user) {
            console.log("user exists");
            return res.status(404).json({ username: "Username already exists." });
        };

        const newUser = new User({
            username: username,
            password: await passwordHash(password)
        });

        await newUser.save();

        const {
            password: encryptedPassword,
            ...secureUser
        } = newUser._doc;

        res.json(secureUser);

    } catch (err) {

        console.log("register route catch block", err);
        res.status(500).json({ default: "Something went wrong creating your account." });
    };
});

module.exports = router;