const {
  addContactSchema,
} = require("../helper/contactValidation/addContactValidationSchema");
const {
  UpdateContactSchema,
} = require("../helper/contactValidation/updateContactValidationSchema");

const validateAddContact = (req, res, next) => {
  const result = addContactSchema.validate(req.body);

  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const validationResult = UpdateContactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(result.error.details[0].message);
  }
  next();
};

module.exports = {
  validateAddContact,
  validateUpdateContact,
};
