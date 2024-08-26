const express=require('express')
const router =express.Router()
const upload=require('../config/mutler-config')
const productModel=require('../models/product-model')

router.post("/create", upload.single('image') ,async(req,res)=>{
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body

        let newProduct= await productModel.create({
            name,
            image:req.file.buffer,
            price,
            discount,
            bgColor:bgcolor,
            panelColor:panelcolor,
            textColor:textcolor
        })

        req.flash('success',"New product is created")
        return res.redirect('/owner/admin')

    }
    catch (err){
            console.log(err.message);
            res.status(500).json("Internal Server Error");      
    }
   
})

module.exports=router