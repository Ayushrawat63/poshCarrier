const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const { bcryptPassword, verifyPassword } = require("../utils/hashing");
const { GenerateToken, verifyOnwerToken } = require("../utils/jwt");
const productModel = require("../models/product-model");
const upload = require("../config/mutler-config");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let OwnerList = await ownerModel.find({});
      if (OwnerList.length > 0) {
        return res.status(503).json({
          message: "You do not have permission to create a new Owner",
        });
      }
      let { fullName, email, password } = req.body;
      const hashpassword = await bcryptPassword(password);
      let NewOwner = await ownerModel.create({
        fullName,
        email,
        password: hashpassword,
        role: "Admin",
      });
      res.status(201).json(NewOwner);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });
}

router.get("/createproduct", verifyOnwerToken, (req, res) => {
  const success = req.flash("success");
  // console.log(req.payload)
  res.render("createproducts", { success, isAdmin: true, islogin: false });
});

router.get("/", (req, res) => {
  const error = req.flash("error");
  // console.log(error)
  res.render("owner-login", { error, islogin: false });
});

router.get("/account", verifyOnwerToken, async (req, res) => {
  const owner = await ownerModel.findOne({ _id: req.payload.id });
  return res.render("account", { owner, isAdmin: true, islogin: false });
});

router.get("/logout", verifyOnwerToken, (req, res) => {
  res.cookie("ownerJWT", "");
  return res.redirect("/owner");
});

router.get("/products", verifyOnwerToken, async (req, res) => {
  try {
    const products = await productModel.find({});
    const ownerProducts = await ownerModel.find().populate("products");

    return res.render("allproducts", {
      products,
      isAdmin: true,
      islogin: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
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
});

router.post(
  "/uploadimage",
  verifyOnwerToken,
  upload.single("userImage"),
  async (req, res) => {
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
  }
);

router.delete("/deleteall", verifyOnwerToken, async (req, res) => {});

module.exports = router;
