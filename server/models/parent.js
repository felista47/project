const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  personalInfo: {
    id: {
        type: String, 
        required: true,
      },
    name: {
      type: String,
      required: true
    },
    contactInfo: {
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
  parentalDetails: {
    parentRelationship: [
      {
        relationship: {
          type: String,
          enum: ['Father', 'Mother'],
          required: true
        },
        phoneNumber: {
          type: String,
          required: true
        }
      }
    ]
  },
  studentInformation: {
    childFullName: {
      type: String,
      required: true
    },
    gradeClass: {
      type: String,
      required: true
    },
    studentID: {
      type: String,
      required: true
    }
  },
  financialInformation: {
    allowanceAmount: {
      type: Number,
      required: true
    },
    allowanceFrequency: {
      type: String,
      enum: ['Weekly', 'Monthly'], // Add other frequency options as needed
      required: true
    }
  },
  userAccountInformation: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Parent', parentSchema);
