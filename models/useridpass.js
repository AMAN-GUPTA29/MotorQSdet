const mongoose = require("mongoose");

const motorqSchemaidpass = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("motorqqidpass", motorqSchemaidpass);
