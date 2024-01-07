const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
productDescription: {
      type: Number,
      required: false,
    },
 productAmount: {
      type: Number,
      required: true
    },
available: {
  type: Boolean,
  default: true
    }

});
module.exports = mongoose.model('Product', productSchema);