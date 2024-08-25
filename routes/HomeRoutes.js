const express = require("express");
const { verifyToken } = require("../utils/jwt");
const router = express.Router();

router.get('/',(req,res)=>{
    let error= req.flash("error")
    console.log(error)
    res.render('index',{error})
})

router.get('/shop', verifyToken,(req,res)=>{
   res.render('shop')
})
module.exports = router;