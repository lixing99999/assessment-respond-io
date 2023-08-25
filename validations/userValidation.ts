import Joi from "joi";

export const createUserValidation = Joi.object({
    first_name : Joi.string().required(),
    last_name : Joi.string().required(),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().required().valid("Male", "Female"),
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})