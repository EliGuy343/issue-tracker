const express = require('express')
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator');

const User = require('../models/User');
const Issue = require('../models/Issue');
const Fix = require('../models/Fix');


//@route      POST api/issues
//@desc       post an issue
//@access     private


router.post('/',[auth,[
    check('name', 'name is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {issue, solution } = req.body;

    const issueCheck = Fix.findOne({issue:issue}) 

    if(issueCheck) {
        return res.status(400).json({msg:"Fix already exists for this issue"})
    }

     
    try {
        const newFix = new Fix({
            issue,
            solution,
            date:Date.now(),
            user: req.user.id,
            userName: req.user.user   
        });
    
        const fix = await newFix.save(); 
        res.json(fix);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");

    }

})