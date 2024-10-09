import Joi from "joi";

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
        'string.empty': 'Username is required!',
        'string.min': 'Username must contain at least 3 characters!',
        'string.max': 'Username cannot contain more than 20 characters!',
        'string.alphanum': 'Username must contain just alphanumeric characters!'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required!',
        'string.email': 'Email must be a valid one!'
    }),

    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])'))
    .required().messages({
        'string.empty': 'Password is required!',
        'string.min': 'Password must contain at least 8 characters!',
        'string.pattern.base': 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    }),

    rpassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords dont match!',
        'string.empty': 'Repeat password is required!'
    })
});

export default schema;