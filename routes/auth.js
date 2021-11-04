const express = require('express')

const router = express.Router();

//@route GET  api/auth
//@desc       login a user
//@access     private


router.get('/', (req, res) => {
    res.send('Get Logged in user');
})

//@route POST api/auth
//@desc       Auth user & get token
//@access     public


router.post('/', (req, res) => {
    res.send('Log in user');
})


module.exports = router;
