import Joi from "joi";
export const createSoldProValidation = (data) => {
  const checker = Joi.object({
    product_id: Joi.string().required(),
    client_id: Joi.string().required(),
    quantity: Joi.number().required(),
    total_price: Joi.number().required(),
  });
  return checker.validate(data);
};

export const updateSoldProValidation = (data) => {
  const checker = Joi.object({
    product_id: Joi.string(),
    client_id: Joi.string(),
    quantity: Joi.number(),
    total_price: Joi.number(),
  });
  return checker.validate(data);
};
