const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownerPic: {
    type: String,
    required: true,
  },
  gstNo: {
    type: String,
    required: true,
  },
  products: {
    type: [],
  },
});

const ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;
