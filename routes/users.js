import express from 'express';
import {check } from 'express-validator';
import { registerAdmin, registerUser } from '../controllers/user.js';


const router = express.Router();

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters')
        .isLength({ min:6 })
    ],
    registerUser
)

router.post('/admin',[
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters')
        .isLength({ min:6 })
    ],
    registerAdmin
)


export default router;
