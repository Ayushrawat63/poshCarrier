const bcrypt=require('bcrypt')

const bcryptPassword=async(password)=>
    {
        try{
            const salt= await bcrypt.genSalt(10);
            const hashpassword= await bcrypt.hash(password,salt);
            //////s console.log(hashpassword)
            return hashpassword;
        }
        catch(err){
            console.log(err.message); 
        }
        
    }


    const verifyPassword= async(password,hashpassword)=>{
        try{
            const ismatch = await bcrypt.compare(password,hashpassword);
            // console.log(ismatch)
            return ismatch;
        }
        catch(err){
            console.log(err.message); 
        }
        
    }


    module.exports={bcryptPassword ,verifyPassword}