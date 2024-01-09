
const express = require("express")
const { createUser } = require("../controller/Auth")
const router = express.Router()

router.post("/createUser",createUser)

module.exports = router