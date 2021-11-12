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


router.post('/', (req, res) => {
    res.send('issue added');
})



//@route      PUT api/issues/:id
//@desc       edit an issue
//@access     private


router.put('/:id', (req, res) => {
    res.send('Update issue');
})

//@route         DELETE  api/issues/:id
//@desc          delete an issue
//@access        private


router.delete('/:id', (req, res) => {
    res.send('issue deleted');
})
    
module.exports = router;
