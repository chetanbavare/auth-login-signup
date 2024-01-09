
const User = require("../models/User")
const bcrypt = require("bcrypt")

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

module.exports = {createUser}