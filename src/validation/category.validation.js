import Joi from "joi";
export const createCategoryValidation = (data) => {
  const checker = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return checker.validate(data);
};
