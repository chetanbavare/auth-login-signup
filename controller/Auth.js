
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createUser = async(req,res) => {
    try {
        const {name,email,password,role} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(404).json({
                success : false,
                message : "User already exists"
            })
        }
        let hashedpassword
        try {
            hashedpassword = await bcrypt.hash(password, 10)
        } catch (e) {
            return res.status(400).json({
                success : false,
                message : "password hashing error"
            })
        }
        const response = await User.create({
            name,email,password:hashedpassword,role
        })
        return res.status(200).json({
            success : true,
            message : "User created successfully"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success : false,
            message : "User not created"
        })
    }
}

const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(404).json({
                success : false,
                message : "Credentials missing"
            })
        }
        let existingUser = await User.findOne({email})
        if(!existingUser) {
            return res.status(404).json({
                success : false,
                message : "user is not registered"
            })
        }

        const payload = {
            id : existingUser._id,
            role : existingUser.role,
            email : existingUser.email
        }

        if (bcrypt.compare(password,existingUser.password)) {
            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn : "2h"
            })
            existingUser = existingUser.toObject()
            existingUser.token = token
            existingUser.name = undefined

            res.cookie("token",token,{
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }).status(200).json({
                token,
                existingUser,
                message : "token created"
            })
            
        } else {
            return res.status(404).json({
                success : false,
                message : "password doesnt match"
            })
        }
    } catch(e){
            console.log("error",e)
            return res.status(500).json({
                success : false,
                message : e,
            })
    }
}

module.exports = {createUser, loginUser}