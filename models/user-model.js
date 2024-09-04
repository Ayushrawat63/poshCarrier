const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerPic: {
    type: Buffer,
 
  },
  phoneNo: {
    type: Number,
    
  },
  role:{
    type:String,
    enum:["User","Admin"],
    default:"User"
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"product",
  }],
  order: {
    type: [],
  },
});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
