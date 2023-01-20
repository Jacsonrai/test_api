const express=require('express')
const { create_user, login } = require('../controller/user/user_contoller')
const User_Router=express.Router()

//user ed-points
User_Router.post('/create-user',create_user)
User_Router.post('/login',login)

module.exports=User_Router


