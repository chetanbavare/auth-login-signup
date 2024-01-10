
const express = require("express")
const { createUser, loginUser } = require("../controller/Auth")
const { auth, isStudent, isAdmin } = require("../middlwares/auth")
const router = express.Router()

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)

router.get("/authTest", auth, (req,res) => {
    res.status(200).json({
        success : true,
        message : "this is protected routes for test currently"
    }) 
})

router.get("/authStudent", auth, isStudent, (req,res) => {
    res.status(200).json({
        success : true,
        message : "Welcome to Student section"
    }) 
})

router.get("/authAdmin", auth, isAdmin, (req,res) => {
    res.status(200).json({
        success : true,
        message : "Welcome to Admin section"
    })
})

module.exports = router