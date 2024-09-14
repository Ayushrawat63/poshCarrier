const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const { verifyPassword } = require("../utils/hashing");
const { GenerateToken } = require("../utils/jwt");

const accountDetails = async (req, res) => {
  try {
    const owner = await ownerModel.findOne({ _id: req.payload.id });
    const success = req.flash("success");
    return res.render("account", {
      owner,
      isAdmin: true,
      islogin: false,
      success,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const success = req.flash("success");
    // console.log(req.payload)
    res.render("createproducts", { success, isAdmin: true, islogin: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

const showAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    const owner=await ownerModel.findOne({_id:req.payload.id})
    
    const success = req.flash("success");
    return res.render("allproducts", {
      products,
      success,
      isAdmin: true,
      islogin: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const ownerLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await ownerModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email is not valid");
      return res.redirect("/owner");
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      req.flash("error", "Password is not valid");
      return res.redirect("/owner");
    }
    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = GenerateToken(payload);
    res.cookie("ownerJWT", token);

    req.flash("sucsess", "Admin is verifed");
    return res.redirect("/owner/createproduct");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const ownerImage = async (req, res) => {
  try {
    await ownerModel.findOneAndUpdate(
      { _id: req.payload.id },
      {
        ownerPic: req.file.buffer,
      }
    );
    return res.redirect("/owner/account");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const deleteProdtuct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findByIdAndDelete(productId);
    const owner=await ownerModel.findOne({_id:req.payload.id})
    const newlist= owner.products.filter((product)=>{
        return  product != productId
    }
    )
     await ownerModel.findOneAndUpdate({_id:req.payload.id},{
        products:newlist
     })
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.flash("success", "product deleted Successfully");
    res.redirect("/owner/products");
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await productModel.deleteMany({});
     await ownerModel.findOneAndUpdate({_id:req.payload.id},{
        products:[]
     })
    req.flash("success", "All products deleted Successfully");
    res.redirect("/owner/products");
  } catch (err) {
    res.status(500).json({ message: "Error deleting products", error: err });
  }
};

const ownerLogout = (req, res) => {
  res.cookie("ownerJWT", "");
  return res.redirect("/owner");
};

module.exports = {
  accountDetails,
  createProduct,
  showAllProducts,
  ownerLogin,
  ownerImage,
  deleteProdtuct,
  deleteAllProducts,
  ownerLogout,
};
