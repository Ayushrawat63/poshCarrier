const mongoose = require("mongoose");
const dgr=require('debug')("development:Mongoose")
mongoose
  .connect("mongodb://localhost:27017/PoshCarrier")
  .then(() => {
    dgr("Database connected");
  })
  .catch((err) => {
    dgr(err, "Db disconnected");
  });

  module.exports=mongoose.connection;
