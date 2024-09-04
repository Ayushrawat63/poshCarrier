const express=require('express')
const router =express.Router()
const upload=require('../config/mutler-config')
const productModel=require('../models/product-model')
const ownerModel =require('../models/owner-model')
const { verifyOnwerToken } = require('../utils/jwt')

router.post("/create",verifyOnwerToken, upload.single('image') ,async(req,res)=>{
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

        const owner=await ownerModel.findOne({_id:req.payload.id})

        owner.products.push(newProduct._id);
        await owner.save();
           





        req.flash('success',"New product is created")
        return res.redirect('/owner/products')

    }
    catch (err){
            console.log(err.message);
            res.status(500).json("Internal Server Error");      
    }
   
})

module.exports=router