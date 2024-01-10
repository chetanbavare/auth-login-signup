
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async(req,res,next) => {
    try {
        const {token} = req.body
        if(!token) {
            return res.status(404).json({
                success : false,
                message : "Token Missing"
            })
        }
        try {
            const payload = jwt.decode(token, process.env.JWT_SECRET) 
            req.user = payload
        } catch (e) {
            return res.status(404).json({
                success : false,
                error : e,
                message : "Token Invalid"
            })
        }
        next()
    } catch(e) {
        return res.status(404).json({
            success : false,
            message : "Intenal Server Error"
        })
    }
}

exports.isStudent = async(req,res,next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(404).json({
                success : false,
                message : "this is protected route for student only"
            })
        }
        next()
    } catch (e) {
        return res.status(404).json({
            success : false,
            message : "server error",
            error : e
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(404).json({
                success : false,
                message : "this is protected route for admins only"
            })
        }
        next()
    } catch (e) {
        return res.status(404).json({
            success : false,
            message : "server error",
            error : e
        })
    }
}

