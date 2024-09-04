
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


  module.exports={
    showShop
  }