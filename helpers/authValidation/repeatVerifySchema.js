const Joi = require("joi");

const repeatVerifySchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { repeatVerifySchema };
