const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/jwt");
const {
  regsiterCustomer,
  loginCustomer,
  logoutCustomer,
} = require("../controller/AuthCustomer");

// router.get("/", (req, res) => {
//   const error = req.flash("error");
//   res.render("index", { error });
// });

router.post("/register", regsiterCustomer);

router.post("/login", loginCustomer);

router.get("/logout", verifyToken, logoutCustomer);

module.exports = router;
