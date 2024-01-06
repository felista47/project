const Vendor = require('../models/vendor');
const express = require('express')
const router = express.Router()


// get all vendors
router.get('/', async (req, res) => {
    try {
      const vendors = await Vendor.find();
      res.json(vendors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });
  // get vendor by id
router.get('/:id', async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
  
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json(vendor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });
// Create a new vendor instance
router.post('/', async (req, res) => {
const newVendor = new Vendor({
  personalInformation: {
    fullName: 'Vendor Full Name',
    contactInformation: {
      phoneNumber: '+1234567890',
      emailAddress: 'vendor@example.com'
    },
    homeAddress: 'Vendor Home Address'
  },
  servicesProvided: ['ServiceA', 'ServiceB', 'ServiceC'],
  paymentDetails: {
    bankName: 'Vendor Bank',
    accountHolderName: 'Vendor Account Holder',
    accountNumber: '987654321',
    routingNumber: '123456789'
  },
  preferredPaymentMethod: 'Bank Transfer',
  additionalNotes: 'Additional notes about the vendor',
  active: true
});
try {
    const savedVendor = await vendor.save();
    res.json(savedVendor);
    console.log("vendor added succesfuly")
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving parent data');
  }
});
// Save the vendor to the database
router.patch('/:id', async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
  
      if (!vendor) {
        return res.status(404).json({ error: 'vender not found' });
      }
  
      // Update only the 'sub' field if it exists in the request body
      if (req.body.sub !== undefined) {
        vendor.sub = req.body.sub;
      }
  
      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });

  module.exports = router
