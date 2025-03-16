const express = require("express")
const router = express.Router();
const user = require('../models/user')
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "thisismyfirstmernproject"

router.post('/create', [
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name', 'incorrect name').isLength({ min: 5 }),
    body('email').isEmail()
],

    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            })
            console.log('sucess')
            res.json({ success: true })
        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await user.findOne({ email });

        if (!userData) {
            return res.status(400).json({ success: false, message: 'Email does not exist' });
        }

        const pswdCompare = await bcrypt.compare(password, userData.password)
        if (!pswdCompare) {
            return res.status(400).json({ success: false, message: 'Wrong password' });
        }

        const data = {
            user: {
                id: userData.id
            }
        }

        const authtoken = jwt.sign(data, jwtSecret)

        return res.status(200).json({ success: true, authtoken: authtoken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;