const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/jwt");
const { showShop, addFilter, cancelFilter } = require("../controller/shop");
const { addToCart, showCart, deleteCartItem } = require("../controller/cartHandler");
const upload=require('../config/mutler-config');
const { accountDetails, userUploadImage } = require("../controller/userAccount");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, islogin: false });
});

router.get("/shop", verifyToken, showShop);

router.get("/addtoCart/:product_id", verifyToken, addToCart);

router.get("/cart", verifyToken, showCart);

router.get('/account',verifyToken, accountDetails)

router.post('/uploadimage',verifyToken,upload.single('userImage') , userUploadImage)

router.post('/delete/:id',verifyToken,deleteCartItem)

router.post('/apply-filters',verifyToken,addFilter)

router.get('/cancel-filters',verifyToken,cancelFilter)
module.exports = router;
