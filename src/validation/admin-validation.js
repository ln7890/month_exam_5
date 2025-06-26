import Joi from "joi";

export const createAdminValidation = (data) => {
  const checker = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
      )
      .required(),
    role: Joi.string().required(),
  });
  return checker.validate(data);
};

export const updateAdminValidation = (data) => {
  const checker = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().regex(
      /^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/
    ),
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    ),
    role: Joi.string(),
  });
  return checker.validate(data);
};

export const signinAdminValidation = (data) => {
  const checker = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    ),
  });
  return checker.validate(data);
};
