const {bcryptPassword ,verifyPassword}=require('../utils/hashing')

const userModel=require('../models/user-model')
const { GenerateToken  } = require('../utils/jwt')
const productModel=require('../models/product-model')

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
      if(!user) 
        { 
          req.flash("error","Email or password does not match")
         return res.redirect('/')
        }
        // console.log(user)
        const hashpassword=user.password
        // console.log(user.password)
      const ismatch= await verifyPassword(password,hashpassword);
      if(!ismatch)
      { 
        req.flash("error","Email or password does not match")
       return res.redirect('/')
      }
          
         
        const payload={
          id:user._id
         }
    
          const token =GenerateToken(payload);
          res.cookie('jwtToken',token);

          const products= await  productModel.find()
          const success=req.flash('success')
          res.render('shop',{products,success})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
      }
}

const logoutCustomer=(req,res)=>{
  res.cookie('jwtToken',"")
   res.redirect('/')   
}

module.exports={
    regsiterCustomer,
    loginCustomer,
     logoutCustomer
};