const express = require("express");
const { verifyToken } = require("../utils/jwt");
const router = express.Router();
const { showShop } = require("../controller/shop");
const { addToCart, showCart } = require("../controller/cartHandler");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, islogin: false });
});

router.get("/shop", verifyToken, showShop);

router.get("/addtoCart/:product_id", verifyToken, addToCart);

router.get("/cart", verifyToken, showCart);

module.exports = router;
