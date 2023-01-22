import { validationResult } from 'express-validator';
import Issue from '../models/Issue.js';

export const getIssues = async (req, res) => {
  try {

      const issues = await Issue.find().sort({date: -1});
      res.json(issues);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }

}
export const getUserIssues = async (req, res) => {
  try {
      const issues = await Issue.find({user: req.user.id}).sort({date: -1});
      res.json(issues);

  } catch (error) {
      console.error(error.message);
      res.status(400).send("Server Error");
  }
}

export const submitIssue = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
  }
  const {name, category } = req.body;
  try {
      const newIssue = new Issue({
          name,
          category,
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
}

export const editIssue = async (req, res) => {
  const {name,category, type} = req.body;
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
      res.status(500).send('Server Error');
  }
}

export const deleteIssue = async (req, res) => {
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
}