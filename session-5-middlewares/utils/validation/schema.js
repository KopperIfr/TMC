import Joi from "joi";

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])')),
    
    rpassword: Joi.string().valid(Joi.ref('password')).required()
});

export default schema;