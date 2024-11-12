import { Customer } from "../models/CustomerSchema.js";

const addcustomer = async (req, res) => {
  console.log(req.body);
  try {
    let filePath = req.file.path.replace(/\\/g, "/");
    const addedCustomer = await Customer.create({
      ...req.body,
      cphoto: filePath,
    });
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
      { cmobile: req.body.cmobile },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const doLogin = async (req, res) => {
  try {
    let { cemail, cpassword } = req.body;
    let logedCust = await Customer.findOne({
      cemail,
      cpassword,
    });
    if (!logedCust) {
      res.status(500).json({
        message: "Login Fail",
        data: logedCust,
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Login Success",
        data: logedCust,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { addcustomer, getAllCustomer, doLogin, deleteCustomer, updateCustomer };
