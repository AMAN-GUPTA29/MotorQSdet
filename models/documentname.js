const mongoose = require("mongoose");

const documentname = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("documentnames", documentname);
