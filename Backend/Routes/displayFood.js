const express = require("express")
const router = express.Router();
const user = require('../models/user')
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/food', (req, res) => {
    res.send([global.food, global.food_category]);

})


module.exports = router;