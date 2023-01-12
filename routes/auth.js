import express from 'express';
import {check ,validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import { authUser, loginUser } from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, authUser);
router.post('/',[check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 letters').isLength({ min:6 })],
    loginUser
);

export default router;
