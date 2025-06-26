import Joi from "joi";

export const createClientValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
      )
      .required(),
    address: Joi.string().required(),
  });
  return checker.validate(data);
};

export const signInClientValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
      )
      .required(),
  });
  return checker.validate(data);
};

export const updateClientValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string(),
    phone: Joi.string().regex(
      /^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/
    ),
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    ),
    address: Joi.string(),
  });
  return checker.validate(data);
};
