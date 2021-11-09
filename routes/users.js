const express = require('express');
const {check ,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

//@route POST api/users
//@desc       register a user
//@access     public



router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters').isLength({ min:6 })   
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const { name, email, password  } = req.body; 
    try {

        let user = await User.findOne({email});
    
        if(user) {
            return res.status(400).json({msg: "user already exists"});
        }
        
        user = new User({
            name, 
            email,
            password,
            date:Date.now()
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send('user saved');

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

    
    
})


module.exports = router;
