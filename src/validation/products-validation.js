import Joi from "joi";
export const createProductValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    color: Joi.string().required(),
    category_id: Joi.number().required(),
    salesman_id: Joi.number().required(),
  });
  return checker.validate(data);
};
