const express = require("express");
const userRouter = express.Router();
const UserModel=require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

userRouter.post("/register" , async(req , res) => {
   const {name ,mobile_number, email, password , confirm_password} = req.body;
   
   if(password === confirm_password){
      try{
       bcrypt.hash(password, 5, async(err, hash)  => {
        const data = new UserModel({name,mobile_number,email,password:hash,confirm_password:hash});
         await data.save();
         res.send("user registration successfully");   
        });
     }
     catch(err){
       res.send(err.message);
      }
    }
      else {
        res.send("Please fill same password");
         }
    })

  userRouter.post("/login" , async(req, res) => {
   const {email,password} = req.body;
   const collection = await UserModel.find({email:email});
   bcrypt.compare(password, collection[0].password, function(err, result) {
         if(result){
           if(collection.length > 0){
               var token = jwt.sign({ day: "monday"}, 'masai');
                 res.send({"msg" : "login successfully","token" : token});
               }
           
               else {
                     res.send({"msg" : "Register first"})
               }
         }
         else {
           res.send({"msg" : "Incorrect email or passord"})
         }
   });    
  })

  module.exports = userRouter