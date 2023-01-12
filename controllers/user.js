import express from 'express';
import {check ,validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
  }
  const { name, email, password  } = req.body;
  try {
      let user = await User.findOne({email});
      if(user) {
          return res.status(400).json({msg: "user already exists"});
      }
      user = new User({
          admin:false,
          name,
          email,
          password,
          date:Date.now()
      })

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
          user: {
              id: user.id,
              user: user.name,
              admin:user.admin
          }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn:36000,
      },
      (error,token) => {
          if(error) {
              throw error;
          }
          res.json({token});
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
}

export const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
  }
  const { name, email, password  } = req.body;
  try {
      let user = await User.findOne({email});
      if(user) {
          return res.status(400).json({msg: "user already exists"});
      }
      user = new User({
          admin:true,
          name,
          email,
          password,
          date:Date.now()
      })
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
          user: {
              id: user.id,
              user: user.name,
              admin:user.admin
          }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn:36000,
      },
      (error,token) => {
          if(error) {
              throw error;
          }
          res.json({token});
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
}