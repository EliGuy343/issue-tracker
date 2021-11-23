const express = require('express')
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator');
const mongoose = require('mongoose');


const router = express.Router();


const User = require('../models/User');
const Issue = require('../models/Issue');
const Fix = require('../models/Fix');


//@route      GET  api/fixes
//@desc       get all fixes
//@access     public

router.get('/', async (req, res) => {
    try {

        const fixes = await Fix.find().sort({date: -1});
        res.json(fixes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error"); 
    }

})

//@route      GET  api/issues
//@desc       get all fixes of a specfic user
//@access     public


router.get('/user', auth ,async (req, res) => {
    try {

        const fixes = await Fix.find({user: req.user.id}).sort({date: -1});
        res.json(fixes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error"); 
    }

})

//@route      POST api/fixes
//@desc       post a fix
//@access     private


router.post('/',auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {issue, solution } = req.body;

    const issueForFixCheck = await Fix.findOne({issue}) 

    if(issueForFixCheck) {
        return res.status(400).json({msg:"Fix already exists for this issue"})
    }
    
    const issueCheck = await Issue.findById(issue);    
    console.log(issueCheck)
    
    if(!issueCheck) {
        return res.status(400).json({msg:"Invalid Issue ID"});
    }

     
    try {
        const newFix = new Fix({
            issue:mongoose.Types.ObjectId(issue),
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


module.exports = router;