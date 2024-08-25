const {bcryptPassword ,verifyPassword}=require('../utils/hashing')

const userModel=require('../models/user-model')
const { GenerateToken  } = require('../utils/jwt')


const regsiterCustomer=async(req,res)=>{
    try{
     let {fullName,email,password}=req.body;
       password=await bcryptPassword(password);
       
     let newUser= await userModel.create({
        fullName,
        email,
        password
     })
      
     const payload={
      id:newUser._id
     }

      const token =GenerateToken(payload);
      res.cookie('jwtToken',token);
    
     res.status(201).json({message:"New User created",newUser})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
      }
}

const loginCustomer=async (req,res)=>{
    try{
        // console.log(req.body)
      let {email,password}=req.body
      const user= await userModel.findOne({email})
      if(!user) return res.status(401).json({error:"User not found"})
        // console.log(user)
        const hashpassword=user.password
        // console.log(user.password)
      const ismatch= await verifyPassword(password,hashpassword);
      if(!ismatch) return res.status(401).json({error:"password does not match"})
         
        const payload={
          id:user._id
         }
    
          const token =GenerateToken(payload);
          res.cookie('jwtToken',token);

        return  res.render('shop')
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
      }
}

module.exports={
    regsiterCustomer,
    loginCustomer

};