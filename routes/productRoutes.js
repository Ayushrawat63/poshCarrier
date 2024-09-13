const express=require('express')
const router =express.Router()
const upload=require('../config/mutler-config')
const { verifyOnwerToken } = require('../utils/jwt')
const { newProduct } = require('../controller/newProduct')

router.post("/create",verifyOnwerToken, upload.single('image') , newProduct)

module.exports=router