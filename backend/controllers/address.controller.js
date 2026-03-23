const ADDRESS = require('../models/address.model');

// Create Address
const createAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const {
      company,
      address1,
      address2,
      city,
      postalCode,
      phone,
      country,
      isDefault,
    } = req.body;

    const newAddress = {
      company,
      address1,
      address2,
      city,
      postalCode,
      phone,
      country,
      isDefault: isDefault || false,
    };

    // Find address document for user
    let userAddress = await ADDRESS.findOne({ user: userId });

    // If user has no address document yet
    if (!userAddress) {
      userAddress = await ADDRESS.create({
        user: userId,
        addresses: [newAddress],
      });
    } else {
      // If new address is default → remove previous default
      if (newAddress.isDefault) {
        userAddress.addresses.forEach((addr) => {
          addr.isDefault = false;
        });
      }

      // Push new address
      userAddress.addresses.push(newAddress);

      await userAddress.save();
    }

    return res.status(201).json({
      msg: 'Address added successfully',
      addresses: userAddress.addresses,
    });
  } catch (error) {
    next(error);
  }
};

//get all addresses for user
const getAddresses = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userAddress = await ADDRESS.findOne({ user: userId });

    if (!userAddress) {
      return res.status(200).json({ addresses: [] });
    }
    return res.status(200).json({ addresses: userAddress.addresses });
  } catch (error) {
    next(error);
  }
};

//delete address
const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    const userAddress = await ADDRESS.findOne({ user: userId });

    if (!userAddress) {
      const error = new Error('No addresses found for user');
      error.status = 404;
      next(error);
    }

    userAddress.addresses = userAddress.addresses.filter(
      (addr) => addr._id.toString() !== addressId,
    );

    await userAddress.save();

    return res.status(200).json({ msg: 'Address deleted successfully' });
  } catch (error) {
    next(error);
  }
};

//edit address
const editAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const {
      company,
      address1,
      address2,
      city,
      postalCode,
      phone,
      country,
      isDefault,
    } = req.body;

    const userAddress = await ADDRESS.findOne({ user: userId });

    if (!userAddress) {
      const error = new Error('No addresses found for user');
      error.status = 404;
      next(error);
    }

    const addressIndex = userAddress.addresses.findIndex(
      (addr) => addr._id.toString() === addressId,
    );

    if (addressIndex === -1) {
      const error = new Error('Address not found');
      error.status = 404;
      next(error);
    }

    // Update the address
    userAddress.addresses[addressIndex] = {
      ...userAddress.addresses[addressIndex],
      company,
      address1,
      address2,
      city,
      postalCode,
      phone,
      country,
      isDefault: isDefault || false,
    };

    await userAddress.save();

    return res.status(200).json({ msg: 'Address updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAddress, getAddresses, deleteAddress, editAddress };
