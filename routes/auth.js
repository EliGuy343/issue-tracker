const express = require('express');
const {check ,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');



//@route GET  api/auth
//@desc       login a user
//@access     private


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.send('Server Error');
    }
})

//@route POST api/auth
//@desc       Auth user & get token
//@access     public


router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters').isLength({ min:6 }) 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email});

        if(!user) {
            return res.status(500).json({msg:"User doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(500).json({msg:"Incorrect Password"});
        }

        
        const payload = {
            user: {
                id: user.id
            }
        }
        
        
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn:36000,
            }, 
            (error,token) => {
                if(error) {
                    throw error;
                }
                res.json({token});
            }); 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");

    }
})


module.exports = router;
