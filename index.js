const express=require("express")
const database=require("./config/db")
const errorHandler=require('./handler/error')
const app=express()
const UserRouter=require('./route/user_route')


app.use(express.json())
database.connection()
// app.use(errorHandler)

app.use('/api',UserRouter)

app.use('/',function(req,res){
    return res.status(200).json({messagge:"Welcome to Nitesh"})
})
app.listen(5000,()=>{
    console.log("Server is running...")
})