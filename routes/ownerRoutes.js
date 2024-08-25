const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let OwnerList = await ownerModel.find({});
      if (OwnerList.length > 0) {
        return res
          .status(503)
          .json({
            message: "You do not have permission to create a new Owner",
          });
      }
      let { fullName, email, password } = req.body
      let NewOwner = await ownerModel.create({
        fullName,
        email,
        password,
      });
      res.status(201).json(NewOwner);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });
}

router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
