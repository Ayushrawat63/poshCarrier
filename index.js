const express=require('express')
const cookieParser = require('cookie-parser');
const path=require('path')
const app=express();
const db=require('./config/mongoose-connect')
const expressSession=require('express-session')
const flash=require('connect-flash')
require('dotenv').config()

// console.log(process.env.NODE_ENV);

const ownerRouter=require('./routes/ownerRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')
const homeRouter=require('./routes/HomeRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressSession(
    {
       resave:false,
       saveUninitialized:false,
       secret:"ketuketu" 
    }
))
app.use(flash());
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));

app.use('/',homeRouter)
app.use('/owner',ownerRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)

app.listen(4000,()=>{
    console.log("server started")
})