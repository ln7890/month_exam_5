import Joi from "joi";
export const createProductValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    color: Joi.string().required(),
    category_id: Joi.string().required(),
    salesman_id: Joi.string().required(),
  });
  return checker.validate(data);
};

export const updateProductValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    color: Joi.string(),
    category_id: Joi.string(),
    salesman_id: Joi.string(),
  });
  return checker.validate(data);
};
