const express = require('express')

const router = express.Router();

//@route      GET  api/issues
//@desc       get all tracked issues
//@access     public


router.get('/', (req, res) => {
    res.send('get tracked issues');
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
