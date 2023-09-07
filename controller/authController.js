const userModels = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController =async(req,res)=>{
try {
    const {name,email,password,phone}= req.body
    if(!name||!email||!password||!phone){
        return res.status(401).send({
            success:false,
            message:"one or more mandatory fields are empty"
        })
    }
    const existingUser =await userModels.findOne({email:email})
    // existing user 
    if(existingUser){
       return res.status(201).send({
        success:false,
        message:"User already exist"
       })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await new userModels({name,email,phone,password:hashedPassword}).save()
    res.status(200).send({
        success:true,
        message:"user register successfull",
        user
    })
     

} catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        message:"something went wrong while register user",
        error
     })
}
}

//login controller
const loginController = async(req,res)=>{
  try {
    const {email,password}= req.body
    if( !email|| !password){
        return res.status(401).send({
            success:false,
            message:"one or more mandatory fields are empty"
        })
    }
    const user =await userModels.findOne({email:email})
    // existing user 
    if(!user){
       return res.status(201).send({
        success:false,
        message:"User is not exist"
       })
    }
    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
       return res.status(201).send({
            success:false,
            message:"invalid cradentials"
        })
    } 
    // const expiresIn = 10;
    // const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn})
    
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).send({
        success:true,
        message:"user login successfull",
        user,
        token
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"something went wrong while login user",
     })
  }
}


 //update user

 const updateProfileController =async(req,res)=>{
    try {
        const {name,email,phone} = req.body
        const user = await userModels.findById(req.user._id);
        const updatedUser = await userModels.findByIdAndUpdate(req.user._id,{
            name:name ||user.name,
            phone:phone||user.phone,
            email:email ||user.email,
        }, { new: true })
        res.status(200).send({
            success:true,
            message:"profile updated Successfully",
            updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while update user profile",
            error,
        })
    }
}

const deleteProfileController = async(req,res)=>{
 try {
    const id = req.params.id
    const user = await userModels.findByIdAndDelete(id)
    if(user){
        res.status(200).send({
            success:true,
                message:"delete user successfull",
               
        })
    }else{
        res.status(400).send({
            success:false,
                message:"UserId is not Exist",
               
        })  
    }
    
 } catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while delete user profile",
            error,
        })
 }
}



module.exports={registerController,loginController,updateProfileController,deleteProfileController}