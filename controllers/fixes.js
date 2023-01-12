import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Issue from '../models/Issue.js';
import Fix from '../models/Fix.js';

export const getFixes = async (req, res) => {
  try {
      const fixes = await Fix.find().sort({date: -1});
      res.json(fixes);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
}

export const getUserFixes = async (req, res) => {
  try {
      const fixes = await Fix.find({user: req.user.id}).sort({date: -1});
      res.json(fixes);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
}

export const getFixByIssue = async (req, res) => {
  try {
      const fix = await Fix.findOne({issue: req.params.id})
      res.json(fix);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
}

export const submitFix = async (req, res) => {
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
}

export const editFix = async (req, res) => {
  const {solution} = req.body;
  const fixFields = {}
  if(solution) fixFields.solution = solution;
  try {
      let fix = await Fix.findById(req.params.id);
      console.log(req.params.id);
      if(!fix) {
          return res.status(404).json({msg :'fix not found'});
      }

      if(fix.user.toString() !== req.user.id && !req.user.admin) {
          return res.status(401).json({msg: 'unauthorized Request'});
      }

      fix = await Fix.findByIdAndUpdate(req.params.id,
          {$set:fixFields},
          {new: true});

      res.json(fix);
  } catch (error) {
      console.error(error.message);
      res.status.send('Server Error');
  }
}

export const deleteFix = async (req, res) => {
  try {
      let fix = await Fix.findById(req.params.id);
      if(!fix) {
          return res.status(404).json({msg:'Fix not found'});
      }
      let issue = await Issue.findById(fix.issue);

      if(fix.user.toString() !== req.user.id && issue.user.toString() !== req.user.id  && !req.user.admin) {
          return res.status(401).json({msg: 'unauthorized Request'});
      }

      fix = await Fix.findByIdAndRemove(req.params.id);
      res.json(fix);

  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
}