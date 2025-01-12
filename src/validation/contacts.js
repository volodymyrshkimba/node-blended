import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});
