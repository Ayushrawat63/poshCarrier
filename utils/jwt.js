const jwt =require('jsonwebtoken');


const verifyToken=(req,res,next)=>{
     const token = req.cookies.jwtToken
    //  console.log(token)
     if (!token) {
        req.flash("error","you need to login first!")
        res.redirect('/')
     }
     const verify = jwt.decode(token);
    //  console.log(verify)
     req.payload=verify;
     next();
}

const verifyOnwerToken=(req,res,next)=>{
    const token = req.cookies.ownerJWT
    //  console.log(token)
     if (!token) {
        req.flash("error","you ar not Authorized")
        return res.redirect('/shop')
     }
     const verify = jwt.decode(token);
    //  console.log(verify)
     req.payload=verify;
     return next();
}

const GenerateToken=(data)=>{
    return jwt.sign(data,process.env.SECERT_KEY);
}


module.exports={
    GenerateToken,
    verifyToken,
    verifyOnwerToken
}