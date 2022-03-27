import Joi from "joi";

export default {
    create: {
        body: {
            schema: Joi.object({
                email: Joi.string().email().required().messages({
                    'any.required': `Email is required`
                }),
                firstName: Joi.string().regex(/^[a-zA-Z ]+$/).required()
                    .messages({
                        'string.pattern.base': `Only string required for firstname`,
                        'any.required': `Firstname is required`,
                        'string.empty': `Firstname cannot be empty`
                    }),
                lastName: Joi.string().regex(/^[a-zA-Z ]+$/).required()
                    .messages({
                        'string.pattern.base': `Only string required for lastname`,
                        'any.required': `Lastname is required`,
                        'string.empty': `Lastname cannot be empty`
                    }),
                password: Joi.string().required().messages({
                    'any.required': `Password is required`
                })
            })
        }
    },

    login: {
        body: {
            schema: Joi.object({
                email: Joi.string().email().required().messages({
                    'any.required': `Email is required`
                }),
                password: Joi.string().required().messages({
                    'any.required': `Password is required`
                })
            })
        }
    },

    remove: {
        params: {
            schema: Joi.object({
                id: Joi.string().required().messages({
                    'any.required': `User Id is required`
                }),
            })
        }
    }
}