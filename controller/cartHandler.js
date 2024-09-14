
const userModel = require("../models/user-model");
const addToCart=async (req, res) => {
    try {
      const productId = req.params.product_id;
      const customer = await userModel.findOne(
        { _id: req.payload.id }
      );
      customer.cart.push(productId);
      await customer.save();
      // console.log(customer);
  
      req.flash("success", "Added to cart");
      return res.redirect("/shop");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  const showCart=async(req,res)=>{
    try{
        const customer=await userModel.findOne({_id:req.payload.id}).populate('cart');
        // console.log(customer)
        return res.render('cart',{customer})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

const deleteCartItem=async(req,res)=>{
  try{
    // console.log(req.payload.id)
    // console.log(req.params.id)
    const customer=await userModel.findOne({_id:req.payload.id});
     const newlist =customer.cart.filter((product)=>{
      return product!=req.params.id;
     })
    await userModel.findOneAndUpdate({_id:req.payload.id},{
      cart:newlist
    })
    res.redirect('/cart')
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports={
    addToCart,
    showCart,
    deleteCartItem
}