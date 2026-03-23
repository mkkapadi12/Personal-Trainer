const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  company: String,
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  phone: Number,
  country: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const fullAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  addresses: [addressSchema],
});

const ADDRESS = mongoose.model('Address', fullAddressSchema);
module.exports = ADDRESS;
