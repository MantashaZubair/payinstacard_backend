const express = require("express")
const dotenv = require("dotenv")
const cors   = require('cors')
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")



//configuire env
dotenv.config() 

//database connection
connectDB()




//test object
const app = express()

//middleware
app.use(cors())
app.use(express.json())



//routes
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("API is running..");
})
app.use('/api/v1/auth', authRoutes)

//PORT
const PORT =process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
