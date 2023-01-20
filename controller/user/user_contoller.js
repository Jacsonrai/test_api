const userModel = require("./user_model");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.create_user = async (req,res) => {
  const { username,password,email } = req.body
  const saltRounds=10
//  const hashedPassword= bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       return salt+hash
//     });
// });
// console.log(hashedPassword)
  try {
    const existingUser = await userModel.find({ username: username });
    if (!existingUser) {
      next(err)
    }
    const user=new userModel({
        username:username,
        password:password,
        email:email
    })
   await user.save()
   const token= jwt.sign({username:user.username,email:user.email},"screte")
   return res.status(200).json({
        message:"user data added",
        data:token,
        success:false
    })



  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong....",
      data: error,
    });
  }
};

exports.login=async(req,res)=>{
  const{username,password}=req.body
  try {
  const users=await userModel.find({username:username})
  if(!users){
    return res.status(401).json({
      message:"username not found"
    })
  }
  const matchPassword=jwt.verify(password,users.password)
  if(!matchPassword){
    return res.status(401).json({
      message:"password not found"
    })
  }
  const token=jwt.sign({username:users.username,password:users.password})
  return res.status(200).json({
      message:"user logged in",
      data:users,
      token:token
  })

  



    
  } catch (error) {
    return res.status(500).json({
      message:"Something went wrong",
      data:error
    })
  }

}