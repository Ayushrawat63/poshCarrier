
const productModel= require('../models/product-model')
const showShop=async (req, res) => {
    try {
      const products = await productModel.find();
      const success = req.flash("success");
      const error = req.flash("error");
      res.render("shop", { products, success ,error });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal Server Error");
    }
  }

  const addFilter=  async (req,res)=>{
    try{
      let {  priceRange,searchName ,sortby } = req.body;
      // console.log(req.body)
  
      // Parse filters
      priceRange = parseInt(priceRange, 10);
      //  console.log(priceRange)
  
       const products= await productModel.find({})
  
       let filteredProducts = products.filter(product => {
        let matchPrice = product.price <= priceRange;
        if(sortby==="With Discount"){
            
        }
        let withDiscount = sortby==="With Discount" ? product.discount > 0 : sortby==="Without Discount" ? product : true ; 
        let matchName = searchName ? product.name.toLowerCase().includes(searchName.toLowerCase()) : true;
        return  matchPrice &&  matchName && withDiscount;
    });
  
    if(sortby==="latest")
    {
      filteredProducts=filteredProducts.reverse();
    }
      //  console.log(filteredProducts.length)
       const success = req.flash("success");
       const error = req.flash("error");
       res.render('shop',{products:filteredProducts,success,error })
  
    }
    catch(err){
      console.log(err)
      return res.status(500).json({error:"internal server error"})
     }
  }

  const cancelFilter=(req,res)=>{
    res.redirect('/shop')
 }


  module.exports={
    showShop,
    addFilter,
    cancelFilter
  }