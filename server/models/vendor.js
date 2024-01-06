const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  personalInformation: {
    fullName: {
      type: String,
      required: true
    },
    contactInformation: {
      phoneNumber: {
        type: String,
        required: true
      },
      emailAddress: {
        type: String,
        required: true
      }
    },
    homeAddress: {
      type: String,
      required: true
    }
  },
  servicesProvided: [
    {
      type: String,
      required: true
    }
  ],
  paymentDetails: {
    bankName: {
      type: String,
      required: true
    },
    accountHolderName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    },

  },
  preferredPaymentMethod: {
    type: String,
    enum: ['Bank Transfer', 'Other'], 
    required: true
  },
  additionalNotes: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);
