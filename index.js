
const express = require("express")
const app = express()

require("dotenv").config()

const PORT = process.env.PORT || 3000

app.use(express.json())

const routes = require("./routes/routes")
app.use("/api/v1",routes)

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})

app.get("/", (req,res) => {
    res.send("Home Page")
})

const dbConnect = require("./config/database")
dbConnect()