import Joi from "joi";

const schema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required!',
    }),

    password: Joi.string().required().messages({
        'string.empty': 'Password is required!',
    }),
});

export default schema;