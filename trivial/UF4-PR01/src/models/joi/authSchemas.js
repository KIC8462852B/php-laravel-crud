import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(25).required(),
    password: Joi.string().pattern(/^[a-zA-Z]\w{5,15}$/).required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});