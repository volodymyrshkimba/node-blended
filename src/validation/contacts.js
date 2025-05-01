import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  number: Joi.string(),
});
