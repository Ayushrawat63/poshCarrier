const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
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
  customerPic: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  order: {
    type: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
