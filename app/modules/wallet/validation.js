import Joi from "joi";


export default {
    topUp: {
        body: {
            schema: Joi.object({
                amount: Joi.number().integer().positive().required().min(100)
                    .messages({
                        'any.required': `Amount is required`,
                        'number.empty': `Amount cannot be empty`,
                        'number.base': `Amount must be a number`,
                        'number.min': `Please enter an amount greater than 100`
                    })
            })
        }
    },

    transfer: {
        body: {
            schema: Joi.object({
                receiver: Joi.string().required().messages({
                    'any.required': `Please enter receiver ID`,
                    'string.empty': `Please enter receiver ID`
                }),
                amount: Joi.number().integer().positive().min(100).required()
                    .messages({
                        'any.required': `Amount is required`,
                        'number.empty': `Please enter an amount`,
                        'number.min': `Please enter an amount greater than 100`
                    })
            })
        }
    },

    withdraw: {
        body: {
            schema: Joi.object({
                amount: Joi.number().integer().positive().min(100).required()
                    .messages({
                        'any.required': `Amount is required`,
                        'number.empty': `Please enter an amount`,
                        'number.min': `Please enter an amount greater than 100`
                    })
            })
        }
    }
}