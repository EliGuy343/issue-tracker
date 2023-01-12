import express from "express"
import auth from '../middleware/auth.js';
import {check, validationResult } from 'express-validator';
import Issue from '../models/Issue.js';
import { deleteIssue, editIssue, getIssues, getUserIssues, submitIssue } from "../controllers/issues.js";

const router = express.Router();

router.get('/', getIssues);
router.get('/user', auth, getUserIssues);
router.post('/',
    [
        auth,
        [check('name', 'name is required').not().isEmpty(),
        check('category', 'category is required').not().isEmpty()]
    ],
    submitIssue
);
router.put('/:id',auth, editIssue);
router.delete('/:id',auth, deleteIssue);
export default router;
