const customerService = require("../services/customerService");

const createCustomer = async (req, res, next) => {
  try {
    const customerData = req.body;

    const newCustomer = await customerService.createCustomer(customerData);

    return res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
};
