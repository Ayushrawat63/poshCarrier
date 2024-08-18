const express=require('express')
const cookieParser = require('cookie-parser');
const path=require('path')
const app=express();
const db=require('./config/mongoose-connect')

const ownerRouter=require('./routes/ownerRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));


app.use('/owner',ownerRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)

app.listen(4000,()=>{
    console.log("server started")
})