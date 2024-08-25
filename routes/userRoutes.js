const express=require('express')
const router =express.Router()
const {  verifyToken } = require('../utils/jwt')
const { regsiterCustomer, loginCustomer } = require('../controller/AuthCustomer')

router.get("/",(req,res)=>{
     const error=req.flash('error')
     res.render('index',{error})
})

router.post('/register', regsiterCustomer)

router.post('/login',loginCustomer)

// router.get('/home',verifyToken,(req,res)=>{
//   res.send("WElcome to home page")
// })
router.get('/logout',verifyToken,(req,res)=>{
    res.cookie('jwtToken',"")
     res.redirect('/')
    
})
module.exports=router