
const mongoose = require("mongoose")

require("dotenv").config()

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {})
    .then(() => {console.log("Connection Established")})
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
}

module.exports = dbConnect