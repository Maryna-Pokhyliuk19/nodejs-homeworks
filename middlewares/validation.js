const { ValidationError } = require("../helpers/errors");

const {
  addContactSchema,
} = require("../helpers/contactValidation/addContactValidationSchema");
const {
  UpdateContactSchema,
} = require("../helpers/contactValidation/updateContactValidationSchema");
const {
  updateContactFavoriteSchema,
} = require("../helpers/contactValidation/updateContactFavoriteSchema");

const validateAddContact = (req, res, next) => {
  const result = addContactSchema.validate(req.body);

  if (result.error) {
    next(new ValidationError(JSON.stringify(result.error.details[0].message)));
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const validationResult = UpdateContactSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(result.error.details[0].message)));
  }
  next();
};

const validateUpdateFavoriteContact = (req, res, next) => {
  const validationResult = updateContactFavoriteSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError("missing field favorite"));
  }
  next();
};

module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavoriteContact,
};
