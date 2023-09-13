const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../models/users");
const { Admin } = require("../models/users");


exports.checkToken = async (req, res, next) => {
  try {
  
  
    let checker = req.cookies.authuser;
  

    if (checker) {
      const datas = jwt.verify(checker, process.env.DB_SECRET);
      
   if(datas){
    const user = await User.findOne({ _id: datas._id })
;
    if (user) {

        res.locals.userData = user;
    
    } else {
   
    }
   }
     
      next();
    } else {
      next();
    }
  } catch (error) {
    
    next(); 
  }
};

exports.Checkuser = async (req, res, next) => {

  const user = res.locals.userData;
  req.user = user;
  next();
};
