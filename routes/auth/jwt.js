const router = require("express").Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const util = require("util");

const authenticateUser = require("../middleware/authenticateUser");
const validateBodyWith = require("../middleware/validateBodyWith");

const {loginValidator, registerValidator}=require("../validation");

