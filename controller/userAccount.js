 const userModel =require('../models/user-model')
const accountDetails=async(req,res)=>{
    try{
      const user=await userModel.findOne({_id:req.payload.id})
      if(!user) return res.send("zero")
      const  success =req.flash('success')
      return res.render("account", { user,success, isAdmin: false  });
    }
    catch(err){
     console.log(err)
     return res.status(500).json({error:"internal server error"})
    }
  }

  const userUploadImage=async(req,res)=>{
    await userModel.findOneAndUpdate({_id:req.payload.id},{
     customerPic:req.file.buffer
    })
    req.flash("success","Image uploaded Successfully")
     return res.redirect('/account')
 }


 module.exports={
    accountDetails,
    userUploadImage
 }