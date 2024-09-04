const express = require("express");
const { verifyToken } = require("../utils/jwt");
const router = express.Router();
const { showShop } = require("../controller/shop");
const userModel =require('../models/user-model')
const { addToCart, showCart } = require("../controller/cartHandler");
const upload=require('../config/mutler-config')

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, islogin: false });
});

router.get("/shop", verifyToken, showShop);

router.get("/addtoCart/:product_id", verifyToken, addToCart);

router.get("/cart", verifyToken, showCart);

router.get('/account',verifyToken,async(req,res)=>{
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
})

router.post('/uploadimage',verifyToken,upload.single('userImage') ,async(req,res)=>{
   await userModel.findOneAndUpdate({_id:req.payload.id},{
    customerPic:req.file.buffer
   })
   req.flash("success","Image uploaded Successfully")
    return res.redirect('/account')
})

module.exports = router;
