const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const { bcryptPassword } = require("../utils/hashing");
const { verifyOnwerToken } = require("../utils/jwt");
const upload = require("../config/mutler-config");
const {
  accountDetails,
  showAllProducts,
  createProduct,
  ownerLogin,
  ownerImage,
  deleteProdtuct,
  deleteAllProducts,
  ownerLogout,
} = require("../controller/ownerAccount");

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

router.get("/", (req, res) => {
  const error = req.flash("error");
  // console.log(error)
  res.render("owner-login", { error, islogin: false });
});

router.get("/createproduct", verifyOnwerToken, createProduct);

router.get("/account", verifyOnwerToken, accountDetails);

router.get("/logout", verifyOnwerToken, ownerLogout);

router.get("/products", verifyOnwerToken, showAllProducts);

router.post("/login", ownerLogin);

router.post(
  "/uploadimage",
  verifyOnwerToken,
  upload.single("userImage"),
  ownerImage
);

router.post("/delete/:id", verifyOnwerToken, deleteProdtuct);

router.post("/deleteall", verifyOnwerToken, deleteAllProducts);

module.exports = router;
