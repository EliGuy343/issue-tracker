const express = require('express')
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator');

const User = require('../models/User');
const Issue = require('../models/Issue');




const router = express.Router();

//@route      GET  api/issues
//@desc       get all tracked issues
//@access     public


router.get('/', auth ,async (req, res) => {
    try {

        const issues = await Issue.find({user: req.user.id}).sort({date: -1});
        res.json(issues);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error"); 
    }

})


//@route      POST api/issues
//@desc       post an issue
//@access     private


router.post('/',[auth,[
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, category,type } = req.body; 
    try {
        const newIssue = new Issue({
            name,
            category,
            type,
            date:Date.now(),
            user: req.user.id,
            userName: req.user.user   
        });
    
        const issue = await newIssue.save(); 
        res.json(issue);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");

    }

})



//@route      PUT api/issues/:id
//@desc       edit an issue
//@access     private


router.put('/:id',auth , async (req, res) => {
    const {name,category, type} = req.body; 

    // Create contact obj

    const issueFields = {}
    if(name) issueFields.name = name;
    if(category) issueFields.category = category;
    if(type) issueFields.type = type;

    try {
        let issue = await Issue.findById(req.params.id);

        if(!issue) {
            return res.status(404).json({msg :'Issue not found'});
        }

        if(issue.user.toString() !== req.user.id && !req.user.admin) {
            return res.status(401).json({msg: 'unauthorized Request'});
        }

        issue = await Issue.findByIdAndUpdate(req.params.id,
            {$set:issueFields},
            {new: true});


        res.json(issue);

         
    } catch (error) {
        console.error(error.message);
        res.status.send('Server Error');
    }


});

//@route         DELETE  api/issues/:id
//@desc          delete an issue
//@access        private


router.delete('/:id',auth, async (req, res) => {
    try {
        let issue = await Issue.findById(req.params.id);

        if(!issue) {
            return res.status(404).json({msg :'Issue not found'});
        }

        if(issue.user.toString() !== req.user.id && !req.user.admin) {
            return res.status(401).json({msg: 'unauthorized Request'});
        }

        issue = await Issue.findByIdAndRemove(req.params.id);


        res.json(issue);

         
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})
    
module.exports = router;
