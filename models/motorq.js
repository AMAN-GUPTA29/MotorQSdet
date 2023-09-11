const mongoose = require("mongoose");

const motorqSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  documentname: {
    type: String,
    required: true,
  },
  sharedto: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("motorqq", motorqSchema);
