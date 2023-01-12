import express from 'express'
import auth from '../middleware/auth.js';
import { check } from 'express-validator';
import {
    deleteFix,
    editFix,
    getFixByIssue,
    getFixes,
    getUserFixes,
    submitFix
} from '../controllers/fixes.js';

const router = express.Router();

router.get('/', getFixes);
router.get('/user', auth, getUserFixes);
router.get('/issue/:id', getFixByIssue);
router.post('/',
    [auth,[check('solution', 'solution is required').not().isEmpty()]],
    submitFix
);
router.put('/:id', auth, editFix);
router.delete('/:id',auth, deleteFix);

export default router;