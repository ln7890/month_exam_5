import Joi from "joi";
export const createCategoryValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return checker.validate(data);
};

export const updateCategoryValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
  });
  return checker.validate(data);
};
