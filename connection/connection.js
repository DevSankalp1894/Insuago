  const mongoose = require("mongoose");

  const connection = mongoose.connect("mongodb+srv://sankalp:sankalptiari@cluster0.h7zrwbp.mongodb.net/insuago?retryWrites=true&w=majority");

  module.exports=connection;