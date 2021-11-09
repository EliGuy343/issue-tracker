const express = require('express');
const {check ,validationResult } = require('express-validator');

const router = express.Router();

const User = require('../models/User');

//@route POST api/users
//@desc       register a user
//@access     public



router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters').isLength({ min:6 })   
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send('passed');
    
})


module.exports = router;
