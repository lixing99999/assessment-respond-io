import Joi from "joi";

export const createNoteValidation = Joi.object({
    type: Joi.string().required().valid("personal", "work", "meeting"),
    note : Joi.string().required()
})