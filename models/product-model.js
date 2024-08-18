const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productPic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: {
    type: String,
  },
  panelColor: {
    type: String,
  },
  textColor: {
    type: String,
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
