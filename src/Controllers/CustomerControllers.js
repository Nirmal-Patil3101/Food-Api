import { Customer } from "../models/CustomerSchema.js";

const addcustomer = async (req, res) => {
  console.log(req.body);
  try {
    const addedCustomer = await Customer.create(req.body);
    res.status(200).json(addedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    let customerid = req.body.customerid;
    const deletedCustomer = await Customer.findByIdAndDelete(customerid);
    res.status(200).json(deletedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    let updatedCustomer = await Customer.findByIdAndUpdate(
      { _id: req.body.customerid },
      { cemail: req.body.cemail },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { addcustomer, getAllCustomer, deleteCustomer,updateCustomer };