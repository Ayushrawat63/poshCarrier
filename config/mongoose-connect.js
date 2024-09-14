const mongoose = require("mongoose");
require('dotenv').config()

mongoose
  .connect(process.env.MONGOOSE_CONNECTATLAS_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err, "Db disconnected");
  });

  module.exports=mongoose.connection;
