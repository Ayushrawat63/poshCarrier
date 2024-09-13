const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/jwt");
const {
  regsiterCustomer,
  loginCustomer,
  logoutCustomer,
} = require("../controller/AuthCustomer");

router.post("/register", regsiterCustomer);

router.post("/login", loginCustomer);

router.get("/logout", verifyToken, logoutCustomer);

module.exports = router;
