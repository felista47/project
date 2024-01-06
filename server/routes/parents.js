const express = require('express')
const router = express.Router()
const Parent = require('../models/parent')
const mongoose = require('mongoose')

// get all parents
router.get('/', async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json(parents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// get by id
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    res.json(parent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// add a new parent
router.post('/', async (req, res) => {
  
    const parent = new Parent({
      personalInfo: {
        id: req.body.id,
        name: req.body.name,
        contactInfo: {
          phoneNumber: req.body.contactInfo.phoneNumber,
          emailAddress: req.body.contactInfo.emailAddress
        },
        homeAddress: req.body.homeAddress
      },
      parentalDetails: {
        parentRelationship: req.body.parentalDetails.parentRelationship
      },
      studentInformation: {
        childFullName:  req.body.studentInformation.childFullName,
        gradeClass:  req.body.studentInformation.gradeClass,
        studentID:  req.body.studentInformation.studentID
      },
      financialInformation: {
        allowanceAmount:  req.body.financialInformation.allowanceAmount,
        allowanceFrequency:  req.body.financialInformation.allowanceFrequency
      },
      userAccountInformation: {
        username:  req.body.userAccountInformation.username,
        password:  req.body.userAccountInformation.password
      }
    });
  
    try {
      const savedParent = await parent.save();
      res.json(savedParent);
      console.log("parent added succesfuly")
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving parent data');
    }
  });
//  update parent details
router.patch('/:id', async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({ error: 'Parent not found' });
    }

    // Update only the 'sub' field if it exists in the request body
    if (req.body.sub !== undefined) {
      parent.sub = req.body.sub;
    }

    const updatedParent = await parent.save();
    res.json(updatedParent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
module.exports = router