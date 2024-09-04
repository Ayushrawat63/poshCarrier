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
    type: Buffer
  },
  role:{
    type:String,
    enum:["User","Admin"],
    default:"Admin"
  },
  gstNo: {
    type: String,
  },
  products: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'product'
    }
  ]
});

const ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;
